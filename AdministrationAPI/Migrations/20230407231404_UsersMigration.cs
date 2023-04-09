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
                    { "7feca994-c40b-4f3b-a456-85d4b931241d", "1", "Admin", "Admin" },
                    { "9f83508d-16fc-4f53-b4bb-ad2fad15c45f", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "usr_users",
                columns: new[] { "id", "access_failed_count", "address", "authenticator_key", "concurrency_stamp", "email", "email_confirmed", "first_name", "last_name", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[,]
                {
                    { "0687653a-3cbe-4966-b37b-0b005180921c", 0, "Tamo negdje 1", null, "1", "emekic2@etf.unsa.ba", true, "Ema", "Mekic", false, null, "EMEKIC2@ETF.UNSA.BA", "EMEKIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "520aa5be-42a7-45c5-9d18-da97718d782a", true, "emekic2" },
                    { "123748fa-398e-4aec-bd08-b81a3e6f3c7b", 0, "Tamo negdje 1", null, "1", "esmajic2@etf.unsa.ba", true, "Elvedin", "Smajic", false, null, "ESMAJIC2@ETF.UNSA.BA", "ESMAJIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "0259c9a5-4ecd-41f5-9bab-eedc6a28edc6", true, "esmajic2" },
                    { "4473f112-e2f4-479c-9eb5-87219e140e8c", 0, "Tamo negdje 1", null, "1", "fejza2806@gmail.com", true, "Admin", "User", false, null, "FEJZA2806@GMAIL.COM", "ADMINUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062518214", true, "a5e1d977-edb4-4d71-8a39-9aa47ef262f5", false, "adminUser" },
                    { "5139ee3a-1d2d-4ab1-9b05-78cee0755a44", 0, "Tamo negdje 1", null, "1", "amehmedagi1@etf.unsa.ba", true, "Admir", "Mehmedagic", false, null, "AMEHMEDAGI1@ETF.UNSA.BA", "AMEHMEDAGI1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "4d35694f-07a7-4dca-93d7-2f100b4c9d50", true, "amehmedagi1" },
                    { "c76f848c-890e-40fd-837e-03d0f78d29fc", 0, "Tamo negdje 1", null, "1", "kfejzic1@etf.unsa.ba", true, "Testing", "User", false, null, "KFEJZIC1@ETF.UNSA.BA", "TESTINGUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062229993", true, "78e93e59-2082-4c7d-8e01-a8354facdcd6", true, "testingUser" },
                    { "cc971a0d-4a3e-4859-8493-0a212e5b0753", 0, "Tamo negdje 1", null, "1", "mbecirovic3@etf.unsa.ba", true, "Merjem", "Becirovic", false, null, "MBECIROVIC3@ETF.UNSA.BA", "MBECIROVIC3", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "2b70419b-daf8-4301-90bc-634bb2b74a24", true, "mbecirovic3" },
                    { "dd7bcfbd-3058-4e66-a20a-f37114c8a88b", 0, "Tamo negdje 1", null, "1", "dmuhic1@etf.unsa.ba", true, "Dzenis", "Muhic", false, null, "DMUHIC1@ETF.UNSA.BA", "DMUHIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "45c36932-12ba-496c-83bc-874f3408ddc8", true, "dmuhic1" },
                    { "fdc85627-b368-461e-a4f0-59bf9136ac57", 0, "Tamo negdje 1", null, "1", "abrulic1@etf.unsa.ba", true, "Almina", "Brulic", false, null, "ABRULIC1@ETF.UNSA.BA", "ABRULIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "a7572e75-48c7-491e-acca-213c9db9611a", true, "abrulic1" }
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
