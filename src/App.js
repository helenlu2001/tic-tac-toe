import React from 'react';
import './App.css';
// import {socket} from './client-socket.js';
import Game from './Game.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: 'Tic-Tac-Toe with Sockets',
    }
    this.changeText = this.changeText.bind(this);
  }

  componentDidMount() {

  }

  changeText(text) {
    this.setState({text: text});
  }

  render() {
    return (
      <>
        <div className="App-container"> 
          <div className='App-title'> {this.state.text} </div>
          <Game changeText={this.changeText}/> 
        </div>
      </>
    );
  }
}


  

export default App;
