/* eslint-disable */
import { createConnection } from "typeorm";

const seed = async () => {
  console.log("Going to seed DB");

  const connection = await createConnection(require("../ormconfig"));

  // await connection.query(`
  //   INSERT INTO public."user" (username, password, bio, github) VALUES ('conduit', 'secret', 'I am cooler', 'https://github.com/PranjalAgni');
  //   INSERT INTO public."user" (username, password, bio, github) VALUES ('pokemon', 'power', 'I am hotter', 'https://github.com/Pokemon');
  //   INSERT INTO public."user" (username, password, bio, github) VALUES ('shaktiman', 'ghoomna', 'I am faster', 'https://github.com/Shaktiman');
  // `);

  // await connection.query(`
  //   INSERT INTO public."image" (url) VALUES ('https://pixabay.com/get/g687d478de40da6c427daf983eb7cf8c46f010e2f8fcaca9bbdcaa8b0db2ad13d7d9fa11a259c18326b278647ab4a6c9ee3003f129b761b183181d11c06680181_640.jpg');
  //   INSERT INTO public."image" (url) VALUES ('https://pixabay.com/get/g58a278919a12c30f13ae054b4bc6d3508838df537463845d81a7b74f1bded72e96cd762a498d643cf753670906a94d60_640.jpg');
  //   INSERT INTO public."image" (url) VALUES ('https://pixabay.com/get/gb1aa16fab90ad9a57b7f6bac79e97178308fe049bb61141d5d8decebfa27f1645a720256c90d30b71cb4a9de4b03cc953e834e3f3135b1f4b582ab1951709c25_640.jpg');
  // `);

  // await connection.query(`
  //       INSERT INTO public."project" (title, tagline, description, website, github, youtube) VALUES ('First', 'Cool Project', 'Really Awesome', 'https://cool.project', 'https://github.com/cool-project', 'https://youtube.com/skskksks');
  //       INSERT INTO public."project" (title, tagline, description, website, github, youtube) VALUES ('First', 'Cool Project', 'Really Awesome 2', 'https://cool1.project', 'https://github.com/cool-project1', 'https://youtube.com/rundown');
  //       INSERT INTO public."project" (title, tagline, description, website, github, youtube) VALUES ('First', 'Cool Project', 'Really Awesome 3', 'https://cool2.project', 'https://github.com/cool-project2', 'https://youtube.com/delhi');
  //       INSERT INTO public."project" (title, tagline, description, website, github, youtube) VALUES ('First', 'Cool Project', 'Really Awesome 4', 'https://cool3.project', 'https://github.com/cool-project3', 'https://youtube.com/pune');
  //       INSERT INTO public."project" (title, tagline, description, website, github, youtube) VALUES ('First', 'Cool Project', 'Really Awesome 5', 'https://cool4.project', 'https://github.com/cool-project4', 'https://youtube.com/fitness');
  // `);

  // await connection.query(`
  //       INSERT INTO public."hash_tag" (tag) VALUES ('Javascript');
  //       INSERT INTO public."hash_tag" (tag) VALUES ('NodeJS');
  //       INSERT INTO public."hash_tag" (tag) VALUES ('React');
  //       INSERT INTO public."hash_tag" (tag) VALUES ('Websocket');
  //       INSERT INTO public."hash_tag" (tag) VALUES ('Typeorm');
  //       INSERT INTO public."hash_tag" (tag) VALUES ('Typescript');
  // `);
};

seed().finally(process.exit());
