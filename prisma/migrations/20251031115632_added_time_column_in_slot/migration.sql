/*
  Warnings:

  - Added the required column `time` to the `Slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Slot" ADD COLUMN     "time" TEXT NOT NULL;
