/*
  Warnings:

  - Added the required column `name` to the `LinkGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkGroup" ADD COLUMN     "name" TEXT NOT NULL;
