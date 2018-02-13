import React, { Component } from 'react';

class DisplaySuggestions extends Component {


  handleChange(event){
    const term = event.target.value.split(' ')[ 0 ];;
    const terms = event.target.value;
    this.props.handleClick(term,terms);
    this.props.handleSubmit(event);
  }

  render() {
    const suggestionsList = suggestions.map((i, index) => {
      return(
        <input key={index} type="submit" value={i} onClick={this.handleChange.bind(this)} />
      )
    })
    return (
      <div className="suggestionsBlok">
        <p className="suggestionsHeader">Here are some suggestions for your search (please doublepress on suggestion)</p>
        <ul className="suggstionsList">
          {suggestionsList}
        </ul>
      </div>
    );
  }
}

const suggestions = ["Hillary Clinton","Ted Cruz","Jeb Bush","Marco Rubio","President Obama","Elizabeth Warren","John Kasich","Bernie Sanders","Bill Clinton","Lindsey Graham","Ben Carson","Carly Fiorina","John McCain","Rick Perry","George Pataki","Scott Walker","Tim Kaine","Rand Paul","Donald Trump","George W. Bush","Megyn Kelly","Women","Bobby Jindal",
  "Tom Ridge","Michael Nutter","Barack Obama","Mexico","Immigrants","Cory Booker","Sam Liccardo","Lincoln Chafee","Muslims","Bakari Sellers","Illegal Immigrants","Chris Christie","Arianna Huffington","Neil Young","History","Sexual Assults","Military","Marty Walsh","Ben Cardin","Stephanie Rawlings-Blake","Mitt Romney","Ivanka Trump","Ruth Bader Ginsburg","Muammar Gaddafi","Bill and Hillary Clinton","Money","Bette Midler"];

export default DisplaySuggestions;
