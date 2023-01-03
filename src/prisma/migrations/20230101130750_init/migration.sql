-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `especialidade` VARCHAR(191) NOT NULL,
    `contaBancariaID` INTEGER NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_cpf_key`(`cpf`),
    UNIQUE INDEX `users_telefone_key`(`telefone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contaBancaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agencia` VARCHAR(191) NOT NULL,
    `banco` VARCHAR(191) NOT NULL,
    `conta` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plantoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NULL,
    `diaDaSemana` VARCHAR(191) NOT NULL,
    `statusDoPlantao` INTEGER NOT NULL,
    `userID` INTEGER NULL,
    `valor` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_contaBancariaID_fkey` FOREIGN KEY (`contaBancariaID`) REFERENCES `contaBancaria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantoes` ADD CONSTRAINT `plantoes_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
