/*
  Warnings:

  - The primary key for the `reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `people` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentUrl` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` DROP PRIMARY KEY,
    DROP COLUMN `amount`,
    DROP COLUMN `name`,
    DROP COLUMN `people`,
    DROP COLUMN `phone`,
    DROP COLUMN `time`,
    ADD COLUMN `duration` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
