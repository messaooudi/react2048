import React, { Component } from 'react';
import Tile from './components/Tile'
import logo from './logo.svg';
import './App.css';

import tailAction from './actions/TailsActions.js'
import tailStore from './stores/TailStores.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tails: [...tailStore.getTails()]
    }
    this._handleKeyDown = this._handleKeyDown.bind(this);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br/>
          <small>Made by MESSAOUDI Oussama</small>
        </div>
        <div className="container">
          <div className="game-container">
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
              <div className="grid-row">
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
                <div className="grid-cell"></div>
              </div>
            </div>
            <div className="tile-container">
              {this.state.tails.map(tail => <Tile key={tail.id} {...tail} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }


  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown);
    this.newTail()
  }

  _handleKeyDown({ key }) {
    let stop = true;
    switch (key) {
      case "ArrowDown":
        do {
          stop = true;
          for (let c = 0; c < 4; c++) {
            for (let l = 2; l >= 0; l--) {
              let tail = this.state.tails.find(({ position }) => position.l === l & position.c === c);
              if (tail) {
                let sibling = this.state.tails.find(({ position }) => position.l === l + 1 & position.c === c);
                if (sibling) {
                  if (sibling.number === tail.number) {
                    tail.position.l++;
                    tail.number *= 2;
                    tailAction.remove(sibling);
                    stop = false;
                  }
                } else {
                  tail.position.l++
                  stop = false;
                }
              }
            }
          }
        } while (!stop)
        this.newTail()
        break;
      case "ArrowUp":
        do {
          stop = true;
          for (let c = 0; c < 4; c++) {
            for (let l = 1; l <= 3; l++) {
              let tail = this.state.tails.find(({ position }) => position.l === l & position.c === c);
              if (tail) {
                let sibling = this.state.tails.find(({ position }) => position.l === l - 1 & position.c === c);
                if (sibling) {
                  if (sibling.number === tail.number) {
                    tail.position.l--;
                    tail.number *= 2;
                    tailAction.remove(sibling);
                    stop = false;
                  }
                } else {
                  tail.position.l--
                  stop = false;
                }
              }
            }
          }
        } while (!stop)
        this.newTail()
        break;
      case "ArrowLeft":
        do {
          stop = true;
          for (let l = 0; l < 4; l++) {
            for (let c = 1; c <= 3; c++) {
              let tail = this.state.tails.find(({ position }) => position.l === l & position.c === c);
              if (tail) {
                let sibling = this.state.tails.find(({ position }) => position.l === l & position.c === c - 1);
                if (sibling) {
                  if (sibling.number === tail.number) {
                    tail.position.c--;
                    tail.number *= 2;
                    tailAction.remove(sibling);
                    stop = false;
                  }
                } else {
                  tail.position.c--
                  stop = false;
                }
              }
            }
          }
        } while (!stop)
        this.newTail()
        break;
      case "ArrowRight":
        stop = true;
        do {
          stop = true;
          for (let l = 0; l < 4; l++) {
            for (let c = 2; c >= 0; c--) {
              let tail = this.state.tails.find(({ position }) => position.l === l & position.c === c);
              if (tail) {
                let sibling = this.state.tails.find(({ position }) => position.l === l & position.c === c + 1);
                if (sibling) {
                  if (sibling.number === tail.number) {
                    tail.position.c++;
                    tail.number *= 2;
                    tailAction.remove(sibling);
                    stop = false;
                  }
                } else {
                  tail.position.c++
                  stop = false;
                }
              }
            }
          }
        } while (!stop)
        this.newTail()
        break;
      default:
        this.setState({tails : tailStore.getHistory()})
        break;
    }
  }
  newTail() {
    let pos = null;
    if (tailStore.getTails().length < 16) {
      while (!pos) {
        let l = Math.floor(Math.random() * 4)
        let c = Math.floor(Math.random() * 4)
        if (!this.state.tails.find(tail => tail.position.l === l && tail.position.c === c)) {
          pos = { l: l, c: c }
        }
      }
      tailAction.create({
        id: new Date().getTime(),
        number: 2,
        position: pos
      }
      )
      this.setState({ tails: tailStore.getTails() })
    } else {
      //alert('ur done')
      //tailAction.clear()
      //this.setState({ tails: tailStore.getTails() })
      //this.newTail()
    }
  }
}

export default App;
