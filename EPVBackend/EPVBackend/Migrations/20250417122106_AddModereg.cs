using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EPVBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddModereg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ModeReglement",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MoyenPaiement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tiroir = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ModeReglement", x => x.Code);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ModeReglement");
        }
    }
}
