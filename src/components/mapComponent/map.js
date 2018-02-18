import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CatchWeather from './../pages/CatchWeather';


const AnyReactComponent = ({text}) => <div>{text}</div>;

class SimpleMap extends Component {
  render() {
    return (
      <GoogleMapReact  bootstrapURLKeys={{key: 'AIzaSyBlfbw45vPnP31tcI17YMIc92NInBqf6XI'}} center={this.props.center} defaultZoom={14}>

        <AnyReactComponent lat={this.props.lat} lng={this.props.long} text={'Kreyser Avrora'} />

      </GoogleMapReact>
    );
  }
}


export default SimpleMap;
