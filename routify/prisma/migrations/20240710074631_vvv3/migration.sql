/*
  Warnings:

  - The `latitude` column on the `destination` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `destination` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `latitude` column on the `source` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `source` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "destination" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "source" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DOUBLE PRECISION,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DOUBLE PRECISION;
