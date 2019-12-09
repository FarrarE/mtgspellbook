import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {Container, Row, Col} from 'react-bootstrap';
import {SIDE_BOARD, MAIN_BOARD} from "../../constants";

export default function Card(props) {
  const [content, setContent] = useState("");
  const [count, setCount] = useState("");
  const [board, setBoard] = useState("");

  useEffect(() => {

    if(props.header === MAIN_BOARD)
      setBoard(SIDE_BOARD);
    else
      setBoard(MAIN_BOARD);

    setContent({
      name: props.card.cardData.name,
      cmc: props.card.cardData.mana_cost,
      preview: props.card.cardData.image_uris.small
    });
    setCount(props.card.cardCount);
  }, [props.card.cardCount, props.card.cardData]);


  return (
    <Container id="card-container">
      <Row >
        <Col xs="1">
          <input placeholder="x" type="text" value={count}>
          </input>
        </Col>
        <Col className="name">{content.name}</Col>
        <Col className="cost">{content.cmc}</Col>
        <div className="preview">
          <img src={content.preview}></img>
        </div>
        <div className="card-options">
          <button onClick={props.decrementCardHandler.bind(this, content.name)}>-</button>
          <button onClick={props.incrementCardHandler.bind(this, content.name)}>+</button>
          <button onClick={props.moveCardHandler.bind(this, content.name)}>{board}</button>
      </div>
      </Row>

    </Container>
  );
}