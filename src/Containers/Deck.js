import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Row, Col} from "react-bootstrap";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from "../Components/SearchBar";
import DeckList from "../Components/DeckList";


export default function Deck(props) {
    const [deck, setDeck] = useState(null);
    const [note, setNote] = useState(null);
    const [deckList, setDeckList] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const Scry = require("scryfall-sdk");

  useEffect(() => {
    function loadDeck() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const note = await loadDeck();
        const { content } = note;

        setContent(content);
        setDeckList(content.decklist);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.name.length > 0;
  }
  
  function saveDeck(note) {
    let temp = {content :{
      name: content.name,
      decklist: deckList
    }};

    return API.put("notes", `/notes/${props.match.params.id}`, {
      body: temp
    });
  }


  async function findCard(cardName) {
    await Scry.Cards.byName(cardName).then(result =>
        addCard(result));
  }

  function addCard(newCard){
    let temp;

    if(!deckList)
      temp = [];
    else
      temp = deckList;

    temp.push(newCard);
    setDeckList(null);
    setDeckList(temp);
  }

  function removeCard(toRemove){
    
  }
  
  async function handleSubmit(event) {

    event.preventDefault();  
    setIsLoading(true);

    try {
      await saveDeck({content});
      setIsLoading(false);
      props.history.push(`/deck/${props.match.params.id}`);
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteDeck() {
    return API.del("notes", `/notes/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteDeck();
      props.history.push("/my-deck");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Notes">
    {note && (
    
      <div>
        <Row>
          <Col>
            <FormGroup controlId="content">
            <FormControl
              value={content.name}
              componentClass="textarea"
              onChange={e => setContent({
                name: e.target.value,
                decklist: content.decklist})}
            />
            </FormGroup>
          </Col>
          <Col>
            <SearchBar findCard={findCard} className="search-bar" />
          </Col>
          <Col>          
            <form onSubmit={handleSubmit}>
              <LoadingSpinner
                block
                type="submit"
                bsStyle="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Save
              </LoadingSpinner>
              <LoadingSpinner
                block
                bsStyle="danger"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                Delete
              </LoadingSpinner>
            </form>
          </Col>
        </Row>
        <Row>
        <Col></Col>
        <Col>
          <DeckList 
            deckList={deckList}
            isAuthenticated={props.isAuthenticated} 
            userHasAuthenticated={props.userHasAuthenticated} 
          />
        </Col>
        <Col></Col>
        </Row>
      </div>

    )}
  </div>
  );
}