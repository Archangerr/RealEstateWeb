﻿// <auto-generated />
using System;
using EmlakOtomaston.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmlakOtomaston.Migrations
{
    [DbContext(typeof(EmlakContext))]
    [Migration("20230808054758_EmlakOtomasyon")]
    partial class EmlakOtomasyon
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmlakOtomaston.Entity.Emlak", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Doviz")
                        .HasColumnType("int");

                    b.Property<int>("Durumu")
                        .HasColumnType("int");

                    b.Property<int?>("EmlakciId")
                        .HasColumnType("int");

                    b.Property<int>("Fiyat")
                        .HasColumnType("int");

                    b.Property<DateTime>("IlanBitis")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("IlanTarihi")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImageBase")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<bool>("isAvailable")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("EmlakciId");

                    b.ToTable("Emlaklar");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.Emlakci", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Emlakcilar");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.Emlak", b =>
                {
                    b.HasOne("EmlakOtomaston.Entity.Emlakci", null)
                        .WithMany("Emlaklar")
                        .HasForeignKey("EmlakciId");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.Emlakci", b =>
                {
                    b.Navigation("Emlaklar");
                });
#pragma warning restore 612, 618
        }
    }
}
