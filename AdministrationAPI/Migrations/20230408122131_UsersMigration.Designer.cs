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
    [Migration("20230408122131_UsersMigration")]
    partial class UsersMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.4");

            modelBuilder.Entity("AdministrationAPI.Models.ActivationCode", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<bool>("ActivatedEmail")
                        .HasColumnType("INTEGER")
                        .HasColumnName("activated_email");

                    b.Property<bool>("ActivatedSMS")
                        .HasColumnType("INTEGER")
                        .HasColumnName("activated_sms");

                    b.Property<string>("EmailCode")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("email_code");

                    b.Property<string>("SMSCode")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("sms_code");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("usr_activation_codes", (string)null);
                });

            modelBuilder.Entity("AdministrationAPI.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER")
                        .HasColumnName("access_failed_count");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("address");

                    b.Property<string>("AuthenticatorKey")
                        .HasColumnType("TEXT")
                        .HasColumnName("authenticator_key");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT")
                        .HasColumnName("concurrency_stamp");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT")
                        .HasColumnName("email");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER")
                        .HasColumnName("email_confirmed");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("last_name");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER")
                        .HasColumnName("lockout_enabled");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT")
                        .HasColumnName("lockout_end");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT")
                        .HasColumnName("normalized_email");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT")
                        .HasColumnName("normalized_user_name");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT")
                        .HasColumnName("password_hash");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT")
                        .HasColumnName("phone_number");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER")
                        .HasColumnName("phone_number_confirmed");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT")
                        .HasColumnName("security_stamp");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER")
                        .HasColumnName("two_factor_enabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT")
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
                            Id = "b47eee0d-30b8-489e-9c83-898606ede998",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "kfejzic1@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Testing",
                            LastName = "User",
                            LockoutEnabled = false,
                            NormalizedEmail = "KFEJZIC1@ETF.UNSA.BA",
                            NormalizedUserName = "TESTINGUSER",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "062229993",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "ded8229b-ff62-4bb8-809f-e9e29dd01603",
                            TwoFactorEnabled = true,
                            UserName = "testingUser"
                        },
                        new
                        {
                            Id = "28da27aa-8d72-4576-8ed3-80997a4c7fab",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "fejza2806@gmail.com",
                            EmailConfirmed = true,
                            FirstName = "Admin",
                            LastName = "User",
                            LockoutEnabled = false,
                            NormalizedEmail = "FEJZA2806@GMAIL.COM",
                            NormalizedUserName = "ADMINUSER",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "062518214",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "6ed2222a-97ad-4c7c-a9ae-844564f1e9a2",
                            TwoFactorEnabled = false,
                            UserName = "adminUser"
                        },
                        new
                        {
                            Id = "52b2294a-dc4f-4423-9d3f-9525357d4651",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "esmajic2@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Elvedin",
                            LastName = "Smajic",
                            LockoutEnabled = false,
                            NormalizedEmail = "ESMAJIC2@ETF.UNSA.BA",
                            NormalizedUserName = "ESMAJIC2",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "895f889c-0f21-424c-b0d7-b503016319e7",
                            TwoFactorEnabled = true,
                            UserName = "esmajic2"
                        },
                        new
                        {
                            Id = "57db0770-1ca2-4719-a585-72814787febc",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "amehmedagi1@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Admir",
                            LastName = "Mehmedagic",
                            LockoutEnabled = false,
                            NormalizedEmail = "AMEHMEDAGI1@ETF.UNSA.BA",
                            NormalizedUserName = "AMEHMEDAGI1",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "44a72efe-9f1f-4ef4-bd36-a38c3e4b8975",
                            TwoFactorEnabled = true,
                            UserName = "amehmedagi1"
                        },
                        new
                        {
                            Id = "6308208c-fcb4-474f-8401-3e0b4f2b6040",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "mbecirovic3@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Merjem",
                            LastName = "Becirovic",
                            LockoutEnabled = false,
                            NormalizedEmail = "MBECIROVIC3@ETF.UNSA.BA",
                            NormalizedUserName = "MBECIROVIC3",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "45dc0296-b0fd-46b3-a264-2c1f3ea925fa",
                            TwoFactorEnabled = true,
                            UserName = "mbecirovic3"
                        },
                        new
                        {
                            Id = "1922ea7c-393f-4b10-b57b-ebdda96d04a3",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "dmuhic1@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Dzenis",
                            LastName = "Muhic",
                            LockoutEnabled = false,
                            NormalizedEmail = "DMUHIC1@ETF.UNSA.BA",
                            NormalizedUserName = "DMUHIC1",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "16e02940-eb0b-4630-bf8b-46ad7d8162dc",
                            TwoFactorEnabled = true,
                            UserName = "dmuhic1"
                        },
                        new
                        {
                            Id = "458129e9-63f1-4027-ac1d-24e45c1d392c",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "emekic2@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Ema",
                            LastName = "Mekic",
                            LockoutEnabled = false,
                            NormalizedEmail = "EMEKIC2@ETF.UNSA.BA",
                            NormalizedUserName = "EMEKIC2",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "a258cec9-3e9d-4518-bed3-130d2758edbe",
                            TwoFactorEnabled = true,
                            UserName = "emekic2"
                        },
                        new
                        {
                            Id = "f756e34c-fa3e-4dfe-8615-d485f6f32fe8",
                            AccessFailedCount = 0,
                            Address = "Tamo negdje 1",
                            ConcurrencyStamp = "1",
                            Email = "abrulic1@etf.unsa.ba",
                            EmailConfirmed = true,
                            FirstName = "Almina",
                            LastName = "Brulic",
                            LockoutEnabled = false,
                            NormalizedEmail = "ABRULIC1@ETF.UNSA.BA",
                            NormalizedUserName = "ABRULIC1",
                            PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==",
                            PhoneNumber = "11111",
                            PhoneNumberConfirmed = true,
                            SecurityStamp = "0359ab83-398e-4d70-bc9e-2ea1bd39210d",
                            TwoFactorEnabled = true,
                            UserName = "abrulic1"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT")
                        .HasColumnName("id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT")
                        .HasColumnName("concurrency_stamp");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT")
                        .HasColumnName("normalized_name");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("usr_roles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "496aa771-a794-42f9-b57b-bda35f90e990",
                            ConcurrencyStamp = "1",
                            Name = "Admin",
                            NormalizedName = "Admin"
                        },
                        new
                        {
                            Id = "8c6034ff-c38d-4a29-84ee-90cd99a9f419",
                            ConcurrencyStamp = "2",
                            Name = "User",
                            NormalizedName = "User"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT")
                        .HasColumnName("claim_value");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("role_id");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("usr_role_claims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER")
                        .HasColumnName("id");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT")
                        .HasColumnName("claim_type");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT")
                        .HasColumnName("claim_value");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("usr_user_claims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT")
                        .HasColumnName("login_provider");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT")
                        .HasColumnName("provider_key");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT")
                        .HasColumnName("provider_display_name");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("usr_user_logins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT")
                        .HasColumnName("role_id");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("usr_user_roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT")
                        .HasColumnName("user_id");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT")
                        .HasColumnName("login_provider");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT")
                        .HasColumnName("name");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT")
                        .HasColumnName("value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("usr_user_tokens", (string)null);
                });

            modelBuilder.Entity("AdministrationAPI.Models.ActivationCode", b =>
                {
                    b.HasOne("AdministrationAPI.Models.User", "User")
                        .WithOne("ActivationCode")
                        .HasForeignKey("AdministrationAPI.Models.ActivationCode", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
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
                    b.HasOne("AdministrationAPI.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AdministrationAPI.Models.User", null)
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

                    b.HasOne("AdministrationAPI.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AdministrationAPI.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AdministrationAPI.Models.User", b =>
                {
                    b.Navigation("ActivationCode")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
