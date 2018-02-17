import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CatchWeather from './../pages/CatchWeather';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 12
  };

  render() {
    return (
      <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBlfbw45vPnP31tcI17YMIc92NInBqf6XI' }}  defaultCenter={this.props.center}  defaultZoom={this.props.zoom}>

        <AnyReactComponent lat={59.955413} lng={30.337844} text={'Kreyser Avrora'} />

      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
