import React, { useRef, useState } from 'react'
import './Game.css'

const Game = ({
    verifyLetter, 
    pickedWord, 
    pickedCategory, 
    letters, 
    guessedLetters, 
    wrongLetters, 
    guesses, 
    score,
  }) => {

    const [letter, setLetter] = useState('');
    // variavel usada para dar foco automatico na caixinha de entrada de letras
    const letterInputRef = useRef()

    const handleSubmit = (e) => {
      e.preventDefault();
      verifyLetter(letter)
      //limpar o campo
      setLetter('');
      // chamando a referencia do Ref e dando um focus
      letterInputRef.current.focus();
    }
  return (
    <div className='game'>
        <p className='points'> <span>Pontuação: {score}</span></p>
        <h1>Adivinhe a palavra: </h1>
        <h3 className='tip'>
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas</p>
        <div className="word-container">
          {letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
              <span key={i} className='letter'>{letter}</span>
            ) : (
              <span key={i} className='blank-square'></span>
            )
          ))}
        </div>
        <div className="letter-container">
          <p>Tente adivinhar uma letra da palavra</p>
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name='letter' 
            maxLength={1} 
            required
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            //atributo usado para dar foco automatico na caixa de entrada de letras
            ref={letterInputRef}
            />
            <button>Jogar</button>
          </form>
        </div>
        <div className="wrong-letters-container">
          <p>Letras já utilizadas: </p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
        </div>
    </div>
  )
}
export default Game