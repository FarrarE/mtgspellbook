import React from 'react';
import { Row, Col } from 'reactstrap';

class DeckItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

    render() {
    
    return (
        <div className="deck-item">
            <img
                className="deck-image"
                src="https://blog.blacklotusgo.com/wp-content/uploads/2019/09/drown-in-the-loch-art.png" 
                alt="">
            </img>
            <input type="text" placeholder="Deck Name" />
        </div>
    )}
}

export default DeckItem;