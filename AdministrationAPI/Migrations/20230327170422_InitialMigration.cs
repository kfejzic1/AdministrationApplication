using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AdministrationAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_roles",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    normalized_name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    concurrency_stamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_roles", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_users",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    user_name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    normalized_user_name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    normalized_email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email_confirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    password_hash = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    security_stamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    concurrency_stamp = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phone_number = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    phone_number_confirmed = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: true),
                    lockout_enabled = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    access_failed_count = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usr_users", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_role_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    role_id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    claim_type = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    claim_value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
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
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_user_claims",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    claim_type = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    claim_value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
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
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_user_logins",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    provider_key = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    provider_display_name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    user_id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
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
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_user_roles",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    role_id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
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
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "usr_user_tokens",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    login_provider = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    name = table.Column<string>(type: "varchar(255)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    value = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
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
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "usr_roles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[,]
                {
                    { "099efcaa-2e61-4c98-9387-a05bb8f4dce1", "2", "User", "User" },
                    { "ce0612fa-6c76-49bb-973c-e7a4f073bd79", "1", "Admin", "Admin" }
                });

            migrationBuilder.InsertData(
                table: "usr_users",
                columns: new[] { "id", "access_failed_count", "concurrency_stamp", "email", "email_confirmed", "lockout_enabled", "lockout_end", "normalized_email", "normalized_user_name", "password_hash", "phone_number", "phone_number_confirmed", "security_stamp", "two_factor_enabled", "user_name" },
                values: new object[,]
                {
                    { "2f8209b5-9d22-4087-ba26-799f9211c59e", 0, "1", "kfejzic1@etf.unsa.ba", true, false, null, "KFEJZIC1@ETF.UNSA.BA", "TESTINGUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062229993", true, "1e6d8d4b-bc9d-44f1-9250-3ad63d683ced", true, "testingUser" },
                    { "45607dbb-5ba8-46da-9432-8b0ca3be116e", 0, "1", "mbecirovic3@etf.unsa.ba", true, false, null, "MBECIROVIC3@ETF.UNSA.BA", "MBECIROVIC3", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "05348740-585e-4bcb-94d7-e940d3823966", true, "mbecirovic3" },
                    { "6461bebc-6e1a-4306-ac1b-a7188c6838b6", 0, "1", "amehmedagi1@etf.unsa.ba", true, false, null, "AMEHMEDAGI1@ETF.UNSA.BA", "AMEHMEDAGI1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "3b567bac-0594-49fc-be7d-1d445725d9b4", true, "amehmedagi1" },
                    { "8d25df41-5e23-4804-af13-c36e6897c2c2", 0, "1", "esmajic2@etf.unsa.ba", true, false, null, "ESMAJIC2@ETF.UNSA.BA", "ESMAJIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "01f18223-2cdb-4310-94fe-691df80374c7", true, "esmajic2" },
                    { "9b395a35-dd7c-482e-8c30-edb79f908274", 0, "1", "dmuhic1@etf.unsa.ba", true, false, null, "DMUHIC1@ETF.UNSA.BA", "DMUHIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "16693134-53e2-4c87-bf84-a31b64b7b7e7", true, "dmuhic1" },
                    { "a8323ab2-9750-43c4-b017-ca09ed9de913", 0, "1", "fejza2806@gmail.com", true, false, null, "FEJZA2806@GMAIL.COM", "ADMINUSER", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "062518214", true, "100a0af5-a351-4be1-961f-f0cf5333e24a", false, "adminUser" },
                    { "d0c2c564-bdec-4c16-825a-8d4ea7166a83", 0, "1", "emekic2@etf.unsa.ba", true, false, null, "EMEKIC2@ETF.UNSA.BA", "EMEKIC2", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "0e5f2dda-eda3-4c5c-a09b-90283826c924", true, "emekic2" },
                    { "fd979445-86c7-450a-bfcc-5ce03b0a2367", 0, "1", "abrulic1@etf.unsa.ba", true, false, null, "ABRULIC1@ETF.UNSA.BA", "ABRULIC1", "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", "11111", true, "1674356c-728e-4df5-8d14-4b90fa05f783", true, "abrulic1" }
                });

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
