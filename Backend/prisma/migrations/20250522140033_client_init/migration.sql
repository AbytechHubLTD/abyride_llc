-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Client_email` VARCHAR(191) NULL,
    `Client_phoneNumber` VARCHAR(191) NULL,

    UNIQUE INDEX `Client_Client_email_key`(`Client_email`),
    UNIQUE INDEX `Client_Client_phoneNumber_key`(`Client_phoneNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
