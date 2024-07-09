-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'JOB');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "gig" (
    "gig_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "gig_pkey" PRIMARY KEY ("gig_id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direction" (
    "direction_id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,

    CONSTRAINT "direction_pkey" PRIMARY KEY ("direction_id")
);

-- CreateTable
CREATE TABLE "source" (
    "source_id" TEXT NOT NULL,
    "latitude" TEXT,
    "directionId" TEXT NOT NULL,

    CONSTRAINT "source_pkey" PRIMARY KEY ("source_id")
);

-- CreateTable
CREATE TABLE "destination" (
    "id" TEXT NOT NULL,
    "latitude" TEXT,
    "directionId" TEXT NOT NULL,

    CONSTRAINT "destination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phonenumber_key" ON "user"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "gig_userId_key" ON "gig"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "review_gigId_key" ON "review"("gigId");

-- CreateIndex
CREATE UNIQUE INDEX "review_userId_key" ON "review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "history_gigId_key" ON "history"("gigId");

-- CreateIndex
CREATE UNIQUE INDEX "history_userId_key" ON "history"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "direction_gigId_key" ON "direction"("gigId");

-- CreateIndex
CREATE UNIQUE INDEX "source_directionId_key" ON "source"("directionId");

-- CreateIndex
CREATE UNIQUE INDEX "destination_directionId_key" ON "destination"("directionId");

-- AddForeignKey
ALTER TABLE "gig" ADD CONSTRAINT "gig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gig"("gig_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gig"("gig_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direction" ADD CONSTRAINT "direction_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "gig"("gig_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "source" ADD CONSTRAINT "source_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "direction"("direction_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "destination" ADD CONSTRAINT "destination_directionId_fkey" FOREIGN KEY ("directionId") REFERENCES "direction"("direction_id") ON DELETE CASCADE ON UPDATE CASCADE;
