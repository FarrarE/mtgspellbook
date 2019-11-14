import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {Container, Row, Col} from 'react-bootstrap';

export default function Card(props) {
  const [content, setContent] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    setContent(props.card.cardData.name);
    setCount(props.card.cardCount);
  }, [props.card.cardCount, props.card.cardData]);


  return (
    <Container id="card-container">
      <Row >
        <Col xs="1">
          <input placeholder="x" type="text" value={count}>
          </input>
        </Col>
        <Col >{content}</Col>
        <div className="card-options">
          <button>-</button>
          <button onClick={props.incrementCardHandler.bind(this, content)}>+</button>
          <button>SideBoard</button>
      </div>
      </Row>

    </Container>
  );
}