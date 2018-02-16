import React, { Component } from 'react';
import DisplaySuggestions from './displaySuggestions';
import WeatherMessage from './weathermessage';


const axios = require('axios');
var $ = require('jquery');

//import TrumpApi from './../api/TrumpApi';

class CatchWeather extends Component {
  constructor() {
      super();
      this.state = {
        term: '',
        temperature: '',
        header: 'Search for a city',
        isLoading: false
      };
    }
    onChange = (event) => {
      this.setState({term: event.target.value});
    }

    handleClick = (event) => {
      this.setState({term: event.target.value});
      setTimeout(() => {
        $('.formButton').click();
      },100);
    }

  fetchWeather = (event) =>{
      event.preventDefault(event);
      this.setState({
        isLoading: true,
        temperature: ''
      });

      var encodedComponent = encodeURIComponent();
      var geocodeUrl =  `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.term}`;

      axios.get(geocodeUrl).then((response) => {
        if (response.data.status === 'ZERO_RESULTS'){
          throw new Error('Unable to find that address');
        }
        var lat = response.data.results[0].geometry.location.lat;
        var long = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/052e6d70c203846bb952f6d81f70772c/${lat},${long}`
        var header = response.data.results[0].formatted_address;
        console.log(response.data.results[0])
        $('.formInput').val("");
        this.setState({
          header: header
        })

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        return axios.get(proxyUrl+weatherUrl);
      }).then((response) => {
        var currentlyTemperature = response.data.currently.temperature;
        var celciusCurrentlyTemperature = Math.round((currentlyTemperature -32) *5/9);
        var apparentTemperature = response.data.currently.apparentTemperature;
        var apparentCelciusTemperature = Math.round((apparentTemperature -32) *5/9);

        let temperature = <div>It's currently {celciusCurrentlyTemperature} degree celcius in {this.state.header}. <hr /> It feels like {apparentCelciusTemperature} degree celcius in {this.state.header}.</div>
        this.setState({
          isLoading: false,
          temperature: temperature
        })
      })
      .catch((e) => {
        if(e.code === 'ENOTFOUND'){
          console.log('Unable to connect to API servers');
        } else {
          console.log(e.message);
        }
      });
  }





    render() {
      var {isLoading, temperature} = this.state;

      function renderMessage () {
        if (isLoading) {
          return <img src='https://www.drupal.org/files/issues/throbber_13.gif' className="spinningWheel"/>;
        }
      }

        return (
          <div className="App">
            <div className="searchBlock">
              <button value="kaunas" onClick={this.handleClick}>Kaunas</button>
              <button value="vilnius" onClick={this.handleClick}>Vilnius</button>
              <button value="klaipeda" onClick={this.handleClick}>Klaipėda</button>
              <button value="london" onClick={this.handleClick}>London</button>


              <form className="TrumpForm" onSubmit={this.fetchWeather}>
                <input placeholder="Type to search one of Trump temperature" className="formInput" onChange={this.onChange} />
                <button className="formButton">Search!</button>
              </form>
            </div>
            <hr />
            <h3 className="searchHeader">{this.state.header}</h3>
            <hr />
            {renderMessage()}
            <ol className="TrumpList">{this.state.temperature}</ol>
          </div>
        );
      }


  }


export default CatchWeather;
