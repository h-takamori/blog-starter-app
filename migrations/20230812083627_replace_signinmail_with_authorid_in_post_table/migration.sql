/*
  Warnings:

  - You are about to drop the column `signinmail` on the `post` table. All the data in the column will be lost.
  - Added the required column `authorid` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_signinmail_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "signinmail",
ADD COLUMN     "authorid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
