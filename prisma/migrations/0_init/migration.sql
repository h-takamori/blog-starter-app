-- CreateTable
CREATE TABLE "Blog_User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "picture" VARCHAR(255),

    CONSTRAINT "Blog_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255),
    "title" VARCHAR(255),
    "excerpt" VARCHAR(1023),
    "coverimage" VARCHAR(255),
    "date" VARCHAR(255),
    "authorid" INTEGER,
    "content" TEXT,
    "ogimage" VARCHAR(255),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Blog_User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

