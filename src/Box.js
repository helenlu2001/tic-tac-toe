import React from 'react';
import './Box.css';

/**
 * @param id the index of the box in the gameboard
 * @param val the value inside of the box, ie X, O or not determined yet
 * @param display determines the css display class for the given box
 * @param turn determines whose turn it is, X or O
 * @param end indicates if the game has been won yet / no moves allowed if won
 * @param checkEnd is a function that determines if the game is wone yet
 * @param makeTurn updates the board given the move the user determines
 */

class Box extends React.Component {

    constructor(props) {
      super(props);
      this.placeMarker = this.placeMarker.bind(this);
    }
  
    componentDidMount() {
  
    }

    placeMarker() {
        if (this.props.val === '' && !this.props.end && this.props.player === this.props.turn) {
            this.props.makeTurn(this.props.id);
            this.props.checkEnd();
        }
    }
  
    render() {
      let newClass = ''
      if(this.props.display !== 'none') {
          newClass = ' ' + this.props.display;
      }
      
      return (
        <>
          <div className={"Box-cont" + newClass} onClick={this.placeMarker}> 
            <div className="Box-text"> 
                {this.props.val}
            </div>
          </div>
        </>
      );
    }
  }
  
  
    
  
  export default Box;
  