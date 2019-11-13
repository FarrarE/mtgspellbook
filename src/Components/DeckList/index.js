import React, { useEffect, useState } from "react";
import {Col, Row, Button, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import Card from '../Card';
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
      <div className="list">
        { 
          props.deckList ? props.deckList.map(card => 
            <Card card={card} />
          ) : renderLander()
        }
      </div>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
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
    <div className="deck-list">
        {props.header === "Main Board" ? <h3>{props.header}</h3> : <h4>{props.header}</h4>}
        {props.isAuthenticated ? renderDecks() : renderLander()}
    </div>
  );
}