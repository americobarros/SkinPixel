import cat1 from './images/cat1.PNG';
import cat2 from './images/cat2.JPG';
import cat3 from './images/cat3.JPG';

const hannah = {
    id: 1,
    name: 'Hannah Brooks',
    username: 'hannahbrooks',
};

const someoneElse = {
    id: 2,
    name: 'Someone Else',
    username: 'user1',
};

const hannahsSkins = [
    {
        id: 1,
        createdAt: 0,
        image: cat1,
        name: 'The best cat ever',
        user: hannah,
        // comments: [
        //     {
        //         createdAt: 0,
        //         user: someoneElse,
        //         text: 'wow cool cat!'
        //     },
        //     {
        //         createdAt: 1,
        //         user: someoneElse,
        //         text: 'i hope that cat is okay'
        //     }
        // ]
    },
    {
        id: 2,
        createdAt: 2,
        image: cat2,
        name: 'Another cool cat',
        user: hannah,
        // comments: [
        //     {
        //         createdAt: 0,
        //         user: someoneElse,
        //         text: 'Look at that cat go!'
        //     },
        //     {
        //         createdAt: 1,
        //         user: someoneElse,
        //         text: 'Wow it looks like that cat could use a pet!'
        //     }
        // ]
    }
];

const theirSkins = [
    {
        id: 3,
        createdAt: 4,
        image: cat3,
        name: 'This is my cat',
        user: someoneElse,
        // comments: [
        //     {
        //         createdAt: 0,
        //         user: hannah,
        //         text: 'OMG i love your cat'
        //     }
        // ]
    }
];



export const allSkins = theirSkins.concat(hannahsSkins);