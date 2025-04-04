const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('game'); 
});

// need to add get functions for the leader board and char desc pages

//INCOMPLETE - just using these variables until DB stuff is sorted out...
const characters = [
    { name: "Lili", preferences: { help: -1, invite: 0, compliment: 2 } },
    { name: "Jake", preferences: { help: 1, invite: -2, compliment: 0 } },
    { name: "Sasha", preferences: { help: 0, invite: 2, compliment: -1 } },
    { name: "Alex", preferences: { help: 2, invite: 1, compliment: -2 } },
    { name: "Maria", preferences: { help: -2, invite: 1, compliment: 2 } },
    { name: "Chris", preferences: { help: 1, invite: -1, compliment: 0 } },
    { name: "Jordan", preferences: { help: 0, invite: 2, compliment: 1 } },
    { name: "Sam", preferences: { help: 2, invite: -1, compliment: 0 } },
    { name: "Taylor", preferences: { help: -1, invite: 2, compliment: 1 } }
];

function shuffleCircles() {
    let shuffled = [...characters].sort(() => 0.5 - Math.random());
    return [
        shuffled.slice(0, 3),
        shuffled.slice(3, 6),
        shuffled.slice(6, 9)
    ];
}


module.exports = router;
