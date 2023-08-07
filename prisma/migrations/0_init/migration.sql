-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "picture" VARCHAR(255) NOT NULL DEFAULT '/assets/blog/authors/default-icon.png',

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "excerpt" VARCHAR(1023) NOT NULL,
    "coverimage" VARCHAR(255) NOT NULL DEFAULT '/assets/blog/download/default-image.jpg',
    "date" VARCHAR(255) NOT NULL,
    "authorid" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "post_slug_key" ON "post"("slug");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

