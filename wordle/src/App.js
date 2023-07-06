import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [guessWord, setGuessWord] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [chance, setChance] = useState(0);
  const [letter, setLetter] = useState("");

  const [style, setStyle] = useState({
    iscorrectPos: false,
    iscorrectLetter: false,
    isincorrectLetter: false,
  });

  const correctWord = "STORM";

  const handleMatchLetters = () => {
    if (correctWord.includes(letter)) {
      if (correctWord.indexOf(letter) === guessWord.indexOf(letter)) {
        setStyle({...style, iscorrectPos: true})
      } else {
        setStyle({...style, iscorrectLetter: true})
      }
    } else {
      setStyle({...style, isincorrectLetter: true})
    }
  };

  const handleAddLetter = (letter) => {
    // alert([...guessWord],letter)
    let word = guessWord != "" ? [...guessWord].join("") : "";

    if (word.length <= 5) {
      setLetter(letter);
      word += letter;
      setGuessWord(word);
    }
    if (word.length === 5) {
      setGuessWord("");
      setChance(chance + 1);
      let arr1 = [...guessList];
      arr1.push(word);
      setGuessList([...arr1]);
    }
  };

  useEffect(() => {
    if(letter!="")handleMatchLetters()}, [letter]);

  return (
    <div className="App">
      <>
        <header>
          <h1>Wordle</h1>
        </header>
        <section className="word-guess-container">
          {[0, 1, 2, 3, 4, 5].map((wordIndex) => {
            return (
              <div className="word-guess-row flex">
                {[0, 1, 2, 3, 4].map((i) => {
                  return (
                    <div
                      className={`letter-tile ${
                        chance === wordIndex && style.iscorrectPos
                          ? "correctPosStyle"
                          : style.iscorrectLetter
                          ? "correctLetterStyle"
                          : style.isincorrectLetter
                          ? "incorrectLetterStyle"
                          : ""
                      }`}
                    >
                      {chance === wordIndex
                        ? guessWord[i]
                        : guessList[wordIndex]
                        ? guessList[wordIndex][i]
                        : ""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      </>
      <section className="keyboard">
        <div className="keyboard-row flex">
          {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => {
            return (
              <div
                className="letter-tile keyboard-tile"
                onClick={() => handleAddLetter(letter)}
              >
                {letter}
              </div>
            );
          })}
        </div>
        <div className="keyboard-row flex">
          {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => {
            return (
              <div
                className="letter-tile keyboard-tile"
                onClick={() => handleAddLetter(letter)}
              >
                {letter}
              </div>
            );
          })}
        </div>
        <div className="keyboard-row flex">
          {["Enter", "Z", "X", "C", "V", "B", "N", "M", "Clear"].map(
            (letter) => {
              return (
                <div
                  className="letter-tile keyboard-tile"
                  onClick={() => handleAddLetter(letter)}
                >
                  {letter}
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
