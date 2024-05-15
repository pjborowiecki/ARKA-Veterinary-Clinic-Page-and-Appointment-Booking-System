DO $$ BEGIN
 CREATE TYPE "public"."booking_status" AS ENUM('niepotwierdzone', 'potwierdzone', 'anulowane', 'odrzucone');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."operating_status" AS ENUM('otwarte', 'zamknięte');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."service_type" AS ENUM('weterynarz', 'salon fryzur');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_role" AS ENUM('klient', 'administrator');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"userId" varchar(512) NOT NULL,
	"type" varchar(256) NOT NULL,
	"provider" varchar(256) NOT NULL,
	"providerAccountId" varchar(512) NOT NULL,
	"refresh_token" varchar(512),
	"access_token" varchar(512),
	"expires_at" integer,
	"token_type" varchar(256),
	"scope" varchar(256),
	"id_token" varchar(512),
	"session_state" varchar(256),
	CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"type" "service_type" DEFAULT 'weterynarz' NOT NULL,
	"date" date NOT NULL,
	"time" varchar(5) NOT NULL,
	"firstName" varchar(32) NOT NULL,
	"lastName" varchar(64) NOT NULL,
	"email" varchar(64) NOT NULL,
	"phone" varchar(16) NOT NULL,
	"message" varchar(10240),
	"status" "booking_status" DEFAULT 'niepotwierdzone' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "business_hours" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"monday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"tuesday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"wednesday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"thursday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"friday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"saturday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"sunday_status" "operating_status" DEFAULT 'otwarte' NOT NULL,
	"monday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"tuesday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"wednesday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"thursday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"friday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"saturday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"sunday_opening" varchar(5) DEFAULT '09:00' NOT NULL,
	"monday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"tuesday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"wednesday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"thursday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"friday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"saturday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"sunday_closing" varchar(5) DEFAULT '17:00' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clinics" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"longitude" varchar(24) NOT NULL,
	"latitude" varchar(24) NOT NULL,
	"address" varchar(128) NOT NULL,
	"phone_1" varchar(16) NOT NULL,
	"phone_2" varchar(16) NOT NULL,
	"email" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "datesUnavailable" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"sessionToken" varchar(512) PRIMARY KEY NOT NULL,
	"userId" varchar(512) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"role" "user_role" DEFAULT 'klient' NOT NULL,
	"name" varchar(64),
	"email" varchar(64) NOT NULL,
	"emailVerified" timestamp,
	"emailVerificationToken" varchar(512),
	"passwordHash" varchar(256),
	"resetPasswordToken" varchar(512),
	"resetPasswordTokenExpires" timestamp,
	"image" varchar(512),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_emailVerificationToken_unique" UNIQUE("emailVerificationToken"),
	CONSTRAINT "users_resetPasswordToken_unique" UNIQUE("resetPasswordToken")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationTokens" (
	"identifier" varchar(512) NOT NULL,
	"token" varchar(512) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationTokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
