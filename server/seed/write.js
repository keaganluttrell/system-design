const fs = require('fs');
const path = require('path');
const faker = require('faker');

const getrandom = () => {
  const arr = [];
  const random = Math.random() * 5;
  while (arr.length < random) {
    arr.push(faker.random.word());
  }
  return arr;
};

const getImgUrl = () => {
  const random = Math.floor(Math.random() * 1000);
  return `https://sdc-croxy.s3.us-east-2.amazonaws.com/pics/${random}.jpg`;
};

const getOptions = () => {
  const arr = [];
  const random = Math.floor(Math.random() * 4) + 1;
  while (arr.length < random) {
    arr.push(faker.commerce.color());
  }
  return arr;
};

const getSelectors = () => {
  const arr = [];
  const random = Math.floor(Math.random() * 3) + 1;
  while (arr.length < random) {
    arr.push({ name: faker.commerce.productMaterial(), options: getOptions() });
  }
  return arr;
};

const file = fs.createWriteStream(path.resolve(__dirname, './output.txt'));

file.on('error', (err) => console.log(err));

for (let i = 1; i < 1001; i += 1) {
  const obj = {
    rating: {
      name: faker.commerce.productName(),
      sales: Math.floor(Math.random() * 1000),
      stars: +((Math.random() * 4) + 1).toFixed(2),
    },
    info: {
      tags: getrandom(),
      price: Math.floor(Math.random() * 10000) + 99,
      availability: (Math.random() * 10) > 3,
    },
    selectors: getSelectors(),
    extDetails: {
      description: faker.commerce.productDescription(),
    },
    shipping: {
      origin: {
        latitude: faker.address.latitude(29, 49),
        longitude: faker.address.longitude(-117, -75),
      },
      exchanges: (Math.random() * 10) < 7,
    },
    shopPolicy: {
      lastUpdated: faker.date.past(),
      returns: (Math.random() * 10) > 7,
      noReturnTypes: ['Custom or personalized orders', 'Items on sale'],
    },
    seller: {
      name: faker.fake('{{name.firstName}} {{name.lastName}}'),
      role: faker.name.jobTitle(),
      imageURL: getImgUrl(),
    },
  };
  file.write(`${JSON.stringify(obj)}\r\n`);
}

file.end();
