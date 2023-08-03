-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "picture" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "slug" VARCHAR(255),
    "title" VARCHAR(255),
    "excerpt" VARCHAR(1023),
    "coverimage" VARCHAR(255),
    "date" VARCHAR(255),
    "authorid" INTEGER NOT NULL,
    "content" TEXT,
    "ogimage" VARCHAR(255),

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

