import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, Row, Col} from "react-bootstrap";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from "../Components/SearchBar";
import DeckList from "../Components/DeckList";


export default function Deck(props) {
  const [content, setContent] = useState("");
  const [mainBoard, setMainBoard] = useState([]);
  const [sideBoard, setSideBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const Scry = require("scryfall-sdk");

  useEffect(() => {
    // Populates the local data with information pulled from the server.

    async function onLoad() {
      try {
        const deck = await loadDeck();
        const {content} = deck;
        setContent(content);
        setMainBoard(content.mainBoard);
        setSideBoard(content.sideBoard);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();

  }, [props.content]);

  // Gets the data from the server using the api get route.
  function loadDeck() {
    return API.get("notes", `/notes/${props.match.params.id}`);
  }

  // Used to prevent empty form submission.
  function validateForm() {
    return content.name.length > 0;
  }

  // Attempts to find card using the sryfall api using the card name as a key.
  async function findCard(cardName) {
    await Scry.Cards.byName(cardName).then(result =>
      addCard(result, mainBoard, setMainBoard));
  }

  function updateList(list, board){

  }

  function findIndex(cardName, list){
    let index = -1;
    let length = list.length;
    for(let i = 0;i < length;++i){
      if(list[i].cardData.name === cardName)
        index = i;
    }
    return index;
  }

  // Adds the card object to a list using function set.
  function addCard(newCard, list, set){
    let newList;
    let toAdd; 
    let index = findIndex(newCard.name, list);

    if(!newCard.name)
      return;
      
    if(index >= 0){
      newList = [...list];
      newList[index].cardCount = newList[index].cardCount + 1;
      set(newList);
    }else{
      toAdd = {
        'cardData': newCard,
        'cardCount': 1
      };
      newList = [...list]
      newList.push(toAdd);
      set(newList);
    }
  }

  function removeCard(index, list, set){
    let newList = [...list];

    if(newList[index].cardCount === 1){
      newList.splice(index,1);
      set(newList);
    }else{
      newList[index].cardCount = newList[index].cardCount - 1;
      set(newList);
    }
  }

  function incrementCard(cardName, board){
    let index;
    let toAdd;

    if(board === "Main Board"){
      index = findIndex(cardName, mainBoard);
      toAdd = mainBoard[index];
      
      if(toAdd)
        addCard(toAdd.cardData, mainBoard, setMainBoard);
    }

    if(board === "Side Board"){
      index = findIndex(cardName, sideBoard);
      toAdd = sideBoard[index];
      addCard(toAdd.cardData, sideBoard, setSideBoard);
    }
  }

  function decrementCard(cardName, board){
    let index;
    let toAdd;

    if(board === "Main Board"){
      index = findIndex(cardName, mainBoard);
      toAdd = mainBoard[index];
      removeCard(index, mainBoard, setMainBoard);
    }

    if(board === "Side Board"){
      index = findIndex(cardName, sideBoard);
      toAdd = sideBoard[index];
      removeCard(index, sideBoard, setSideBoard);
    }
  }

  function moveCard(cardName, board){
    let index;
    let toAdd;

    if(board === "Main Board"){
      index = findIndex(cardName, mainBoard);
      toAdd = mainBoard[index];
      removeCard(index, mainBoard, setMainBoard);
      addCard(toAdd.cardData, sideBoard, setSideBoard);
    }

    if(board === "Side Board"){
      index = findIndex(cardName, sideBoard);
      toAdd = sideBoard[index];
      removeCard(index, sideBoard, setSideBoard);
      addCard(toAdd.cardData, mainBoard, setMainBoard);
    }
  }

  // Saves the deck to server by calling the api put route.
  function saveDeck(note) {
    let temp = {content :{
      name: content.name,
      mainBoard: mainBoard,
      sideBoard: sideBoard,
    }};

    return API.put("notes", `/notes/${props.match.params.id}`, {
      body: temp
    });
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

  // removes deck from server by calling the api delete route.
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
      {content && (
        <div>
          <Row>
            <Col>
              <FormGroup controlId="content">
              <FormControl
                value={content.name}
                componentClass="textarea"
                onChange={e => setContent({
                  name: e.target.value,
                  mainBoard: content.mainBoard})}
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
          <Col md="6">
            <DeckList
              header="Main Board"
              list={mainBoard}
              setList={setMainBoard}
              incrementCard={incrementCard}
              decrementCard={decrementCard}
              moveCard={moveCard}
              isAuthenticated={props.isAuthenticated} 
              userHasAuthenticated={props.userHasAuthenticated} 
            />
            <DeckList 
              header="Side Board"
              list={sideBoard}
              setList={setSideBoard}
              incrementCard={incrementCard}
              decrementCard={decrementCard}
              moveCard={moveCard}
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