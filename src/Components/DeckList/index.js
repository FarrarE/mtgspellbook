import React, { useEffect, useState } from "react";
import {Col, Row, Button } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import './styles.css';

export default function DeckList(props) {
  const [content, setContent] = useState("");
  const [notes, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setNewLoading] = useState(false);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadDecks();
        setDecks(notes);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);

  function loadDecks() {
    return API.get("notes", "/notes");
  }
  

  function renderDeckList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
          <ListGroupItem className="item">
            <h3>{ note.content.decklist}</h3>
          </ListGroupItem>
      ) : (
        <div></div>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Deck List</h1>
        <p>Your spellbook is empty, add a card!</p>
      </div>
    );
  }

  function renderDecks() {
    return (
      <div className="decks">
        <h1>Decklist</h1>
        <ListGroup>
          {!isLoading && renderDeckList(notes)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="my-deck"> 
      <Row>
        <Col></Col>
        <Col>
          {props.isAuthenticated ? renderDecks() : renderLander()}
        </Col>
        <Col></Col>
      </Row> 
    </div>
  );
}