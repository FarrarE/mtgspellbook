import React, { useRef, useState } from "react";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoadingSpinner from "../Components/LoadingSpinner";
import { API } from "aws-amplify";
import "./ViewDeck.css";

export default function ViewDeck(props) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }


  async function handleSubmit(event) {
    event.preventDefault();
  
  
    setIsLoading(true);
  
    try {
      await createDeck({ content });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createDeck(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            value={content}
            componentClass="textarea"
            onChange={e => setContent(e.target.value)}
          />
        </FormGroup>
        <LoadingSpinner
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create
        </LoadingSpinner>
      </form>
    </div>
  );
}