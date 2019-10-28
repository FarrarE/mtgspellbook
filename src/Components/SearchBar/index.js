import React from "react";
import { FormGroup, FormControl } from "react-bootstrap";
import "./styles.css";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <form >
        <FormGroup controlId="card-name">
          <FormControl placeholder="Search..." autoFocus type="text" />
        </FormGroup>
      </form>
    </div>
  );
}