using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmlakOtomaston.Migrations
{
    /// <inheritdoc />
    public partial class EmlakOtomasyon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Emlakcilar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emlakcilar", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Emlaklar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Doviz = table.Column<int>(type: "int", nullable: false),
                    Fiyat = table.Column<int>(type: "int", nullable: false),
                    Durumu = table.Column<int>(type: "int", nullable: false),
                    IlanTarihi = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IlanBitis = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageBase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isAvailable = table.Column<bool>(type: "bit", nullable: false),
                    EmlakciId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Emlaklar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Emlaklar_Emlakcilar_EmlakciId",
                        column: x => x.EmlakciId,
                        principalTable: "Emlakcilar",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Emlaklar_EmlakciId",
                table: "Emlaklar",
                column: "EmlakciId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Emlaklar");

            migrationBuilder.DropTable(
                name: "Emlakcilar");
        }
    }
}
