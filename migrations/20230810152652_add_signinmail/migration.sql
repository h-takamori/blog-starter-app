/*
  Warnings:

  - You are about to drop the column `authorid` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[signinmail]` on the table `author` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[signinmail]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `signinmail` to the `author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signinmail` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorid_fkey";

-- AlterTable
ALTER TABLE "author" ADD COLUMN     "signinmail" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "authorid",
ADD COLUMN     "signinmail" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "author_signinmail_key" ON "author"("signinmail");

-- CreateIndex
CREATE UNIQUE INDEX "post_signinmail_key" ON "post"("signinmail");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_signinmail_fkey" FOREIGN KEY ("signinmail") REFERENCES "author"("signinmail") ON DELETE NO ACTION ON UPDATE NO ACTION;
