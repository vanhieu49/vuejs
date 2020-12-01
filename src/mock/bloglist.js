var faker = require('faker');

let listBlogs = [];

// faker.locale = 'vi'

for (let index = 0; index < 10; index++) {
    let data = {
        id: Math.round(Math.random() * 999999),
        title: faker.lorem.sentence(10),
        abstract: faker.lorem.paragraph(2),
        fullName: faker.name.firstName() + " " + faker.name.lastName(),
        create_at: faker.date.past(),
    }
    listBlogs.push(data)
}

export default listBlogs;