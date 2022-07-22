/*
  Warnings:

  - Added the required column `receipt` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "receipt" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'PENDING';
