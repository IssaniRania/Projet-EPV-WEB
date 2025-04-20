using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EPVBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddResetPasswordFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResetToken",
                table: "Utilisateur",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ResetTokenExpiry",
                table: "Utilisateur",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResetToken",
                table: "Utilisateur");

            migrationBuilder.DropColumn(
                name: "ResetTokenExpiry",
                table: "Utilisateur");
        }
    }
}
