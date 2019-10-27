import React from 'react';
import './styles.css';
import Card from '../Card';
import DeckItem from './DeckItem';
import {
    Row,
    Col } from 'reactstrap';

class DeckList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return (
            <div className="deck-pane">
                <Row>
                    <Col>
                        <div className="add">
                            <button>Add Deck</button>
                        </div>
                    </Col>
                    <Col>
                        <div className="view">
                            <button>List</button>
                            <button>Visual</button>
                        </div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <div className="deck-list">
                            <DeckItem />
                            <DeckItem />
                            <DeckItem />
                            <DeckItem />
                            <DeckItem />
                        </div>
                    </Col>
                    <Col md="2"></Col>
                </Row>
            </div>
        );
    }
}
export default DeckList;