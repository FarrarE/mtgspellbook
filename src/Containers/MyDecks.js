import React, { useEffect, useState } from "react";
import {Col, Row, Button } from "react-bootstrap";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import LoadingSpinner from '../Components/LoadingSpinner';
import "./MyDecks.css";

export default function MyDecks(props) {
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

  async function handleSubmit(event) {
    event.preventDefault();
    setNewLoading(true);
    try {
      await createDeck({ content });
      props.history.push("/");
      props.history.push("/my-deck");
    } catch (e) {
      alert(e);
      setNewLoading(false);
    }
  }

  function loadDecks() {
    return API.get("notes", "/notes");
  }
  
  function createDeck(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  function renderDeckList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/deck/${note.noteId}`}>
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
          <form onSubmit={handleSubmit}>
            <LoadingSpinner
              type="submit"
              isLoading={isNewLoading}
              onClick={e => setContent("New Deck")}
            >
              New Deck
            </LoadingSpinner> 
          </form>
        </Col>
      </Row> 
    </div>
  );
}