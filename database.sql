
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

