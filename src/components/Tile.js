import React, { Component } from 'react';
import './Tile.css';
import tailStore from '../stores/TailStores.js'

let style = {
  transform: 'translate(0px, 0px)',
}

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tails: tailStore.getTails(),
      id: props.id,
      number: props.number,
      position: {
        l: props.position.l,
        c: props.position.c
      },
    }
    this.changeListener = this.changeListener.bind(this)
  }
  render() {
    return (
      <div style={this.calcStyle()} className="tile">
        <div className="tile-inner">{this.state.number}</div>
      </div>
    );
  }

  componentWillMount() {
    // document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    /*this.setState({
      number: nextProps.number,
      position: {
        l: nextProps.position.l,
        c: nextProps.position.c
      },
    })*/
  }

  calcStyle() {
    let newStyle = Object.assign({}, style);
    newStyle.transform = 'translate(' + 121.25 * this.state.position.c + 'px, ' + 121.25 * this.state.position.l + 'px)'
    let r = 255 - (this.state.number * 6)
    let g = 255 - (this.state.number / 6)
    let b = 255 - (this.state.number / 2)
    newStyle.backgroundColor = 'rgb(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ')'
    return newStyle;
  }

  componentDidMount() {
    tailStore.addChangeListener(this.changeListener);
  }

  componentWillUnmount() {
    tailStore.removeChangeListener(this.changeListener);
  }

  changeListener() {
    let tails = []
    Object.assign(tails, tailStore.getTails());
    this.setState({ tails })
    this.setState({ ...tails.find(tail => tail.id === this.state.id) })
  }

}

export default Tile;
