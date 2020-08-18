import React from 'react';
import {socket} from './client-socket.js';
import './Game.css';
import Box from './Box.js';


class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: '',
      turn: 'X',
      board: ['', '', '', '', '', '', '', '', ''],
      display: ['none', 'vert', 'none', 'hori', 'mid', 'hori', 'none', 'vert', 'none'],
      end: false,
    }

    this.makeTurn = this.makeTurn.bind(this);
    this.checkEnd = this.checkEnd.bind(this);
    this.reset = this.reset.bind(this);
    this.trigger_reset = this.trigger_reset.bind(this);
  }

  componentDidMount() {
    socket.on('join', (data) => {
      this.setState({player: data});
    });

    socket.on('update', (data) => {
      this.state.board[data.index] = this.state.turn;
      this.setState({turn: data.turn});
    });
    
    socket.on('finished', (data) => {
      this.props.changeText(data);
      this.setState({end: true});
    })

    socket.on('reset', () => {
      this.reset();
    })

  }

  makeTurn(index) {
      this.state.board[index] = this.state.turn;
      const nextTurn = this.state.turn === 'X' ? 'O' : 'X'; 

      this.setState({turn: nextTurn});

      socket.emit('turn', {index: index, turn: nextTurn});
  }
  
  checkEnd() {
      let end = false;
      let text = '';
      let winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
      for(let i = 0; i < winCombos.length; i++) {
          let box1 = this.state.board[winCombos[i][0]];
          let box2 = this.state.board[winCombos[i][1]];
          let box3 = this.state.board[winCombos[i][2]];

          if(box1 === box2 && box2 === box3 && box3 !== '') {
            this.setState({end: true});
            this.props.changeText(`Player ${this.state.turn} won the game!`);
            text = `Player ${this.state.turn} won the game!`;
            end = true;
            break;
          }
      }

      if (this.isFilled() && !end) {
        this.setState({end: true});
        this.props.changeText("It's a tie!");
        text = "It's a tie!";
        end = true;
      }

      if (end) {
        socket.emit('end', text);
      }
  }

  isFilled() {
      for(let i = 0; i < 9; i++) {
          if (this.state.board[i] === '') {
              return false;
          }
      }
      return true;
  }

  trigger_reset() {
    socket.emit('reset pressed');
    this.reset();
  }

  reset() {
      this.setState({
                        board: ['', '', '', '', '', '', '', '', ''],
                        end: false,
                        turn: 'X'
                    });
      this.props.changeText('Tic-Tac-Toe with Sockets'); 
  }

  render() {

    let boxList = [];
    for(let i = 0; i < 9; i++) {
        boxList.push(<Box id={i} val={this.state.board[i]} display={this.state.display[i]} turn={this.state.turn} end={this.state.end} player={this.state.player} checkEnd={this.checkEnd} makeTurn={this.makeTurn}/>);
    }

    return (
      <>
        <div className="Game-cont"> 
            {boxList}
            <div className='Game-button' onClick={this.trigger_reset} style={{visibility: this.state.end ? "visible" : "hidden"}}> 
                <div className='Game-buttonText'> Reset </div> 
          </div>
        </div>
      </>
    );
  }
}


  

export default Game;
