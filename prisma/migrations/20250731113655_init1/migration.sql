-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_role" (
    "roleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("roleId","userId")
);

-- CreateTable
CREATE TABLE "public"."fitness_center" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "managerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fitness_center_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_center" (
    "userId" INTEGER NOT NULL,
    "centerId" INTEGER NOT NULL,
    "isAccepted" BOOLEAN NOT NULL,

    CONSTRAINT "user_center_pkey" PRIMARY KEY ("userId","centerId")
);

-- CreateTable
CREATE TABLE "public"."images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL,
    "centerId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "centerId" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subscription" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "centerId" INTEGER NOT NULL,
    "planName" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "centerId" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "maintenanceAt" TIMESTAMP(3),

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."class_schedule" (
    "id" SERIAL NOT NULL,
    "centerId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "class_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."class_booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL,
    "bookedAt" TIMESTAMP(3) NOT NULL,
    "attended" BOOLEAN NOT NULL,

    CONSTRAINT "class_booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."goals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."goal_progress" (
    "id" SERIAL NOT NULL,
    "goalId" INTEGER NOT NULL,
    "progress" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "loggedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goal_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."achivements" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "achivedAt" TIMESTAMP(3) NOT NULL,
    "centerId" INTEGER NOT NULL,

    CONSTRAINT "achivements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "is_read" BOOLEAN NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "centerId" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "is_owner" BOOLEAN NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."district" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "public"."user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "public"."admin"("email");

-- AddForeignKey
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_role" ADD CONSTRAINT "user_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fitness_center" ADD CONSTRAINT "fitness_center_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "public"."district"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fitness_center" ADD CONSTRAINT "fitness_center_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."fitness_center" ADD CONSTRAINT "fitness_center_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_center" ADD CONSTRAINT "user_center_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_center" ADD CONSTRAINT "user_center_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subscription" ADD CONSTRAINT "subscription_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_schedule" ADD CONSTRAINT "class_schedule_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_schedule" ADD CONSTRAINT "class_schedule_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_booking" ADD CONSTRAINT "class_booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."class_booking" ADD CONSTRAINT "class_booking_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."class_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."goals" ADD CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."goal_progress" ADD CONSTRAINT "goal_progress_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "public"."goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achivements" ADD CONSTRAINT "achivements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achivements" ADD CONSTRAINT "achivements_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "public"."goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."achivements" ADD CONSTRAINT "achivements_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "public"."fitness_center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."district" ADD CONSTRAINT "district_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "public"."region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
