using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmlakOtomaston.Migrations
{
    /// <inheritdoc />
    public partial class @new : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_EmlakTypes_TypeId",
                table: "Emlaklar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmlakTypes",
                table: "EmlakTypes");

            migrationBuilder.RenameTable(
                name: "EmlakTypes",
                newName: "EmlakType");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmlakType",
                table: "EmlakType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_EmlakType_TypeId",
                table: "Emlaklar",
                column: "TypeId",
                principalTable: "EmlakType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_EmlakType_TypeId",
                table: "Emlaklar");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmlakType",
                table: "EmlakType");

            migrationBuilder.RenameTable(
                name: "EmlakType",
                newName: "EmlakTypes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmlakTypes",
                table: "EmlakTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_EmlakTypes_TypeId",
                table: "Emlaklar",
                column: "TypeId",
                principalTable: "EmlakTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
