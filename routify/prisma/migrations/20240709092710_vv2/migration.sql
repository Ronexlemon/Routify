/*
  Warnings:

  - You are about to drop the column `userId` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - The required column `userid` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "gig" DROP CONSTRAINT "gig_userId_fkey";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_userId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- AlterTable
ALTER TABLE "history" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "userid" TEXT NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("userid");

-- AddForeignKey
ALTER TABLE "gig" ADD CONSTRAINT "gig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
