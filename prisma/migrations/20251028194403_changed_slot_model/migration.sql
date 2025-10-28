/*
  Warnings:

  - You are about to drop the column `totalSlot` on the `Slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Slot" DROP COLUMN "totalSlot",
ADD COLUMN     "totalSlots" INTEGER NOT NULL DEFAULT 10;
