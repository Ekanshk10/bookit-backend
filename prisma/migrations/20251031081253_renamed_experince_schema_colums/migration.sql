/*
  Warnings:

  - You are about to drop the column `state` on the `Experience` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[experienceName,location]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `experienceName` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Experience_location_key";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "state",
ADD COLUMN     "experienceName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Experience_experienceName_location_key" ON "Experience"("experienceName", "location");
