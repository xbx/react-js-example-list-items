import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



class Item extends Component {

  render() {
    return (
      <div>
      <a href={this.props.data.permalink}><img src={this.props.data.thumbnail}/>
        <h4>{this.props.data.title}</h4>
      </a>
      <p> requested {this.props.data.hit_counter} times</p>
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: ["nothing yet...."]
    }
    this.update();
  }

  update() {
    this.setState({items: []});
    axios.get(`http://localhost:5000/items`)
    .then(res => {
      const items = res.data;
      this.setState({
        items: items.slice(0,3) 
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">List of items</h1>
        </header>
        
        <button className='btn-class' onClick={()=> this.update()}>Refresh</button>

        <ul class="items">
        {this.state.items.map( item =>
          <li>
            <Item data={item}/>
          </li>
        )}
        </ul>

      </div>
    );
  }
}

export default App;
