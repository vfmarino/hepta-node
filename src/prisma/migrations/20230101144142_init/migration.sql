/*
  Warnings:

  - You are about to drop the column `setorID` on the `hospitais` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `hospitais` DROP FOREIGN KEY `Hospitais_setorID_fkey`;

-- AlterTable
ALTER TABLE `hospitais` DROP COLUMN `setorID`;

-- AlterTable
ALTER TABLE `setores` ADD COLUMN `hospitalID` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Setores` ADD CONSTRAINT `Setores_hospitalID_fkey` FOREIGN KEY (`hospitalID`) REFERENCES `Hospitais`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
