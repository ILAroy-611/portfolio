import { useEffect, useState } from "react";
import "./App.css";

// const initialState = {
//   iscorrectPos: false,
//   iscorrectLetter: false,
//   isincorrectLetter: false,
// };

function App() {
  const [guess, setGuess] = useState([]);
  const [guessList, setGuessList] = useState([]);
  const [chance, setChance] = useState(0);
  const [letter, setLetter] = useState("");

  const correctWord = "STORM";

  const handleMatchLetters = (newGuess) => {
    let ind = newGuess.length - 1;
    let letterObj = newGuess[ind];
    if (correctWord.includes(letterObj.letter)) {
      if (correctWord[ind] === letterObj.letter) {
        newGuess[ind] = { ...letterObj, correctPos: true };
      } else {
        newGuess[ind] = { ...letterObj, includedOnly: true };
      }
    } else {
      newGuess[ind] = { ...letterObj, notIncluded: true };
    }
    return newGuess;
  };

  const handleAddLetter = (letter) => {
    let newGuess = guess.length === 5 ? [] : [...guess];
    let result;
    if (newGuess.map((obj) => obj.letter).join("").length < 5) {
      newGuess.push({
        letter,
        correctPos: false,
        includedOnly: false,
        notIncluded: false,
      });
      result = handleMatchLetters(newGuess);
      console.log("result", result);
      setGuess([...result]);
      // if (newGuess.map((obj) => obj.letter).join("").length === 5) {
      //   let newArr = [...guessList];
      //   newArr.push(result);
      //   setGuessList([...newArr]);
      // }
    }
  };

  useEffect(() => {
    let word= guess.map((obj) => obj.letter).join("")
    if (word.length === 5) {
      let newArr = [...guessList];
      newArr.push(guess);
      if(word===correctWord){
        alert('Congratulations!! You guessed the correct word...')
      }
      setGuessList([...newArr]);
      setGuess([]);
    }
    
  }, [guess.length]);

  // console.log(guessList);
  return (
    <div className="App">
      <>
        <header>
          <h1>Wordle</h1>
        </header>
        <section className="word-guess-container">
          {[0, 1, 2, 3, 4, 5].map((rowIndex) => {
            return (
              <div className="word-guess-row flex" key={rowIndex}>
                {[0, 1, 2, 3, 4].map((i) => {
                  return (
                    <div className="letter-tile" key={i}>
                      {/* {console.log(guessList?.length === rowIndex
                          ? guess[i]?.letter ?? "": guessList[rowIndex] ? guessList[rowIndex][i]?.letter ?? "" : ""
                          )} */}

                      {guessList?.length === rowIndex ? (
                        <div
                          className={
                            guess[i]?.correctPos
                              ? "correctPosStyle"
                              : guess[i]?.includedOnly
                              ? "correctLetterStyle"
                              : guess[i]?.notIncluded ? "incorrectLetterStyle" : "noword-tile"
                          }
                        >
                          {guess[i]?.letter ?? ""}
                        </div>
                      ) : guessList[rowIndex] ? (
                        <div
                          className={
                            guessList[rowIndex][i]?.correctPos
                              ? "correctPosStyle"
                              : guessList[rowIndex][i]?.includedOnly
                              ? "correctLetterStyle"
                              : "incorrectLetterStyle"
                          }
                        >
                        {guessList[rowIndex][i]?.letter ?? ""}
                        </div>
                      ) : (
                        ""
                      )}

                      {/* <div>
                        {(guessList[rowIndex])?
                        guessList[rowIndex][i]?.letter ?? ""
                        :
                        rowIndex===0 || guessList[rowIndex-1] ? guess[i]?.letter : ""
                      }
                      </div> */}
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
