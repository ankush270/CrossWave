-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_company_docs_done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_kyc_done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_personal_docs_done" BOOLEAN NOT NULL DEFAULT false;
