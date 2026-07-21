using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GerenteFinanceiro.API.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoColunaData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Data",
                table: "Transacoes",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Descricao",
                table: "Transacoes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Tipo",
                table: "Transacoes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Valor",
                table: "Transacoes",
                type: "numeric",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "Transacoes");

            migrationBuilder.DropColumn(
                name: "Descricao",
                table: "Transacoes");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Transacoes");

            migrationBuilder.DropColumn(
                name: "Valor",
                table: "Transacoes");
        }
    }
}
