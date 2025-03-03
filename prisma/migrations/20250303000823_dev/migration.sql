/*
  Warnings:

  - You are about to drop the column `deviceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `EducationalContent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_deviceId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deviceId";

-- DropTable
DROP TABLE "EducationalContent";

-- CreateTable
CREATE TABLE "Educational" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Educational_pkey" PRIMARY KEY ("id")
);
