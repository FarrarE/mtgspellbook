import React, { useRef, useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import config from "../config";
import "./ViewDeck.css";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from '../Components/SearchBar';

export default function ViewDeck(props) {
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);
  }

  return (
    <div className="view-deck">
      <SearchBar />
      <form onSubmit={handleSubmit}>
        <LoadingSpinner
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Save
        </LoadingSpinner>
      </form>
    </div>
  );
}