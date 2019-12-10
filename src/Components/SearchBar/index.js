import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import "./styles.css";

export default function SearchBar(props) {
  const [content, setContent] = useState("");

  useEffect(() => {

  }, [props.suggested]);

  return (
    <div className="search-bar">
      <form onSubmit={e => { e.preventDefault(); }}>
        <FormControl
          className="input"
          placeholder="Search..." 
          autoFocus type="text" 
          onKeyPress={e =>{
            if(e.charCode==13){
              props.findCard(content);    
            }
          }}
          onChange={e => {
            setContent(e.target.value);
            props.search(e.target.value);
          }}
          />

      </form>
      <ListGroup className="suggested">
        {props.suggested.slice(0, 5).map(card => <ListGroupItem>{card}</ListGroupItem>)}
      </ListGroup>
    </div>
  );
}