import cat1 from './images/cat1.PNG';
import cat2 from './images/cat2.JPG';
import cat3 from './images/cat3.JPG';

const hannah = {
    id: 1,
    name: 'Hannah Brooks',
    username: 'hannahbrooks',
    email: 'hannah@user.com',
    password: 'password',
    isAdmin: true,
    bio: "mining by day, making skins by night:)"
};

const someoneElse = {
    id: 2,
    name: 'Someone Else',
    username: 'someone',
    email: 'someone@user.com',
    password: 'password',
    isAdmin: false,
    bio: ""
};

const hannahsSkins = [
    {
        id: 1,
        createdAt: 0,
        image: cat1,
        name: 'The best cat ever',
        skin2D: [["#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff"],
                ["#fff", "ffff", "#fff", "ffff"]],
        user: hannah,
        comments: [
            {
                createdAt: 0,
                user: someoneElse,
                text: 'wow cool cat!'
            },
            {
                createdAt: 1,
                user: someoneElse,
                text: 'i hope that cat is okay'
            }
        ]
    },
    {
        id: 2,
        createdAt: 2,
        image: cat2,
        name: 'Another cool cat',
        skin2D: [["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"]],
        user: hannah,
        comments: [
            {
                createdAt: 0,
                user: someoneElse,
                text: 'Look at that cat go!'
            },
            {
                createdAt: 1,
                user: someoneElse,
                text: 'Wow it looks like that cat could use a pet!'
            }
        ]
    }
];

const theirSkins = [
    {
        id: 3,
        createdAt: 4,
        image: cat3,
        name: 'This is my cat',
        skin2D: [["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff", "#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"],
            ["#fff", "ffff", "#fff", "ffff"]],
        user: someoneElse,
        comments: [
            {
                createdAt: 0,
                user: hannah,
                text: 'OMG i love your cat'
            }
        ]
    }
];



export const allSkins = theirSkins.concat(hannahsSkins);
export const allUsers = [hannah, someoneElse];
export const currUserX = hannah;