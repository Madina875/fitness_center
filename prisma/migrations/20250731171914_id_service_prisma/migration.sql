/*
  Warnings:

  - The primary key for the `user_center` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,centerId]` on the table `user_center` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId,userId]` on the table `user_role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user_center" DROP CONSTRAINT "user_center_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_center_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."user_role" DROP CONSTRAINT "user_role_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_role_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_center_userId_centerId_key" ON "public"."user_center"("userId", "centerId");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_roleId_userId_key" ON "public"."user_role"("roleId", "userId");
