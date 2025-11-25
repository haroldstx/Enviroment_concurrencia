CREATE TABLE "User" (
  "id_user" integer PRIMARY KEY,
  "user_name" string,
  "password" char(10),
  "email" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "url_image" varchar,
  "phone" varchar(10)
);

CREATE TABLE "Rol" (
  "id_rol" INT PRIMARY KEY,
  "title" VARCHAR,
  "created_at" TIMESTAMP
);

CREATE TABLE "User_Rol" (
  "id_user" INT,
  "id_rol" INT,
  "PRIMARY" "KEY(id_user,id_rol)"
);

CREATE TABLE "Privilege" (
  "id_privilege" INT PRIMARY KEY,
  "name" VARCHAR(100),
  "description" TEXT,
  "created_at" TIMESTAMP
);

CREATE TABLE "Space" (
  "id_space" integer PRIMARY KEY,
  "space_name" varchar(50),
  "id_owner" integer,
  "created_at" timestamp
);

CREATE TABLE "Channel" (
  "id_channel" integer PRIMARY KEY,
  "id_space" integer,
  "name" varchar[50],
  "is_private" bool
);

CREATE TABLE "Private_Channel" (
  "id_pchannel" integer PRIMARY KEY,
  "id_channel" integer,
  "id_user" integer
);

CREATE TABLE "Message" (
  "id_message" integer PRIMARY KEY,
  "id_channel" integer,
  "id_user" integer,
  "id_file" integer,
  "message" varchar[200],
  "created_at" timestamp
);

CREATE TABLE "Archive" (
  "id_archive" integer PRIMARY KEY,
  "content_path" varchar,
  "mime_type" varchar(50),
  "name_file" varchar(200),
  "size_bytes" int
);

CREATE TABLE "Notification" (
  "id_notification" integer PRIMARY KEY,
  "id_user" integer,
  "content" varchar[200],
  "read" bool,
  "crated_at" timestamp
);

CREATE TABLE "Privilege_Rol" (
  "id_rol" INT,
  "id_privilege" INT,
  "PRIMARY" "KEY(id_rol,id_privilege)"
);

ALTER TABLE "Archive" ADD FOREIGN KEY ("id_archive") REFERENCES "Message" ("id_file");

ALTER TABLE "Message" ADD FOREIGN KEY ("id_channel") REFERENCES "Channel" ("id_channel");

ALTER TABLE "Message" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id_user");

ALTER TABLE "Space" ADD FOREIGN KEY ("id_owner") REFERENCES "User" ("id_user");

ALTER TABLE "Channel" ADD FOREIGN KEY ("id_space") REFERENCES "Space" ("id_space");

ALTER TABLE "Private_Channel" ADD FOREIGN KEY ("id_channel") REFERENCES "Channel" ("id_channel");

ALTER TABLE "Notification" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id_user");

ALTER TABLE "Private_Channel" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id_user");

ALTER TABLE "User_Rol" ADD FOREIGN KEY ("id_user") REFERENCES "User" ("id_user");

ALTER TABLE "Rol" ADD FOREIGN KEY ("id_rol") REFERENCES "User_Rol" ("id_rol");

ALTER TABLE "Privilege_Rol" ADD FOREIGN KEY ("id_rol") REFERENCES "Rol" ("id_rol");

ALTER TABLE "Privilege" ADD FOREIGN KEY ("id_privilege") REFERENCES "Privilege_Rol" ("id_privilege");
