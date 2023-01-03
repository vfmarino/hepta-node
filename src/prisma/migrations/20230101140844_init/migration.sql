/*
  Warnings:

  - You are about to drop the column `statusDoPlantao` on the `plantoes` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `plantoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `plantoes` DROP COLUMN `statusDoPlantao`,
    DROP COLUMN `valor`,
    ADD COLUMN `peridoID` INTEGER NULL,
    ADD COLUMN `setorID` INTEGER NULL,
    ADD COLUMN `statusID` INTEGER NULL,
    ADD COLUMN `valorID` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `roleID` INTEGER NULL;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hospitais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospital` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Setores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setores` VARCHAR(191) NOT NULL,
    `hospitalID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Setores` ADD CONSTRAINT `Setores_hospitalID_fkey` FOREIGN KEY (`hospitalID`) REFERENCES `Hospitais`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `MotivosDeTroca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantaoID` INTEGER NOT NULL,
    `userID` INTEGER NOT NULL,
    `dataDaSolicitacao` DATETIME(3) NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `periodo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Valor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleID_fkey` FOREIGN KEY (`roleID`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantoes` ADD CONSTRAINT `plantoes_setorID_fkey` FOREIGN KEY (`setorID`) REFERENCES `Setores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantoes` ADD CONSTRAINT `plantoes_peridoID_fkey` FOREIGN KEY (`peridoID`) REFERENCES `Periodo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantoes` ADD CONSTRAINT `plantoes_statusID_fkey` FOREIGN KEY (`statusID`) REFERENCES `Status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantoes` ADD CONSTRAINT `plantoes_valorID_fkey` FOREIGN KEY (`valorID`) REFERENCES `Valor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
