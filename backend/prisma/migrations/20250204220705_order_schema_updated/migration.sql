/*
  Warnings:

  - You are about to drop the column `logistics_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `contact_info` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `delivery_preferences` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "logistics_id",
ADD COLUMN     "contact_info" JSONB NOT NULL,
ADD COLUMN     "delivery_preferences" JSONB NOT NULL,
ALTER COLUMN "quote_id" DROP NOT NULL;
