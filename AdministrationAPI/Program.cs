using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using AdministrationAPI.Utilities.TokenUtility;
using Google;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
{
    DotNetEnv.Env.Load("./.env.dev");
}
else
{
    DotNetEnv.Env.Load();
}

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

// Add services to the container.
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IActivationCodeService, ActivationCodeService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ITemplateService, TemplateService>();
builder.Services.AddScoped<IExchangeRateService, ExchangeRateService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IExchangeService, ExchangeService>();
builder.Services.AddScoped<IVoucherService, VoucherService>();
builder.Services.AddScoped<IRedeemVoucherService, RedeemVoucherService>();
builder.Services.AddScoped<TokenUtilities>();
builder.Services.AddScoped<IAdminEInvoiceService, AdminEInvoiceService>();
builder.Services.AddScoped<IEInvoiceService, EInvoiceService>();


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
builder.Services.AddDbContext<DBContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("TransactionDB")));

if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
{
    builder.Services.AddDbContext<TemplateDbContext>(options => options.UseSqlite(connectionString));
    builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));
}
else
{
    builder.Services.AddDbContext<TemplateDbContext>(options => options.UseMySQL(connectionString));
    builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(connectionString));
}

builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders()
    .AddRoles<IdentityRole>();


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

var services = scope.ServiceProvider;
var appDbContext = services.GetRequiredService<AppDbContext>();
appDbContext.Database.Migrate();
var templateDbContext = services.GetRequiredService<TemplateDbContext>();
templateDbContext.Database.Migrate();

var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();


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



app.UseSwagger();
app.UseSwaggerUI();



app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
