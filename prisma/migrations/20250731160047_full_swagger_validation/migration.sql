/*
  Warnings:

  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."user_phone_key";

-- AlterTable
ALTER TABLE "public"."admin" ALTER COLUMN "phone" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "phone" SET NOT NULL;
