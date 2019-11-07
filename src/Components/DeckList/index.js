import React, { useEffect, useState } from "react";
import {Col, Row, Button } from "react-bootstrap";
import { API } from "aws-amplify";
import './styles.css';

export default function DeckList(props) {
  const [deck, setDeck] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const deck = await loadDecks();
        setDeck(deck);
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

  function renderDeckList(deck) {
    return (
      <ul className="list">
        { 
          props.deckList ? props.deckList.map(card => 
            <li className="card">  
              {card.name}
            </li>
          ) : <div>List Loading</div>
        }
      </ul>
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
        <div>
          {!isLoading && renderDeckList(deck)}
        </div>

    );
  }

  return (
      <Row>
        <Col>
          {props.isAuthenticated ? renderDecks() : renderLander()}
        </Col>
      </Row> 
  );
}