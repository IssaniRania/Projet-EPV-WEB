using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EPVBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Produits",
                columns: table => new
                {
                    codeBarres = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tva = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produits", x => x.codeBarres);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Produits");
        }
    }
}
