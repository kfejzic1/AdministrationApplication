using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using AdministrationAPI.Utilities.TokenUtility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
var connectionString = configuration.GetConnectionString("DefaultConnectionString");

// Add services to the container.
builder.Services.AddSingleton<IVendorService, VendorService>();
builder.Services.AddSingleton<IDocumentService, DocumentService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IActivationCodeService, ActivationCodeService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<TokenUtilities>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["Token:ValidAudience"],
        ValidIssuer = configuration["Token:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Secret"]))
    };
});
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer("server=localhost\\sqlexpress;Database=projekatsi;trusted_connection=true;TrustServerCertificate=True"));
//builder.Services.AddDbContext<VendorDbContext>(options => options.UseSqlServer("server=localhost\\sqlexpress;Database=vendordb;trusted_connection=true;TrustServerCertificate=True"));
builder.Services.AddDbContext<VendorDbContext>();
builder.Services.AddDbContext<DBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("TransactionDB")));
builder.Services.AddDbContext<TemplateDbContext>(options => options.UseMySQL(connectionString));

//builder.Services.AddIdentity<User, IdentityRole>()
//    .AddEntityFrameworkStores<AppDbContext>()
//    .AddDefaultTokenProviders()
//    .AddRoles<IdentityRole>();

//builder.Services.AddIdentity<VendorUser, VendorUserRole>()
//    .AddEntityFrameworkStores<VendorDbContext>()
//    .AddDefaultTokenProviders()
//    .AddRoles<VendorUserRole>();

//builder.Services.AddScoped<IUserStore<VendorUser>, UserStore<VendorUser, VendorUserRole, VendorDbContext, Guid>>();
//builder.Services.AddScoped<IRoleStore<VendorUserRole>, RoleStore<VendorUserRole, VendorDbContext, Guid>>();
//builder.Services.AddScoped<IUserStore<User>, UserStore<User, IdentityRole, AppDbContext, string>>();
//builder.Services.AddScoped<IRoleStore<IdentityRole>, RoleStore<IdentityRole, AppDbContext, string>>();

//builder.Services.AddIdentityCore<User, IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
//builder.Services.AddIdentityCore<VendorUser, VendorUserRole>().AddEntityFrameworkStores<VendorDbContext>();


builder.Services.AddIdentityCore<User>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 8;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.User.RequireUniqueEmail = true;
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders()
    .AddSignInManager<SignInManager<User>>();

builder.Services.AddIdentityCore<VendorUser>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 8;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.User.RequireUniqueEmail = true;
})
    .AddRoles<VendorUserRole>()
    .AddEntityFrameworkStores<VendorDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddScoped<IUserStore<User>, UserStore<User, IdentityRole, AppDbContext, string>>();
builder.Services.AddScoped<IRoleStore<IdentityRole>, RoleStore<IdentityRole, AppDbContext, string>>();
builder.Services.AddScoped<IUserStore<VendorUser>, UserStore<VendorUser, VendorUserRole, VendorDbContext, Guid>>();
builder.Services.AddScoped<IRoleStore<VendorUserRole>, RoleStore<VendorUserRole, VendorDbContext, Guid>>();





var provider = builder.Services.BuildServiceProvider();

builder.Services.AddCors(options =>
{
    var frontendURL = configuration.GetValue<String>("frontend_url");

    options.AddDefaultPolicy(builder =>
    {
        // builder.WithOrigins(frontendURL!).AllowAnyMethod().AllowAnyHeader();
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

var vendorRole= scope.ServiceProvider.GetRequiredService<RoleManager<VendorUserRole>>();
var roles = new List<string> { "VendorAdmin", "VendorEmployee" };

foreach (var role in roles)
{
    if (!await vendorRole.RoleExistsAsync(role))
    {
        await vendorRole.CreateAsync(new VendorUserRole { Name = role });
    }
}



if (!await roleManager.RoleExistsAsync("Admin"))
{
    await roleManager.CreateAsync(new IdentityRole("Admin"));
}

if (!await roleManager.RoleExistsAsync("User"))
{
    await roleManager.CreateAsync(new IdentityRole("User"));
}

if (!await roleManager.RoleExistsAsync("Restricted"))
{
    await roleManager.CreateAsync(new IdentityRole("Restricted"));
}

// Configure the HTTP request pipeline.

app.UseMiddleware<TokenExpirationHandler>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
