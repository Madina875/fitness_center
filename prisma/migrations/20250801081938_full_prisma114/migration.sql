/*
  Warnings:

  - The `status` column on the `subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isAccepted` on the `user_center` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('active', 'inactione', 'expired', 'cancelled');

-- AlterTable
ALTER TABLE "public"."achivements" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "achivedAt" DROP NOT NULL,
ALTER COLUMN "achivedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."admin" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "is_owner" DROP NOT NULL,
ALTER COLUMN "is_owner" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."class_booking" ALTER COLUMN "bookedAt" DROP NOT NULL,
ALTER COLUMN "bookedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "attended" DROP NOT NULL,
ALTER COLUMN "attended" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."equipment" ALTER COLUMN "available" DROP NOT NULL,
ALTER COLUMN "available" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."fitness_center" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."goal_progress" ALTER COLUMN "note" DROP NOT NULL,
ALTER COLUMN "loggedAt" DROP NOT NULL,
ALTER COLUMN "loggedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."goals" ALTER COLUMN "deadline" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."images" ALTER COLUMN "is_main" DROP NOT NULL,
ALTER COLUMN "is_main" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."notification" ALTER COLUMN "is_read" DROP NOT NULL,
ALTER COLUMN "is_read" SET DEFAULT false,
ALTER COLUMN "sentAt" DROP NOT NULL,
ALTER COLUMN "sentAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."payment" ALTER COLUMN "payedAt" DROP NOT NULL,
ALTER COLUMN "payedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."reviews" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."subscription" ALTER COLUMN "startAt" DROP NOT NULL,
ALTER COLUMN "endAt" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."SubscriptionStatus" DEFAULT 'active';

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."user_center" DROP COLUMN "isAccepted";
