import { faker } from '@faker-js/faker';

export const generateTestJams = () => {
    const currentDate = new Date();
    const testJams = [];

    // Generate one or two jams with the current date
    for (let i = 0; i < 2; i++) {
        const testJam = {
            uuid: faker.datatype.uuid(),
            date: currentDate,
            title: `${faker.address.city()} Jam`,
            startTime: currentDate.toTimeString().split(' ')[0],
            endTime: currentDate.toTimeString().split(' ')[0],
            location: faker.address.city(),
            openingBand: faker.name.fullName(),
            organiser: faker.name.fullName(),
            image: faker.image.imageUrl()
        };

        testJams.push(testJam);
    }

    // Generate 3-5 jams in the coming two weeks
    for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(currentDate.getDate() + 14);

        const testJam = {
            uuid: faker.datatype.uuid(),
            date: twoWeeksLater,
            title: `${faker.address.city()} Jam`,
            startTime: twoWeeksLater.toTimeString().split(' ')[0],
            endTime: twoWeeksLater.toTimeString().split(' ')[0],
            location: faker.address.city(),
            openingBand: faker.name.fullName(),
            organiser: faker.name.fullName(),
            image: faker.image.imageUrl()
        };

        testJams.push(testJam);
    }

    // Generate 2 jams that have already happened
    for (let i = 0; i < 2; i++) {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(currentDate.getDate() - 14);

        const testJam = {
            uuid: faker.datatype.uuid(),
            date: twoWeeksAgo,
            title: `${faker.address.city()} Jam`,
            startTime: twoWeeksAgo.toTimeString().split(' ')[0],
            endTime: twoWeeksAgo.toTimeString().split(' ')[0],
            location: faker.address.city(),
            openingBand: faker.name.fullName(),
            organiser: faker.name.fullName(),
            image: faker.image.imageUrl()
        };

        testJams.push(testJam);
    }
    return testJams;
}
