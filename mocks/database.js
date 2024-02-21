import { factory, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const database = factory({
  userBook: {
    title: primaryKey(() => faker.word.adjective()),
    date: () => faker.date.anytime(),
  },
});

database.userBook.create({
  title: "Libro 1",
  date: "2024-01-05T20:00:36.735Z",
});

database.userBook.create({
  title: "Libro 2",
  date: "2024-02-05T20:00:36.735Z",
});

database.userBook.create({
  title: "Libro 3",
  date: "2024-03-05T20:00:36.735Z",
});
