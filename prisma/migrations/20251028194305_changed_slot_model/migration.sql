/*
  Warnings:

  - A unique constraint covering the columns `[userId,slotId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `avaliableSlots` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "avaliableSlots" INTEGER NOT NULL,
ADD COLUMN     "totalSlot" INTEGER NOT NULL DEFAULT 10;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_slotId_key" ON "Booking"("userId", "slotId");
