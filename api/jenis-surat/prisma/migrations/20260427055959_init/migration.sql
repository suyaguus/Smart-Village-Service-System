-- CreateTable
CREATE TABLE "tb_jenis_surat" (
    "id" SERIAL NOT NULL,
    "nama_surat" VARCHAR(255) NOT NULL,
    "kode_surat" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_jenis_surat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_jenis_surat_kode_surat_key" ON "tb_jenis_surat"("kode_surat");
