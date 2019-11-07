import React, { useRef, useState, useEffect } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import "./styles.css";

export default function SearchBar(props) {
  const [content, setContent] = useState("");

  return (
    <div className="search-bar">
      <form onSubmit={e => { e.preventDefault(); }}>
          <input
            placeholder="Search..." 
            autoFocus type="text"  
            onKeyPress={e =>{
              if(e.charCode==13){
                props.findCard(content);    
              }
            }}
            onChange={e => setContent(e.target.value)}
            />
        <Button onClick={() => props.findCard(content)}>Add</Button>
      </form>
    </div>
  );
}