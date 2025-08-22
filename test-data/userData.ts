import { faker } from "@faker-js/faker";

type person = {
	username: string;
	password: string;
};

export const newPerson: person = {
	username: faker.internet.username(),
	password: faker.internet.password({
		length: 16,
		pattern: /[A-Za-z0-9!@#$%&*()-+]/,
	}),
};
