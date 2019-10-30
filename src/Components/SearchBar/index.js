import React, { useRef, useState, useEffect } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import "./styles.css";

export default function SearchBar(props) {
  const [content, setContent] = useState("");

  return (
    <div className="search-bar">
      <form >
        <FormGroup controlId="card-name">
          <FormControl 
            placeholder="Search..." 
            autoFocus type="text"               
            onChange={e => setContent(e.target.value)}
            />
        </FormGroup>
      </form>
      <Button onClick={() => props.findCard(content)}>Add</Button>
    </div>
  );
}