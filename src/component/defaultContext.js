import Character from '../model/Character'

const defaultContext = {
  data: [
    new Character('1', 'hulk', 'all green', null),
    new Character('2', 'A-Bomb (HAS)', "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate!", 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg'),
    new Character('3', 'Antman', 'so small', null),
    new Character('4', 'Spiderman', 'can climb walls', null),
  ],
  selectedData: [
    new Character('1', 'hulk', 'all green', null),

  ],
}


export default defaultContext