-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "excerpt" VARCHAR(1023) NOT NULL,
    "coverimage" VARCHAR(255),
    "date" VARCHAR(255) NOT NULL,
    "authorid" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "ogimage" VARCHAR(255),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

