/*
  Warnings:

  - You are about to drop the `hospitais` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `setores` DROP FOREIGN KEY `Setores_hospitalID_fkey`;

-- DropTable
DROP TABLE `hospitais`;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Setores` ADD CONSTRAINT `Setores_hospitalID_fkey` FOREIGN KEY (`hospitalID`) REFERENCES `Hospital`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
