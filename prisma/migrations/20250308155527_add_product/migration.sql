/*
  Warnings:

  - Added the required column `product` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Score" ADD COLUMN     "product" TEXT NOT NULL;
