using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AdministrationAPI.Migrations
{
    /// <inheritdoc />
    public partial class Sprint3Main : Migration
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
                    { "355683d5-97cf-44fd-8d79-0fbc005e5642", "1", "Admin", "Admin" },
                    { "f1331f8f-5ba1-4303-bfc7-33c64b7346d7", "2", "User", "User" }
                });

            migrationBuilder.InsertData(
                table: "usr_users",
                columns: new[] { "id", "access_failed_count", "address", "authenticator_key", "concurrency_stamp", "email", "email_confirmed", "first_name", "last_name", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[,]
                {
                    { "11883f4b-00d9-4872-abde-abe721f146cf", 0, "Tamo negdje 1", null, "1", "kfejzic1@etf.unsa.ba", true, "Testing", "User", false, null, "KFEJZIC1@ETF.UNSA.BA", "TESTINGUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062229993", true, "aceffea9-f023-4983-b9ef-4663e0aebbf1", true, "testingUser" },
                    { "2c5cd97c-1352-46a3-9ad7-7c805daa4911", 0, "Tamo negdje 1", null, "1", "amehmedagi1@etf.unsa.ba", true, "Admir", "Mehmedagic", false, null, "AMEHMEDAGI1@ETF.UNSA.BA", "AMEHMEDAGI1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "92b00e76-aef2-4d62-a930-8b297faf5fb5", true, "amehmedagi1" },
                    { "3ba056f9-62b5-4839-b0ac-5876a9dc1b56", 0, "Tamo negdje 1", null, "1", "fejza2806@gmail.com", true, "Admin", "User", false, null, "FEJZA2806@GMAIL.COM", "ADMINUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062518214", true, "6545f3f9-2052-4a7c-983b-2c58aaf03c0d", false, "adminUser" },
                    { "3df29f63-96af-4184-a182-0f612847e58f", 0, "Tamo negdje 1", null, "1", "esmajic2@etf.unsa.ba", true, "Elvedin", "Smajic", false, null, "ESMAJIC2@ETF.UNSA.BA", "ESMAJIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "d0495148-75d2-4b16-8d83-f270e135fa59", true, "esmajic2" },
                    { "6be9d199-76c4-40d0-967f-ff572f93264f", 0, "Tamo negdje 1", null, "1", "abrulic1@etf.unsa.ba", true, "Almina", "Brulic", false, null, "ABRULIC1@ETF.UNSA.BA", "ABRULIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "353eefc9-2638-4049-b866-cba739537240", true, "abrulic1" },
                    { "af81a387-b601-42cb-98a5-1475a70f146b", 0, "Tamo negdje 1", null, "1", "dmuhic1@etf.unsa.ba", true, "Dzenis", "Muhic", false, null, "DMUHIC1@ETF.UNSA.BA", "DMUHIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "b9d40827-726e-44ab-adeb-04e07832f1cf", true, "dmuhic1" },
                    { "e3d6eb21-5477-49a3-9d78-00e92d6a6a03", 0, "Tamo negdje 1", null, "1", "emekic2@etf.unsa.ba", true, "Ema", "Mekic", false, null, "EMEKIC2@ETF.UNSA.BA", "EMEKIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "48222cb3-c3a3-4b44-9463-ec0024505162", true, "emekic2" },
                    { "eb70f744-ae6b-4473-9121-fbbfc3fbb3c1", 0, "Tamo negdje 1", null, "1", "mbecirovic3@etf.unsa.ba", true, "Merjem", "Becirovic", false, null, "MBECIROVIC3@ETF.UNSA.BA", "MBECIROVIC3", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "1bdda705-56d1-45cc-9363-071f3bf2b997", true, "mbecirovic3" }
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
