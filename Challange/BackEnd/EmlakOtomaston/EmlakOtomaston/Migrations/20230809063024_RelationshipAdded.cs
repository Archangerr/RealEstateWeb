using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmlakOtomaston.Migrations
{
    /// <inheritdoc />
    public partial class RelationshipAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Emlaklar",
                newName: "TypeId");

            migrationBuilder.RenameColumn(
                name: "Durumu",
                table: "Emlaklar",
                newName: "DurumuId");

            migrationBuilder.RenameColumn(
                name: "Doviz",
                table: "Emlaklar",
                newName: "DovizId");

            migrationBuilder.CreateTable(
                name: "Dovizler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dovizler", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmlakDurumlari",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmlakDurumlari", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EmlakTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmlakTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Emlaklar_DovizId",
                table: "Emlaklar",
                column: "DovizId");

            migrationBuilder.CreateIndex(
                name: "IX_Emlaklar_DurumuId",
                table: "Emlaklar",
                column: "DurumuId");

            migrationBuilder.CreateIndex(
                name: "IX_Emlaklar_TypeId",
                table: "Emlaklar",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_Dovizler_DovizId",
                table: "Emlaklar",
                column: "DovizId",
                principalTable: "Dovizler",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_EmlakDurumlari_DurumuId",
                table: "Emlaklar",
                column: "DurumuId",
                principalTable: "EmlakDurumlari",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_EmlakTypes_TypeId",
                table: "Emlaklar",
                column: "TypeId",
                principalTable: "EmlakTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_Dovizler_DovizId",
                table: "Emlaklar");

            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_EmlakDurumlari_DurumuId",
                table: "Emlaklar");

            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_EmlakTypes_TypeId",
                table: "Emlaklar");

            migrationBuilder.DropTable(
                name: "Dovizler");

            migrationBuilder.DropTable(
                name: "EmlakDurumlari");

            migrationBuilder.DropTable(
                name: "EmlakTypes");

            migrationBuilder.DropIndex(
                name: "IX_Emlaklar_DovizId",
                table: "Emlaklar");

            migrationBuilder.DropIndex(
                name: "IX_Emlaklar_DurumuId",
                table: "Emlaklar");

            migrationBuilder.DropIndex(
                name: "IX_Emlaklar_TypeId",
                table: "Emlaklar");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "Emlaklar",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "DurumuId",
                table: "Emlaklar",
                newName: "Durumu");

            migrationBuilder.RenameColumn(
                name: "DovizId",
                table: "Emlaklar",
                newName: "Doviz");
        }
    }
}
