/*
  Warnings:

  - You are about to drop the column `reason` on the `Holiday` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "HolidayType" AS ENUM ('ANNUAL', 'SICK', 'DENTIST', 'TRAINING');

-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "reason",
ADD COLUMN     "type" "HolidayType" NOT NULL DEFAULT E'ANNUAL';
