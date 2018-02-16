var React = require('react');

var WeatherMessage = ({temperature}) => {
  return (
    <h3 className="text-center">It is {temperature} degree celsius in !</h3>
  )
};

module.exports = WeatherMessage;
