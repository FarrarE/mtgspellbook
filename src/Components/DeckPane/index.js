import React from 'react';
import './styles.css';
import Card from '../Card';
import {
    Row,
    Col } from 'reactstrap';

class DeckPane extends React.Component {
    constructor(props) {
        super(props);
        this.mtg = require('mtgsdk');
        this.state = {url: null};

        this.getCard = this.getCard.bind(this);
    }

    getCard() {
        let imgurl;

        this.mtg.card.find(3)
        .then(result => {
            imgurl = result.card.imageUrl;
            this.setState({
                url: imgurl
            }); 
            console.log(this.state.url);
            this.forceUpdate()
        }) 
    }

    componentDidMount() {
        this.getCard();
    }
  
    render() {
        
        return (
            <div className="card-pane">
                <Row>
                    <Col></Col>
                    <Col>
                        <div className="searchbar">
                            <input type="text" placeholder="Search.." />
                            <button>Add</button>
                        </div>
                    </Col>
                    <Col>
                        <div className="view-type">
                            View:
                            <button>List</button>
                            <button>Visual</button>
                        </div>
                    </Col>
                </Row>

                <Row>
                <Col md="2"></Col>
                <Col md="8">
                    { this.state.url ? <Card image={this.state.url} /> : null }
                </Col>
                <Col md="2"></Col>
                </Row>
            </div>
        );
    }
}
export default DeckPane;