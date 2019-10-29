import React, { useEffect, useState } from "react";
import {Col, Row, Button } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./MyDecks.css";

export default function MyDecks(props) {
  const [notes, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem className="item">
            <h3>{ note.content}</h3>
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <div></div>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>My Decks</h1>
        <p>Your spellbook is empty, add a new deck!</p>
      </div>
    );
  }

  function renderDecks() {
    return (
      <div className="decks">
        <h1>My Decks</h1>
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
        <Col>
          <LinkContainer to="/new-deck">
            <Button>New Deck</Button>
          </LinkContainer>
        </Col>
      </Row> 
    </div>
  );
}