import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CatchWeather from './../pages/CatchWeather';


const AnyReactComponent = ({text}) => <div>{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    console.log('Watch for update',props.lat)

    this.state = {
      center: {
        lat: props.lat,
        lng: props.long
      },
      zoom: 12

    }
  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 12
  };
  render() {
    console.log('MAP Component state: ',this.state.center)
    return (
      <GoogleMapReact bootstrapURLKeys={{key: 'AIzaSyBlfbw45vPnP31tcI17YMIc92NInBqf6XI'}} defaultCenter={this.state.center} defaultZoom={this.state.zoom}>

        {/* <AnyReactComponent lat={this.props.lat} lng={this.props.long} text={'Kreyser Avrora'} /> */}

      </GoogleMapReact>
    );
  }
}

export default SimpleMap;
