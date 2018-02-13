import React, { Component } from 'react';
import DisplaySuggestions from './displaySuggestions';

var $ = require('jquery');

//import TrumpApi from './../api/TrumpApi';

class Trump extends Component {
  constructor() {
      super();
      this.state = {
        term: '',
        quotes: [<li key="0"><img  alt="" className="babyPhoto" src="http://i0.kym-cdn.com/photos/images/facebook/001/108/155/516.jpg" /></li>],
        header: 'Search for something already!'
      };
    }



    handleClick = function(event,terms){
      this.setState({
        term: event,
        header: terms
      });
      console.log('this is term : ' + this.state.term)
    };

    onChange = (event) => {
      this.setState({term: event.target.value});
    }


    handleSubmit = (event) => {
      event.preventDefault();
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = `https://api.tronalddump.io/search/quote?query=${this.state.term}`

      console.log('function state is : '+this.state.term)
      console.log(proxyUrl + targetUrl)
      fetch(proxyUrl + targetUrl)
        .then(results => {
          return results.json();
          console.log(results.headers)
        }).then(data => {
          let quotes = data._embedded.quotes.map((i, index) => {
            return(
              <li key={index}>
                <p>{i.value}</p>
              </li>
            )

          })
          $('.formInput').val("");
          this.setState({
            quotes: quotes,
            }
          )
        })
      .catch(e => console.log('error', e));

    }


    render() {
        return (
          <div className="App">
            <div className="searchBlock">
              <form className="TrumpForm" onSubmit={this.handleSubmit}>
                <input placeholder="Type to search one of Trump quotes" className="formInput" onChange={this.onChange} />
                <button className="formButton">Search!</button>
              </form>
              <DisplaySuggestions handleClick={this.handleClick.bind(this)} handleSubmit={this.handleSubmit.bind(this)} />
            </div>
            <hr />
            <h3 className="searchHeader">{this.state.header}</h3>
            <hr />
            <ol className="TrumpList">{this.state.quotes}</ol>
          </div>
        );
      }


  }


export default Trump;
