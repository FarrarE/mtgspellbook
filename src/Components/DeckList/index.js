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
          ) : <div>List Loading</div>
        }
      </div>
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
    <div className="deck-list">
        <h1>DeckList</h1>
        {props.isAuthenticated ? renderDecks() : renderLander()}
    </div>
  );
}