import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { faker } from '@faker-js/faker';
import type { Role } from '@prisma/client';

export function randomUrl(): string {
	return Math.random().toString(16).slice(2);
}

// function getRandomTimes() {
// 	// get start time somewhere from the afternoon to close to midnight
// 	const startTime = 16 + Math.floor(Math.random() * 7);
// 	// get end time somewhere between 1 and 5 hours after start time
// 	const endTime = startTime + 1 + Math.floor(Math.random() * 5);
// 	return { startTime, endTime };
// }

// generate random date starting from today to three weeks in the future
export function randomDate(): Date {
	const today = new Date();
	const threeWeeks = 21 * 24 * 60 * 60 * 1000;
	const randomDate = new Date(today.getTime() + Math.random() * threeWeeks);

	// one in 14 chance that it returns today

	return randomDate;
}

export function seedUsers() {
	const users: Prisma.UserCreateInput[] = [
		{
			email: faker.internet.email(),
			password: faker.internet.password(),
			name: faker.name.firstName(),
			role: 'USER' as Role,
			createdJams: {
				create: [
					{
						title: 'Sounds Good Sessions',
						date: randomDate(),
						location: 'Bar Moun',
						startTime: '12:00',
						endTime: '14:00',
						openingBand: 'The Band',
						type: 'Type 1',
						description: faker.lorem.paragraph(),
						image: randomUrl()
					},
					{
						title: 'Walter Invites...',
						date: new Date(),
						location: 'Bar Munt',
						startTime: '20:00',
						endTime: '02:00',
						openingBand: 'GHS Trio',
						type: 'Type 1',
						description: faker.lorem.paragraph(),
						image: randomUrl()
					}
				]
			}
		},
		{
			email: faker.internet.email(),
			password: faker.internet.password(),
			name: faker.name.firstName(),
			role: 'ADMIN' as Role
		},
		{
			email: faker.internet.email(),
			password: faker.internet.password(),
			name: faker.name.firstName(),
			role: 'ORGANIZER' as Role
		}
	];
	return users;
}

// Generate a random set of jam sessions
export function seedJamSessions() {
	const amount = 20;
	const jams: Prisma.JamSessionCreateInput[] = [];

	for (let index = 0; index < amount; index++) {
		const title = 'Jam Session ' + index;
		const startTime = 16 + Math.floor(Math.random() * 7);
		const endTime = (startTime + 1 + (Math.floor(Math.random() * 5))) % 24;

		// get an event picture from unsplash
		const image = 'https://source.unsplash.com/1600x900/?music'

		const jam: Prisma.JamSessionCreateInput = {
			title: title,
			date: randomDate(),
			location: 'Bar ' + faker.address.cityName(),
			startTime: `${startTime}:00`,
			endTime: `${endTime}:00`,
			openingBand: faker.name.fullName(),
			type: faker.music.genre(),
			description: faker.lorem.paragraph(),
			image: image,
			organizer: {
				connect: {
					id: 1
				}
			}
		};
		jams.push(jam);
	}
	return jams;
}

async function main() {
	// ... you will write your Prisma Client queries here
	console.log('Start seeding ...');
	// seed the database
	const users = seedUsers();
	console.log(users);
	const jams = seedJamSessions();

	for (const user of users) {
		await prisma.user.create({
			data: user
		});
	}

	for (const jam in jams) {
		await prisma.jamSession.create({
			data: jams[jam]
		});
	}

	console.log('Seeding finished.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
