/*
  Warnings:

  - You are about to drop the column `bookedCount` on the `Slot` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "bookedCount",
DROP COLUMN "capacity";
