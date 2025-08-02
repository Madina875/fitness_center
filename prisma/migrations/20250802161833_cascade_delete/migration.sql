-- DropForeignKey
ALTER TABLE "public"."user_role" DROP CONSTRAINT "user_role_userId_fkey";

-- AddForeignKey
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
