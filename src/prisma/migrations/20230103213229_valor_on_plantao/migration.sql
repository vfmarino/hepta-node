/*
  Warnings:

  - You are about to alter the column `valor` on the `Valor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `valorID` on the `plantoes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `plantoes` DROP FOREIGN KEY `plantoes_valorID_fkey`;

-- AlterTable
ALTER TABLE `Valor` MODIFY `valor` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `plantoes` DROP COLUMN `valorID`,
    ADD COLUMN `valor` INTEGER NULL;
