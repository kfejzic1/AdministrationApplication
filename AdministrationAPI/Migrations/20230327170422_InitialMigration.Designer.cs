﻿// <auto-generated />
using System;
using AdministrationAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AdministrationAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230327170422_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext")
                        .HasColumnName("concurrency_stamp");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("name");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("normalized_name");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("usr_roles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "ce0612fa-6c76-49bb-973c-e7a4f073bd79",
                            ConcurrencyStamp = "1",
                            Name = "Admin",
                            NormalizedName = "Admin"
                        },
                        new
                        {
                            Id = "099efcaa-2e61-4c98-9387-a05bb8f4dce1",
                            ConcurrencyStamp = "2",
                            Name = "User",
                            NormalizedName = "User"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext")
                        .HasColumnName("claim_value");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("role_id");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("usr_role_claims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("id");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int")
                        .HasColumnName("access_failed_count");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext")
                        .HasColumnName("concurrency_stamp");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("email");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("email_confirmed");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("lockout_enabled");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("lockout_end");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("normalized_email");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("normalized_user_name");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext")
                        .HasColumnName("password_hash");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext")
                        .HasColumnName("phone_number");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("phone_number_confirmed");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext")
                        .HasColumnName("security_stamp");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("two_factor_enabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)")
                        .HasColumnName("user_name");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("usr_users", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "2f8209b5-9d22-4087-ba26-799f9211c59e",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "kfejzic1@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "KFEJZIC1@ETF.UNSA.BA",
                            NormalizedUserName = "TESTINGUSER",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "062229993",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "1e6d8d4b-bc9d-44f1-9250-3ad63d683ced",
                            TwoFactorEnabled = true,
                            UserName = "testingUser"
                        },
                        new
                        {
                            Id = "a8323ab2-9750-43c4-b017-ca09ed9de913",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "fejza2806@gmail.com",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "FEJZA2806@GMAIL.COM",
                            NormalizedUserName = "ADMINUSER",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "062518214",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "100a0af5-a351-4be1-961f-f0cf5333e24a",
                            TwoFactorEnabled = false,
                            UserName = "adminUser"
                        },
                        new
                        {
                            Id = "8d25df41-5e23-4804-af13-c36e6897c2c2",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "esmajic2@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "ESMAJIC2@ETF.UNSA.BA",
                            NormalizedUserName = "ESMAJIC2",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "01f18223-2cdb-4310-94fe-691df80374c7",
                            TwoFactorEnabled = true,
                            UserName = "esmajic2"
                        },
                        new
                        {
                            Id = "6461bebc-6e1a-4306-ac1b-a7188c6838b6",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "amehmedagi1@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "AMEHMEDAGI1@ETF.UNSA.BA",
                            NormalizedUserName = "AMEHMEDAGI1",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "3b567bac-0594-49fc-be7d-1d445725d9b4",
                            TwoFactorEnabled = true,
                            UserName = "amehmedagi1"
                        },
                        new
                        {
                            Id = "45607dbb-5ba8-46da-9432-8b0ca3be116e",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "mbecirovic3@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "MBECIROVIC3@ETF.UNSA.BA",
                            NormalizedUserName = "MBECIROVIC3",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "05348740-585e-4bcb-94d7-e940d3823966",
                            TwoFactorEnabled = true,
                            UserName = "mbecirovic3"
                        },
                        new
                        {
                            Id = "9b395a35-dd7c-482e-8c30-edb79f908274",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "dmuhic1@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "DMUHIC1@ETF.UNSA.BA",
                            NormalizedUserName = "DMUHIC1",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "16693134-53e2-4c87-bf84-a31b64b7b7e7",
                            TwoFactorEnabled = true,
                            UserName = "dmuhic1"
                        },
                        new
                        {
                            Id = "d0c2c564-bdec-4c16-825a-8d4ea7166a83",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "emekic2@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "EMEKIC2@ETF.UNSA.BA",
                            NormalizedUserName = "EMEKIC2",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "0e5f2dda-eda3-4c5c-a09b-90283826c924",
                            TwoFactorEnabled = true,
                            UserName = "emekic2"
                        },
                        new
                        {
                            Id = "fd979445-86c7-450a-bfcc-5ce03b0a2367",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "1",
                            Email = "abrulic1@etf.unsa.ba",
                            EmailConfirmed = true,
                            LockoutEnabled = false,
                            NormalizedEmail = "ABRULIC1@ETF.UNSA.BA",
                            NormalizedUserName = "ABRULIC1",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "1674356c-728e-4df5-8d14-4b90fa05f783",
                            TwoFactorEnabled = true,
                            UserName = "abrulic1"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext")
                        .HasColumnName("claim_value");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("usr_user_claims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("login_provider");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("provider_key");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext")
                        .HasColumnName("provider_display_name");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("user_id");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("usr_user_logins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("user_id");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("role_id");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("usr_user_roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("user_id");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("login_provider");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name");

                    b.Property<string>("Value")
                        .HasColumnType("longtext")
                        .HasColumnName("value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("usr_user_tokens", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}