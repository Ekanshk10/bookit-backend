/*
  Warnings:

  - You are about to drop the column `value` on the `PromoCode` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PromoCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usedCount` to the `PromoCode` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `discountType` on the `PromoCode` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FLAT');

-- AlterTable
ALTER TABLE "PromoCode" DROP COLUMN "value",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "usageLimit" INTEGER,
ADD COLUMN     "usedCount" INTEGER NOT NULL,
DROP COLUMN "discountType",
ADD COLUMN     "discountType" "DiscountType" NOT NULL;
