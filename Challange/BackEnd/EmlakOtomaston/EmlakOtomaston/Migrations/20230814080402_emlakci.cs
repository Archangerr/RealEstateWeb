using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmlakOtomaston.Migrations
{
    /// <inheritdoc />
    public partial class emlakci : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_Emlakcilar_EmlakciId",
                table: "Emlaklar");

            migrationBuilder.AlterColumn<int>(
                name: "EmlakciId",
                table: "Emlaklar",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_Emlakcilar_EmlakciId",
                table: "Emlaklar",
                column: "EmlakciId",
                principalTable: "Emlakcilar",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Emlaklar_Emlakcilar_EmlakciId",
                table: "Emlaklar");

            migrationBuilder.AlterColumn<int>(
                name: "EmlakciId",
                table: "Emlaklar",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Emlaklar_Emlakcilar_EmlakciId",
                table: "Emlaklar",
                column: "EmlakciId",
                principalTable: "Emlakcilar",
                principalColumn: "Id");
        }
    }
}
