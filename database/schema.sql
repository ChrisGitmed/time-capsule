set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "capsules" (
	"capsuleId" serial NOT NULL,
	"recipient" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"sendOn" timestamp with time zone NOT NULL,
	"type" text not null,
	"sentAt" timestamp with time zone,
	"isDownloaded" bool,
	"userId" int ,
	CONSTRAINT "capsules_pk" PRIMARY KEY ("capsuleId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"userId" serial ,
	"username" text not null,
	"hashedPassword" text not null,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "capsules" ADD CONSTRAINT "capsules_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
