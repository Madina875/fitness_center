/*
  Warnings:

  - You are about to drop the column `password` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `hashedPassword` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."admin" DROP COLUMN "password",
ADD COLUMN     "activation_link" TEXT,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT,
ALTER COLUMN "is_active" DROP NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "password",
ADD COLUMN     "activation_link" TEXT,
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT,
ALTER COLUMN "is_active" DROP NOT NULL;
