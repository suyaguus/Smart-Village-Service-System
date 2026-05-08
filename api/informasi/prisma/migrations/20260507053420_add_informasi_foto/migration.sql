-- CreateTable
CREATE TABLE "tb_informasi" (
    "id" SERIAL NOT NULL,
    "admin_id" VARCHAR(50) NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "isi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_informasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_informasi_foto" (
    "id" SERIAL NOT NULL,
    "informasi_id" INTEGER NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_informasi_foto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_informasi_foto" ADD CONSTRAINT "tb_informasi_foto_informasi_id_fkey" FOREIGN KEY ("informasi_id") REFERENCES "tb_informasi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
