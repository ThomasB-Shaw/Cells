
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

 CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(105) NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin" BOOLEAN DEFAULT false
);



CREATE TABLE "painting" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" varchar(255),
	"image_url" varchar(2058) NOT NULL,
	"date" DATE NOT NULL,
	"size_type" varchar(105) NOT NULL
);

-- DUMMY DATA FOR PAINTINGS TABLE
INSERT INTO "painting"("id","user_id","title","description","image_url","date","size_type")
VALUES
(1,E'Rainbow Road',E'Coles Best one yet',E'/images/Snapchat-1443581656.jpg',E'2019-11-23',E'12x24'),
(1,E'Until the Quiet Comes',E'Not my best work by my friend Zach likes it!!',E'/images/Snapchat-91313157.jpg',E'2019-07-18',E'12x36'),
(1,E'Chrome on Water',E'Coles Favorite painting',E'/images/Snapchat-1504703270.jpg',E'2019-11-23',E'12x24'),
(1,E'Breate Deeper',E'My Favorite Painting yet!',E'/images/Snapchat-1658784163.jpg',E'2019-07-11',E'12x36'),
(1,E'Pumpkin Hill',E'Holloween Painting 2020!',E'/images/Snapchat-1619132025.jpg',E'2020-10-31',E'12x24'),
(1,E'Fever The Ghost',E'Kinda looks like a skull in the top right huh?',E'/images/Snapchat-2032616108.jpg',E'2019-12-28',E'18x20');



CREATE TABLE "painting_component" (
	"id" serial NOT NULL,
	"painting_id" integer NOT NULL,
	"component_id" integer NOT NULL
);



CREATE TABLE "component" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	"brand" varchar(255),
	"type" varchar(255) NOT NULL
);

SELECT * FROM "painting"
JOIN "user" ON "user"."id" = "painting"."id"
JOIN "painting_component" ON "painting"."id" = "painting_component"."painting_id"
JOIN "component" ON "component"."id" = "painting_component"."component_id"
WHERE "painting"."id" = $1;