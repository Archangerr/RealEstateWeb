﻿// <auto-generated />
using System;
using EmlakOtomaston.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmlakOtomaston.Migrations
{
    [DbContext(typeof(EmlakContext))]
    partial class EmlakContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmlakOtomaston.Entity.Doviz", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Dovizler");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.Emlak", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DovizId")
                        .HasColumnType("int");

                    b.Property<int>("DurumuId")
                        .HasColumnType("int");

                    b.Property<int>("EmlakciId")
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

                    b.Property<int>("TypeId")
                        .HasColumnType("int");

                    b.Property<bool>("isAvailable")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("DovizId");

                    b.HasIndex("DurumuId");

                    b.HasIndex("EmlakciId");

                    b.HasIndex("TypeId");

                    b.ToTable("Emlaklar");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.EmlakDurumu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EmlakDurumlari");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.EmlakType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EmlakType");
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
                    b.HasOne("EmlakOtomaston.Entity.Doviz", "Doviz")
                        .WithMany()
                        .HasForeignKey("DovizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmlakOtomaston.Entity.EmlakDurumu", "Durumu")
                        .WithMany()
                        .HasForeignKey("DurumuId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmlakOtomaston.Entity.Emlakci", "Emlakci")
                        .WithMany("Emlaklar")
                        .HasForeignKey("EmlakciId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmlakOtomaston.Entity.EmlakType", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Doviz");

                    b.Navigation("Durumu");

                    b.Navigation("Emlakci");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("EmlakOtomaston.Entity.Emlakci", b =>
                {
                    b.Navigation("Emlaklar");
                });
#pragma warning restore 612, 618
        }
    }
}
