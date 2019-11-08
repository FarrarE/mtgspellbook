import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import {Container, Row, Col} from 'react-bootstrap';

export default function Card(props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(props.card.name);
  }, [props.isAuthenticated]);


  return (
    <Container id="card-container">
      <Row >
        <Col xs="1"><input placeholder="x" type="text"></input></Col>
        <Col >{content}</Col>
        <div className="card-options">
          <button>-</button>
          <button>+</button>
          <button>SideBoard</button>
      </div>
      </Row>

    </Container>
  );
}