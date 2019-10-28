import React, { useRef, useState } from "react";
import {Col, Row, Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./MyDecks.css";

export default function MyDecks(props) {

  return (
    <div className="my-deck"> 
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <LinkContainer to="/new-deck">
            <Button>New Deck</Button>
          </LinkContainer>
        </Col>
      </Row> 
    </div>
  );
}