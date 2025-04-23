const {shuffleArray,
    shuffleCircles,
    mapCharacters,
    // still working breaking down the other functions into smaller tasks =
} = require('./gameController');

test('shuffles array in place', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const newArr = shuffleArray([...arr]);
    expect(newArr.length).toEqual(9);
    expect(newArr).not.toEqual(arr);
  });

test('creates 3 subarrays from input array',()=>{
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    newArrs = shuffleCircles(arr)
    expect(newArrs.length).toEqual(3);
})

test('maps character array to name and preferences',() =>{
    const dict = [ //this is from our DB, but its hardcoded here for testing
         {CharacterName: 'Lili',
          compliment: 2,
          help: -1,
          invite: 0},
        
        
          {CharacterName: 'Max',
          compliment: 0,
          help: 1,
          invite: 2}
        ];
        
      const newDict= [
        {name: 'Lili',
          preferences: {
            compliment: 2,
            help: -1,
            invite: 0}},
        {name: 'Max',
          preferences: {
            compliment: 0,
            help: 1,
            invite: 2}}
       ];
  
      expect(mapCharacters(dict)).toEqual(newDict);
    });


