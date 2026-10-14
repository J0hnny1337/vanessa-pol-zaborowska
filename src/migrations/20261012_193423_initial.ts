import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_paintings_status" AS ENUM('available', 'sold');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_media_kind" AS ENUM('painting', 'artist', 'event');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_site_settings_social_label" AS ENUM('Instagram', 'Facebook');
  CREATE TYPE "public"."enum__site_settings_v_version_social_label" AS ENUM('Instagram', 'Facebook');
  CREATE TABLE "paintings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"series_id" integer,
  	"year" numeric,
  	"width_cm" numeric,
  	"height_cm" numeric,
  	"technique" varchar,
  	"status" "enum_paintings_status" DEFAULT 'available' NOT NULL,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "series" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"years" varchar,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "exhibitions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"place" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" timestamp(3) with time zone,
  	"place" varchar,
  	"cover_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_place" varchar,
  	"version_cover_id" integer,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"kind" "enum_media_kind" DEFAULT 'painting',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"paintings_id" integer,
  	"series_id" integer,
  	"exhibitions_id" integer,
  	"news_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_painting_id" integer NOT NULL,
  	"quote" varchar NOT NULL,
  	"show_news" boolean DEFAULT true,
  	"show_about" boolean DEFAULT false,
  	"show_cta" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_painting_id" integer NOT NULL,
  	"version_quote" varchar NOT NULL,
  	"version_show_news" boolean DEFAULT true,
  	"version_show_about" boolean DEFAULT false,
  	"version_show_cta" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portfolio_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_portfolio_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_subtitle" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_exhibition_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"portrait_id" integer,
  	"bio" jsonb NOT NULL,
  	"statement" jsonb,
  	"collections" varchar DEFAULT 'Polska i za granicą',
  	"portfolio_pdf_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_v_version_exhibition_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_subtitle" varchar,
  	"version_portrait_id" integer,
  	"version_bio" jsonb NOT NULL,
  	"version_statement" jsonb,
  	"version_collections" varchar DEFAULT 'Polska i za granicą',
  	"version_portfolio_pdf_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_page_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "news_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"gallery_title" varchar DEFAULT 'Z wystaw i wydarzeń',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_news_page_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_news_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_subtitle" varchar,
  	"version_gallery_title" varchar DEFAULT 'Z wystaw i wydarzeń',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "talks_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"place" varchar
  );
  
  CREATE TABLE "talks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"photo_id" integer,
  	"body" jsonb,
  	"list_title" varchar DEFAULT 'Dotychczasowe spotkania',
  	"invite" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_talks_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"place" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_talks_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_subtitle" varchar,
  	"version_photo_id" integer,
  	"version_body" jsonb,
  	"version_list_title" varchar DEFAULT 'Dotychczasowe spotkania',
  	"version_invite" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "education" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"photo_id" integer,
  	"body" jsonb,
  	"invite" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_education_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_subtitle" varchar,
  	"version_photo_id" integer,
  	"version_body" jsonb,
  	"version_invite" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"photo_id" integer,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_subtitle" varchar,
  	"version_photo_id" integer,
  	"version_body" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "portraits_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "portraits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"lead" varchar,
  	"photo_id" integer,
  	"heading" varchar DEFAULT 'Portrety',
  	"body" jsonb,
  	"needs_title" varchar,
  	"gallery_title" varchar DEFAULT 'Wybrane portrety',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "portraits_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"paintings_id" integer
  );
  
  CREATE TABLE "_portraits_v_version_needs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portraits_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar NOT NULL,
  	"version_subtitle" varchar,
  	"version_lead" varchar,
  	"version_photo_id" integer,
  	"version_heading" varchar DEFAULT 'Portrety',
  	"version_body" jsonb,
  	"version_needs_title" varchar,
  	"version_gallery_title" varchar DEFAULT 'Wybrane portrety',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_portraits_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"paintings_id" integer
  );
  
  CREATE TABLE "site_settings_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" "enum_site_settings_social_label" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"artist_name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"logo_id" integer,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"footer_note" varchar,
  	"cta_title" varchar NOT NULL,
  	"cta_button_label" varchar NOT NULL,
  	"cta_href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_settings_v_version_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" "enum__site_settings_v_version_social_label" NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_artist_name" varchar NOT NULL,
  	"version_tagline" varchar NOT NULL,
  	"version_logo_id" integer,
  	"version_email" varchar NOT NULL,
  	"version_phone" varchar,
  	"version_footer_note" varchar,
  	"version_cta_title" varchar NOT NULL,
  	"version_cta_button_label" varchar NOT NULL,
  	"version_cta_href" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "paintings" ADD CONSTRAINT "paintings_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "paintings" ADD CONSTRAINT "paintings_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_paintings_fk" FOREIGN KEY ("paintings_id") REFERENCES "public"."paintings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exhibitions_fk" FOREIGN KEY ("exhibitions_id") REFERENCES "public"."exhibitions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_painting_id_paintings_id_fk" FOREIGN KEY ("hero_painting_id") REFERENCES "public"."paintings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_painting_id_paintings_id_fk" FOREIGN KEY ("version_hero_painting_id") REFERENCES "public"."paintings"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_exhibition_photos" ADD CONSTRAINT "about_exhibition_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_exhibition_photos" ADD CONSTRAINT "about_exhibition_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_portfolio_pdf_id_media_id_fk" FOREIGN KEY ("portfolio_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_version_exhibition_photos" ADD CONSTRAINT "_about_v_version_exhibition_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v_version_exhibition_photos" ADD CONSTRAINT "_about_v_version_exhibition_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_v" ADD CONSTRAINT "_about_v_version_portfolio_pdf_id_media_id_fk" FOREIGN KEY ("version_portfolio_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_page_gallery" ADD CONSTRAINT "news_page_gallery_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_page_gallery" ADD CONSTRAINT "news_page_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_page_v_version_gallery" ADD CONSTRAINT "_news_page_v_version_gallery_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_page_v_version_gallery" ADD CONSTRAINT "_news_page_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "talks_items" ADD CONSTRAINT "talks_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."talks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "talks" ADD CONSTRAINT "talks_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_talks_v_version_items" ADD CONSTRAINT "_talks_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_talks_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_talks_v" ADD CONSTRAINT "_talks_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "education" ADD CONSTRAINT "education_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_education_v" ADD CONSTRAINT "_education_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_contact_v" ADD CONSTRAINT "_contact_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portraits_needs" ADD CONSTRAINT "portraits_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portraits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portraits" ADD CONSTRAINT "portraits_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "portraits_rels" ADD CONSTRAINT "portraits_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."portraits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portraits_rels" ADD CONSTRAINT "portraits_rels_paintings_fk" FOREIGN KEY ("paintings_id") REFERENCES "public"."paintings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portraits_v_version_needs" ADD CONSTRAINT "_portraits_v_version_needs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portraits_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portraits_v" ADD CONSTRAINT "_portraits_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_portraits_v_rels" ADD CONSTRAINT "_portraits_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_portraits_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portraits_v_rels" ADD CONSTRAINT "_portraits_v_rels_paintings_fk" FOREIGN KEY ("paintings_id") REFERENCES "public"."paintings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social" ADD CONSTRAINT "site_settings_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_legal_links" ADD CONSTRAINT "site_settings_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social" ADD CONSTRAINT "_site_settings_v_version_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_legal_links" ADD CONSTRAINT "_site_settings_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "paintings__order_idx" ON "paintings" USING btree ("_order");
  CREATE INDEX "paintings_image_idx" ON "paintings" USING btree ("image_id");
  CREATE INDEX "paintings_series_idx" ON "paintings" USING btree ("series_id");
  CREATE INDEX "paintings_updated_at_idx" ON "paintings" USING btree ("updated_at");
  CREATE INDEX "paintings_created_at_idx" ON "paintings" USING btree ("created_at");
  CREATE INDEX "series__order_idx" ON "series" USING btree ("_order");
  CREATE UNIQUE INDEX "series_slug_idx" ON "series" USING btree ("slug");
  CREATE INDEX "series_updated_at_idx" ON "series" USING btree ("updated_at");
  CREATE INDEX "series_created_at_idx" ON "series" USING btree ("created_at");
  CREATE INDEX "exhibitions_updated_at_idx" ON "exhibitions" USING btree ("updated_at");
  CREATE INDEX "exhibitions_created_at_idx" ON "exhibitions" USING btree ("created_at");
  CREATE INDEX "news_cover_idx" ON "news" USING btree ("cover_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_cover_idx" ON "_news_v" USING btree ("version_cover_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_paintings_id_idx" ON "payload_locked_documents_rels" USING btree ("paintings_id");
  CREATE INDEX "payload_locked_documents_rels_series_id_idx" ON "payload_locked_documents_rels" USING btree ("series_id");
  CREATE INDEX "payload_locked_documents_rels_exhibitions_id_idx" ON "payload_locked_documents_rels" USING btree ("exhibitions_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_hero_painting_idx" ON "home" USING btree ("hero_painting_id");
  CREATE INDEX "_home_v_version_version_hero_painting_idx" ON "_home_v" USING btree ("version_hero_painting_id");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_portfolio_page_v_created_at_idx" ON "_portfolio_page_v" USING btree ("created_at");
  CREATE INDEX "_portfolio_page_v_updated_at_idx" ON "_portfolio_page_v" USING btree ("updated_at");
  CREATE INDEX "about_exhibition_photos_order_idx" ON "about_exhibition_photos" USING btree ("_order");
  CREATE INDEX "about_exhibition_photos_parent_id_idx" ON "about_exhibition_photos" USING btree ("_parent_id");
  CREATE INDEX "about_exhibition_photos_photo_idx" ON "about_exhibition_photos" USING btree ("photo_id");
  CREATE INDEX "about_portrait_idx" ON "about" USING btree ("portrait_id");
  CREATE INDEX "about_portfolio_pdf_idx" ON "about" USING btree ("portfolio_pdf_id");
  CREATE INDEX "_about_v_version_exhibition_photos_order_idx" ON "_about_v_version_exhibition_photos" USING btree ("_order");
  CREATE INDEX "_about_v_version_exhibition_photos_parent_id_idx" ON "_about_v_version_exhibition_photos" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_exhibition_photos_photo_idx" ON "_about_v_version_exhibition_photos" USING btree ("photo_id");
  CREATE INDEX "_about_v_version_version_portrait_idx" ON "_about_v" USING btree ("version_portrait_id");
  CREATE INDEX "_about_v_version_version_portfolio_pdf_idx" ON "_about_v" USING btree ("version_portfolio_pdf_id");
  CREATE INDEX "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE INDEX "news_page_gallery_order_idx" ON "news_page_gallery" USING btree ("_order");
  CREATE INDEX "news_page_gallery_parent_id_idx" ON "news_page_gallery" USING btree ("_parent_id");
  CREATE INDEX "news_page_gallery_photo_idx" ON "news_page_gallery" USING btree ("photo_id");
  CREATE INDEX "_news_page_v_version_gallery_order_idx" ON "_news_page_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_news_page_v_version_gallery_parent_id_idx" ON "_news_page_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_news_page_v_version_gallery_photo_idx" ON "_news_page_v_version_gallery" USING btree ("photo_id");
  CREATE INDEX "_news_page_v_created_at_idx" ON "_news_page_v" USING btree ("created_at");
  CREATE INDEX "_news_page_v_updated_at_idx" ON "_news_page_v" USING btree ("updated_at");
  CREATE INDEX "talks_items_order_idx" ON "talks_items" USING btree ("_order");
  CREATE INDEX "talks_items_parent_id_idx" ON "talks_items" USING btree ("_parent_id");
  CREATE INDEX "talks_photo_idx" ON "talks" USING btree ("photo_id");
  CREATE INDEX "_talks_v_version_items_order_idx" ON "_talks_v_version_items" USING btree ("_order");
  CREATE INDEX "_talks_v_version_items_parent_id_idx" ON "_talks_v_version_items" USING btree ("_parent_id");
  CREATE INDEX "_talks_v_version_version_photo_idx" ON "_talks_v" USING btree ("version_photo_id");
  CREATE INDEX "_talks_v_created_at_idx" ON "_talks_v" USING btree ("created_at");
  CREATE INDEX "_talks_v_updated_at_idx" ON "_talks_v" USING btree ("updated_at");
  CREATE INDEX "education_photo_idx" ON "education" USING btree ("photo_id");
  CREATE INDEX "_education_v_version_version_photo_idx" ON "_education_v" USING btree ("version_photo_id");
  CREATE INDEX "_education_v_created_at_idx" ON "_education_v" USING btree ("created_at");
  CREATE INDEX "_education_v_updated_at_idx" ON "_education_v" USING btree ("updated_at");
  CREATE INDEX "contact_photo_idx" ON "contact" USING btree ("photo_id");
  CREATE INDEX "_contact_v_version_version_photo_idx" ON "_contact_v" USING btree ("version_photo_id");
  CREATE INDEX "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE INDEX "portraits_needs_order_idx" ON "portraits_needs" USING btree ("_order");
  CREATE INDEX "portraits_needs_parent_id_idx" ON "portraits_needs" USING btree ("_parent_id");
  CREATE INDEX "portraits_photo_idx" ON "portraits" USING btree ("photo_id");
  CREATE INDEX "portraits_rels_order_idx" ON "portraits_rels" USING btree ("order");
  CREATE INDEX "portraits_rels_parent_idx" ON "portraits_rels" USING btree ("parent_id");
  CREATE INDEX "portraits_rels_path_idx" ON "portraits_rels" USING btree ("path");
  CREATE INDEX "portraits_rels_paintings_id_idx" ON "portraits_rels" USING btree ("paintings_id");
  CREATE INDEX "_portraits_v_version_needs_order_idx" ON "_portraits_v_version_needs" USING btree ("_order");
  CREATE INDEX "_portraits_v_version_needs_parent_id_idx" ON "_portraits_v_version_needs" USING btree ("_parent_id");
  CREATE INDEX "_portraits_v_version_version_photo_idx" ON "_portraits_v" USING btree ("version_photo_id");
  CREATE INDEX "_portraits_v_created_at_idx" ON "_portraits_v" USING btree ("created_at");
  CREATE INDEX "_portraits_v_updated_at_idx" ON "_portraits_v" USING btree ("updated_at");
  CREATE INDEX "_portraits_v_rels_order_idx" ON "_portraits_v_rels" USING btree ("order");
  CREATE INDEX "_portraits_v_rels_parent_idx" ON "_portraits_v_rels" USING btree ("parent_id");
  CREATE INDEX "_portraits_v_rels_path_idx" ON "_portraits_v_rels" USING btree ("path");
  CREATE INDEX "_portraits_v_rels_paintings_id_idx" ON "_portraits_v_rels" USING btree ("paintings_id");
  CREATE INDEX "site_settings_social_order_idx" ON "site_settings_social" USING btree ("_order");
  CREATE INDEX "site_settings_social_parent_id_idx" ON "site_settings_social" USING btree ("_parent_id");
  CREATE INDEX "site_settings_legal_links_order_idx" ON "site_settings_legal_links" USING btree ("_order");
  CREATE INDEX "site_settings_legal_links_parent_id_idx" ON "site_settings_legal_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "_site_settings_v_version_social_order_idx" ON "_site_settings_v_version_social" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_parent_id_idx" ON "_site_settings_v_version_social" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_legal_links_order_idx" ON "_site_settings_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_legal_links_parent_id_idx" ON "_site_settings_v_version_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_logo_idx" ON "_site_settings_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "paintings" CASCADE;
  DROP TABLE "series" CASCADE;
  DROP TABLE "exhibitions" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "portfolio_page" CASCADE;
  DROP TABLE "_portfolio_page_v" CASCADE;
  DROP TABLE "about_exhibition_photos" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "_about_v_version_exhibition_photos" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TABLE "news_page_gallery" CASCADE;
  DROP TABLE "news_page" CASCADE;
  DROP TABLE "_news_page_v_version_gallery" CASCADE;
  DROP TABLE "_news_page_v" CASCADE;
  DROP TABLE "talks_items" CASCADE;
  DROP TABLE "talks" CASCADE;
  DROP TABLE "_talks_v_version_items" CASCADE;
  DROP TABLE "_talks_v" CASCADE;
  DROP TABLE "education" CASCADE;
  DROP TABLE "_education_v" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "portraits_needs" CASCADE;
  DROP TABLE "portraits" CASCADE;
  DROP TABLE "portraits_rels" CASCADE;
  DROP TABLE "_portraits_v_version_needs" CASCADE;
  DROP TABLE "_portraits_v" CASCADE;
  DROP TABLE "_portraits_v_rels" CASCADE;
  DROP TABLE "site_settings_social" CASCADE;
  DROP TABLE "site_settings_legal_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "_site_settings_v_version_social" CASCADE;
  DROP TABLE "_site_settings_v_version_legal_links" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TYPE "public"."enum_paintings_status";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_media_kind";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_site_settings_social_label";
  DROP TYPE "public"."enum__site_settings_v_version_social_label";`)
}
