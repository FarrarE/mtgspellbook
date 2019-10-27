import React from 'react';

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      image: props.image,
    };
  }

    render() {
    
    return (
        <div><img src={this.state.image} /></div>
    )}
}

export default Card;