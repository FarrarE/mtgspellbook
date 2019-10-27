import React from 'react';
import './styles.css';
import Card from '../Card';
import {
    Row,
    Col } from 'reactstrap';

class DeckPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: null};
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
                </Col>
                <Col md="2"></Col>
                </Row>
            </div>
        );
    }
}
export default DeckPane;