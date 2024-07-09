-- DropForeignKey
ALTER TABLE "destination" DROP CONSTRAINT "destination_directionId_fkey";

-- DropForeignKey
ALTER TABLE "direction" DROP CONSTRAINT "direction_gigId_fkey";

-- DropForeignKey
ALTER TABLE "gig" DROP CONSTRAINT "gig_userId_fkey";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_gigId_fkey";

-- DropForeignKey
ALTER TABLE "history" DROP CONSTRAINT "history_userId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_gigId_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_userId_fkey";

-- DropForeignKey
ALTER TABLE "source" DROP CONSTRAINT "source_directionId_fkey";

-- DropIndex
DROP INDEX "history_userId_key";

-- DropIndex
DROP INDEX "review_userId_key";

-- AddForeignKey
ALTER TABLE "gig" ADD CONSTRAINT "gig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gig"("gig_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gig"("gig_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direction" ADD CONSTRAINT "direction_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gig"("gig_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source" ADD CONSTRAINT "source_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "direction"("direction_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination" ADD CONSTRAINT "destination_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "direction"("direction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
