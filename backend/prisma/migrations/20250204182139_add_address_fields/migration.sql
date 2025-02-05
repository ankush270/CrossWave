/*
  Warnings:

  - Added the required column `city` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinCode` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "pinCode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
