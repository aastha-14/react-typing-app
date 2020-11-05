import faker from 'faker';

export const words = (count = 10) => {
    return new Array(count).fill().map(index => faker.random.word()).join(' ');
};
