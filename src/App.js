import React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      displayedLetters: [],
      guessedLetters: [],
      // Insert num guesses left state here
      // Insert form input state here
      guessValue: '',
      triesLeft : 10,
      roundsPlayed:0,
      roundsWon:0,
    };
    this.handleGuessChange = this.handleGuessChange.bind(this)
  }

  handleGuessChange(event) {
   this.setState({guessValue: event.target.value});
  }

  // handleGuessChange = (event) => {
  //   this.setState({guessValue: event.target.value});
  //  }

  handleSubmit = (event) => {
    // let {guessValue, currWord, triesLeft, guessedLetters} = this.state to eliminate the this.state text
    event.preventDefault();
    alert('Letter guessed: ' + this.state.guessValue);
    const tries = ([...this.state.currWord].includes(this.state.guessValue)) ? this.state.triesLeft : this.state.triesLeft - 1; // try to move into the determinewinner
    const currGuessedLetters = this.state.guessedLetters.concat(this.state.guessValue);
    const displayText = this.updateDisplayedLettersAndTries(currGuessedLetters);
    this.setState({
      guessedLetters: currGuessedLetters,
      guessValue: '',
      triesLeft: tries,
      displayedLetters: displayText,
    })
  }

  determineWinLose = (wordDisplayArray) => {
    if (wordDisplayArray.join('') === this.state.currWord) {
      this.setState({roundsPlayed:this.state.roundsPlayed + 1, roundsWon: this.state.roundsWon + 1})
      return `Congratulations, you won! The word was '${this.state.currWord}'`
    } else if (this.state.triesLeft === 0) {
      this.setState({roundsWon: this.state.roundsWon + 1})
      return `Sorry, you lost! The word was ${this.state.currWord}`
    } else{
      return wordDisplayArray.toString()
    }
  }

  updateDisplayedLettersAndTries = (currGuessedLetters) => {
    const wordDisplayArray = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (currGuessedLetters.includes(letter)) {
        wordDisplayArray.push(letter);
      } else {
        wordDisplayArray.push("_");
      }
    }
    const displayText = this.determineWinLose(wordDisplayArray)
    return displayText;
  };

  // Insert form callback functions handleChange and handleSubmit here

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {this.state.displayedLetters}
          <h3>Guessed Letters</h3>
          {this.state.guessedLetters.length > 0
            ? this.state.guessedLetters.toString()
            : "-"}
          <h3>Input</h3>
          <form onSubmit = {this.handleSubmit}>
            <label> Guess a letter: </label>  
              <input type="text" value={this.state.guessValue} onChange={this.handleGuessChange} />
              {/* <input 
              type="text" 
              name = "guess" 
              value={this.state.guessValue} 
              onChange={(e)=>{this.handleGuessChange(e)}}
              /> */}
            <br />
            Lives: {this.state.triesLeft}
            <br />
            <input type="submit" value="Submit"/>
          </form>
          <h5>Rounds played: {this.state.roundsPlayed}; Rounds won: {this.state.roundsWon}</h5>
        </header>
      </div>
    );
  }
}

export default App;
