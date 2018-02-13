var axios = require('axios');

const CHUCK_NORRIS_URL = 'https://api.tronalddump.io/search/quote';

module.exports = {
  getQuotes: function(term) {
    var excodedQuote = encodeURIComponent(term);
    var requestUrl = `${CHUCK_NORRIS_URL}&q=${encodeURIComponent}`;

    axios.get(requestUrl).then (function (res) {
      if (res.data.cod && red.data.message) {
        throw new Error(res.data.message);
      }else{
        return res._embedded.quotes.value
      }
    }, function(res) {
      throw new Error(res.data.message);
    });
  }
}
