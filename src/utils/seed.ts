import { getConnection } from "typeorm";

export const seed = async () => {
  const connection = await getConnection();

  await connection.query(`
    INSERT INTO public."user" (username, password, bio, github) VALUES ('conduit', 'secret', 'I am cooler', 'https://github.com/PranjalAgni');
    INSERT INTO public."user" (username, password, bio, github) VALUES ('pokemon', 'power', 'I am hotter', 'https://github.com/Pokemon');
    INSERT INTO public."user" (username, password, bio, github) VALUES ('shaktiman', 'ghoomna', 'I am faster', 'https://github.com/Shaktiman');
  `);

  console.log("db has been successfully seeded");
};
