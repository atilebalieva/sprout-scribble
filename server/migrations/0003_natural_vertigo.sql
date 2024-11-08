CREATE TABLE IF NOT EXISTS "emailToken" (
	"identifier" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "emailToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
