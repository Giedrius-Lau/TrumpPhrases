import React, { Component } from 'react';

class ApiTest extends Component{
  constructor(props) {
      super(props);
      this.state = {
        term: '',
        img: '',
        pictures: []
      };
    }

    onChange = (event) => {
      this.setState({term: event.target.value});
    }


    handleSubmit = (event) => {
      event.preventDefault();
      // var randomNumbers = 0;
      // function randomNumber(){
      //   randomNumbers = Math.floor((Math.random() * 10)+  Math.floor((Math.random())) * 10);
      //
      // }
      // randomNumber();
      const api_key = 'dc6zaTOxFJmzC';
      const url = `http://api.giphy.com/v1/gifs/search?q=${this.state.term}&api_key=${api_key}`;
      fetch(url)
        .then(results => {
          return results.json();
        }).then(data => {
          //testing
          let pictures = data.data.map((pic) => {
              return(
                <div key={pic.results}>
                  <img alt="" src={pic.images.fixed_height.url} />
                </div>
              )
          })
          //testing
          this.setState(
            { img: data.data[0].images.fixed_height.url,
              pictures: pictures}
          )}
        )
        .catch(e => console.log('error', e));
    }


    render() {
        return (
          <div className="App">
            <h1 className="gifTitle">Search for GIF's</h1>
            <form className="gifSearch" onSubmit={this.handleSubmit}>
              <input placeholder="Type something to search" value={this.state.term} onChange={this.onChange} />
              <button>Search!</button>
            </form>
            <hr />
            <div className="container1">
              {this.state.pictures}
            </div>
          </div>
        );
      }


  }



export default ApiTest;
