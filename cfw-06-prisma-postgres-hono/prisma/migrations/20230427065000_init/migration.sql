-- CreateTable
CREATE TABLE "file_upload_history" (
    "id" SERIAL NOT NULL,
    "file_url" VARCHAR(100) NOT NULL,
    "file_name" VARCHAR(100),
    "file_s3_url" VARCHAR(100),
    "file_new_name" VARCHAR(50),
    "vendor_name" VARCHAR(50),
    "bucket_name" VARCHAR(50),
    "file_path" VARCHAR(100),
    "file_size" INTEGER,
    "media_type" VARCHAR(50),
    "file_suffix" VARCHAR(50),
    "created_by" TEXT DEFAULT 'sys',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_by" TEXT DEFAULT 'sys',
    "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_upload_history_pkey" PRIMARY KEY ("id")
);
