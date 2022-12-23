import './App.css'
import StartScreen from './components/StartScreen'
import { useCallback, useEffect, useState } from 'react'
import { wordsList } from './data/words'
import Game from './components/Game'
import GameOver from './components/GameOver'

// estágios/telas do jogo
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

const guessesQtd = 3;

function App() {
  // gameStage comoça com o valor start
  const [gameStage, setGameStage] = useState(stages[0].name);

  // colocando o objeto de palavras dentro da variavel words
  const [words] = useState(wordsList);

  // palavraSelecionada
  const [pickedWord, setPickedWord] = useState('');

  //  categoriaSelecionada
  const [pickedCategory, setPickedCategory] = useState('');

        //letras
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

  // pavra e categoria selecionadas
  const pickWordAndCategory = () => {
    // armazena as categorias do abjeto de palavras 'words'
    const categories = Object.keys(words);

    // armazena somente uma categoria de forma randomica na variavel 'category'
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // armazena na variavel 'word', uma palavra da categoria escolhida
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }

  // função de start do game
  const startGame = () => {
    clearLetterStates()
    
    // pick word and pick category
    const {word, category} = pickWordAndCategory();

    // cria um array de letras separadas
    let wordLatters = word.split("");
    wordLatters = wordLatters.map((l) => l.toLowerCase());

    // setando os estados
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLatters);

    // seta o valor 'start' na variavel gameStage
    setGameStage(stages[1].name)
  }

  // processa as letras do inputs
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    // checando se a letra já foi utilizada de alguma maneira
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      // diminuindo as chances de tentativas
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // função que limpa os states
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // monitorando o guesses(tentativas)
  useEffect(() => {
    // quando as tentativas forem igual ou menos que 0, muda de página
    if(guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name);
    }

  }, [guesses])


  // checando condição de vitoria
  useEffect(() => {
    // transformando o array de letras em array de letras unicas
    const uniqueLetters = [... new Set(letters)]

    // condição de vitoria
    if(guessedLetters.length === uniqueLetters.length) {
      // add score
      setScore(score + 100)
      // restartar o game com uma nova palavra
      startGame();
    }

  }, [guessedLetters])


  // joga o usuario pra pagina inicial do game
  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setGameStage(stages[0].name)
  }


  return (
    <div className="app">
      {/* Se gameStage for igual a start, é chamado o componente StartScreen */}
                                {/* Passa o valor de startGame como prop */}
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {/* Se gameStage for igual a game, é chamado o componente Game */}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory} 
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          />)}
      {/* Se gameStage for igual a end, é chamado o componente GameOver */}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  )
}

export default App
