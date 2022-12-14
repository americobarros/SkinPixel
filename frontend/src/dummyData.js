import cat1 from './images/cat1.PNG';
import cat2 from './images/cat2.JPG';
import cat3 from './images/cat3.JPG';
import cat4 from './images/cat4.PNG';
import cat5 from './images/cat5.PNG';
import map1 from './zippedMaps/map1.zip';
import map2 from './zippedMaps/map2.zip';
import imgMap1 from './images/map1.jpg';
import imgMap2 from './images/map2.jpg';
import texture1 from './images/texture1.jpeg';
import zippedTexture from './zippedTextures/text.zip';

// users

const hannah = {
    id: 1,
    createdAt: 0,
    name: 'Hannah Brooks',
    username: 'hannahbrooks',
    email: 'hannah@user.com',
    password: 'password',
    isAdmin: true,
    bio: "mining by day, making skins by night:)"
};

const ian = {
    id: 2,
    createdAt: 0,
    name: 'Ian Chan',
    username: 'yanktc',
    email: 'yan@user.com',
    password: 'password',
    isAdmin: false,
    bio: "crafty"
};

const someoneElse = {
    id: 3,
    createdAt: 0,
    name: 'Someone Else',
    username: 'someone',
    email: 'someone@user.com',
    password: 'password',
    isAdmin: false,
    bio: ""
};

// maps

const maps = [
    {
        id: 1,
        user: hannah,
        createdAt: 0,
        name: "Super cool Map",
        file: map1,
        image: imgMap1,
        comments: []
    },
    {   id: 2,
        user: someoneElse,
        createdAt: 0,
        name: "Empire map",
        file: map2,
        image: imgMap2,
        comments: []
    },
]

// skins
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
    },
    {
        id: 4,
        createdAt: 5,
        image: cat4,
        name: 'Miss Meow Meow',
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
                text: 'wow this is awesome!'
            }
        ]
    },
    {
        id: 5,
        createdAt: 6,
        image: cat5,
        name: 'This puthy talk',
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
                text: 'she talk english spanish and french!'
            }
        ]
    }
];

// resources
const iansResourcePacks = [ 
    {
        id: 3,
        createdAt: 7,
        image: texture1,
        name: 'Cool Texture',
        user: ian,
        file: zippedTexture,
        comments: [
            {
                createdAt: 0,
                user: hannah,
                text: 'wow this is awesome!'
            },
            {
                createdAt: 0,
                user: ian,
                text: 'its crafty isn\' t it'
            }
        ]
    }
];

export const allMaps = maps;
export const allSkins = theirSkins.concat(hannahsSkins);
export const allUsers = [hannah, someoneElse, ian];
export const allResourcePacks = iansResourcePacks;
