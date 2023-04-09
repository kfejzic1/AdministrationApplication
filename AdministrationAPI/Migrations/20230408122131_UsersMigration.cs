using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AdministrationAPI.Migrations
{
    /// <inheritdoc />
    public partial class UsersMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "usr_roles",
                columns: table => new
                {
                    id = table.Column<string>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    normalized_name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    concurrency_stamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usr_users",
                columns: table => new
                {
                    id = table.Column<string>(type: "TEXT", nullable: false),
                    authenticator_key = table.Column<string>(type: "TEXT", nullable: true),
                    first_name = table.Column<string>(type: "TEXT", nullable: false),
                    last_name = table.Column<string>(type: "TEXT", nullable: false),
                    address = table.Column<string>(type: "TEXT", nullable: false),
                    user_name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    email_confirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    password_hash = table.Column<string>(type: "TEXT", nullable: true),
                    security_stamp = table.Column<string>(type: "TEXT", nullable: true),
                    concurrency_stamp = table.Column<string>(type: "TEXT", nullable: true),
                    phone_number = table.Column<string>(type: "TEXT", nullable: true),
                    phone_number_confirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    lockout_enabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    access_failed_count = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usr_role_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    role_id = table.Column<string>(type: "TEXT", nullable: false),
                    claim_type = table.Column<string>(type: "TEXT", nullable: true),
                    claim_value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_role_claims", x => x.id);
                    table.ForeignKey(
                        name: "FK_usr_role_claims_usr_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "usr_roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usr_activation_codes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "TEXT", nullable: false),
                    email_code = table.Column<string>(type: "TEXT", nullable: false),
                    sms_code = table.Column<string>(type: "TEXT", nullable: false),
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    activated_email = table.Column<bool>(type: "INTEGER", nullable: false),
                    activated_sms = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_activation_codes", x => x.id);
                    table.ForeignKey(
                        name: "FK_usr_activation_codes_usr_users_user_id",
                        column: x => x.user_id,
                        principalTable: "usr_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usr_user_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    claim_type = table.Column<string>(type: "TEXT", nullable: true),
                    claim_value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_user_claims", x => x.id);
                    table.ForeignKey(
                        name: "FK_usr_user_claims_usr_users_user_id",
                        column: x => x.user_id,
                        principalTable: "usr_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usr_user_logins",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "TEXT", nullable: false),
                    provider_key = table.Column<string>(type: "TEXT", nullable: false),
                    provider_display_name = table.Column<string>(type: "TEXT", nullable: true),
                    user_id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_user_logins", x => new { x.login_provider, x.provider_key });
                    table.ForeignKey(
                        name: "FK_usr_user_logins_usr_users_user_id",
                        column: x => x.user_id,
                        principalTable: "usr_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usr_user_roles",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    role_id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_user_roles", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "FK_usr_user_roles_usr_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "usr_roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_usr_user_roles_usr_users_user_id",
                        column: x => x.user_id,
                        principalTable: "usr_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "usr_user_tokens",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "TEXT", nullable: false),
                    login_provider = table.Column<string>(type: "TEXT", nullable: false),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_user_tokens", x => new { x.user_id, x.login_provider, x.name });
                    table.ForeignKey(
                        name: "FK_usr_user_tokens_usr_users_user_id",
                        column: x => x.user_id,
                        principalTable: "usr_users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "usr_roles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[,]
                {
                    { "496aa771-a794-42f9-b57b-bda35f90e990", "1", "Admin", "Admin" },
                    { "8c6034ff-c38d-4a29-84ee-90cd99a9f419", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "usr_users",
                columns: new[] { "id", "access_failed_count", "address", "authenticator_key", "concurrency_stamp", "email", "email_confirmed", "first_name", "last_name", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[,]
                {
                    { "1922ea7c-393f-4b10-b57b-ebdda96d04a3", 0, "Tamo negdje 1", null, "1", "dmuhic1@etf.unsa.ba", true, "Dzenis", "Muhic", false, null, "DMUHIC1@ETF.UNSA.BA", "DMUHIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "16e02940-eb0b-4630-bf8b-46ad7d8162dc", true, "dmuhic1" },
                    { "28da27aa-8d72-4576-8ed3-80997a4c7fab", 0, "Tamo negdje 1", null, "1", "fejza2806@gmail.com", true, "Admin", "User", false, null, "FEJZA2806@GMAIL.COM", "ADMINUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062518214", true, "6ed2222a-97ad-4c7c-a9ae-844564f1e9a2", false, "adminUser" },
                    { "458129e9-63f1-4027-ac1d-24e45c1d392c", 0, "Tamo negdje 1", null, "1", "emekic2@etf.unsa.ba", true, "Ema", "Mekic", false, null, "EMEKIC2@ETF.UNSA.BA", "EMEKIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "a258cec9-3e9d-4518-bed3-130d2758edbe", true, "emekic2" },
                    { "52b2294a-dc4f-4423-9d3f-9525357d4651", 0, "Tamo negdje 1", null, "1", "esmajic2@etf.unsa.ba", true, "Elvedin", "Smajic", false, null, "ESMAJIC2@ETF.UNSA.BA", "ESMAJIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "895f889c-0f21-424c-b0d7-b503016319e7", true, "esmajic2" },
                    { "57db0770-1ca2-4719-a585-72814787febc", 0, "Tamo negdje 1", null, "1", "amehmedagi1@etf.unsa.ba", true, "Admir", "Mehmedagic", false, null, "AMEHMEDAGI1@ETF.UNSA.BA", "AMEHMEDAGI1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "44a72efe-9f1f-4ef4-bd36-a38c3e4b8975", true, "amehmedagi1" },
                    { "6308208c-fcb4-474f-8401-3e0b4f2b6040", 0, "Tamo negdje 1", null, "1", "mbecirovic3@etf.unsa.ba", true, "Merjem", "Becirovic", false, null, "MBECIROVIC3@ETF.UNSA.BA", "MBECIROVIC3", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "45dc0296-b0fd-46b3-a264-2c1f3ea925fa", true, "mbecirovic3" },
                    { "b47eee0d-30b8-489e-9c83-898606ede998", 0, "Tamo negdje 1", null, "1", "kfejzic1@etf.unsa.ba", true, "Testing", "User", false, null, "KFEJZIC1@ETF.UNSA.BA", "TESTINGUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062229993", true, "ded8229b-ff62-4bb8-809f-e9e29dd01603", true, "testingUser" },
                    { "f756e34c-fa3e-4dfe-8615-d485f6f32fe8", 0, "Tamo negdje 1", null, "1", "abrulic1@etf.unsa.ba", true, "Almina", "Brulic", false, null, "ABRULIC1@ETF.UNSA.BA", "ABRULIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "0359ab83-398e-4d70-bc9e-2ea1bd39210d", true, "abrulic1" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_usr_activation_codes_user_id",
                table: "usr_activation_codes",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_usr_role_claims_role_id",
                table: "usr_role_claims",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "usr_roles",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_usr_user_claims_user_id",
                table: "usr_user_claims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_usr_user_logins_user_id",
                table: "usr_user_logins",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_usr_user_roles_role_id",
                table: "usr_user_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "usr_users",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "usr_users",
                column: "normalized_user_name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "usr_activation_codes");

            migrationBuilder.DropTable(
                name: "usr_role_claims");

            migrationBuilder.DropTable(
                name: "usr_user_claims");

            migrationBuilder.DropTable(
                name: "usr_user_logins");

            migrationBuilder.DropTable(
                name: "usr_user_roles");

            migrationBuilder.DropTable(
                name: "usr_user_tokens");

            migrationBuilder.DropTable(
                name: "usr_roles");

            migrationBuilder.DropTable(
                name: "usr_users");
        }
    }
}
