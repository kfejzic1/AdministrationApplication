using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AdministrationAPI.Migrations
{
    /// <inheritdoc />
    public partial class main : Migration
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
                    { "44a4e7ca-cfee-4e01-8fcf-6e9c08dc6a4f", "1", "Admin", "Admin" },
                    { "59f58727-e1b4-432d-a4b1-7d3d4df0ea8b", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "usr_users",
                columns: new[] { "id", "access_failed_count", "address", "authenticator_key", "concurrency_stamp", "email", "email_confirmed", "first_name", "last_name", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[,]
                {
                    { "00de8558-b3be-4dae-81dd-8b2bcfc5a4de", 0, "Tamo negdje 1", null, "1", "mbecirovic3@etf.unsa.ba", true, "Merjem", "Becirovic", false, null, "MBECIROVIC3@ETF.UNSA.BA", "MBECIROVIC3", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "4fbc86ca-1c68-4834-9e28-dcbee10471ed", true, "mbecirovic3" },
                    { "0214195c-c7a2-4b3c-ae5d-01e89cffa584", 0, "Tamo negdje 1", null, "1", "esmajic2@etf.unsa.ba", true, "Elvedin", "Smajic", false, null, "ESMAJIC2@ETF.UNSA.BA", "ESMAJIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "39028889-1aa8-4d96-a036-1e03c5ac236f", true, "esmajic2" },
                    { "5240a66e-db06-4ecb-b98e-540739dc067b", 0, "Tamo negdje 1", null, "1", "fejza2806@gmail.com", true, "Admin", "User", false, null, "FEJZA2806@GMAIL.COM", "ADMINUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062518214", true, "d5c9936e-508e-4b6e-918b-1f7c1e4ba319", false, "adminUser" },
                    { "74cd1df9-f356-4987-a7bd-7c453048a49a", 0, "Tamo negdje 1", null, "1", "kfejzic1@etf.unsa.ba", true, "Testing", "User", false, null, "KFEJZIC1@ETF.UNSA.BA", "TESTINGUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062229993", true, "1cbf96cd-2510-4472-a390-2e52341a139f", true, "testingUser" },
                    { "981a5a07-42af-4d06-95ff-aa4b6311807e", 0, "Tamo negdje 1", null, "1", "abrulic1@etf.unsa.ba", true, "Almina", "Brulic", false, null, "ABRULIC1@ETF.UNSA.BA", "ABRULIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "4b6045ee-cf7a-4a8f-be98-296fd37e80de", true, "abrulic1" },
                    { "d80214e7-07af-402d-aa1b-e2d38cbe9cd1", 0, "Tamo negdje 1", null, "1", "dmuhic1@etf.unsa.ba", true, "Dzenis", "Muhic", false, null, "DMUHIC1@ETF.UNSA.BA", "DMUHIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "8ea7a4e7-debe-4c83-ad5d-9390d6bf663b", true, "dmuhic1" },
                    { "e70ae81f-c162-4904-9a4e-fc99f55fc39d", 0, "Tamo negdje 1", null, "1", "emekic2@etf.unsa.ba", true, "Ema", "Mekic", false, null, "EMEKIC2@ETF.UNSA.BA", "EMEKIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "76dc112d-f111-439d-8324-f90bf4063f1f", true, "emekic2" },
                    { "eee6e03c-b474-46fd-a896-43283cf497db", 0, "Tamo negdje 1", null, "1", "amehmedagi1@etf.unsa.ba", true, "Admir", "Mehmedagic", false, null, "AMEHMEDAGI1@ETF.UNSA.BA", "AMEHMEDAGI1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "ee92ef40-46c6-49ed-a78c-d97931e93c03", true, "amehmedagi1" }
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
