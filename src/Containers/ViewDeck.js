import React, { useRef, useState } from "react";
import { FormGroup, FormControl, FormLabel, Row, Col } from "react-bootstrap";
import { API } from "aws-amplify";
import config from "../config";
import "./ViewDeck.css";
import LoadingSpinner from "../Components/LoadingSpinner";
import SearchBar from '../Components/SearchBar';

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
    <div className="view-deck">
      <Row>
        <Col>
          <FormGroup controlId="content">
                <FormControl
                  className="deck-name"
                  value={content}
                  componentClass="textarea"
                  onChange={e => setContent(e.target.value)}
                  placeHolder="Deck Name..."
                />
            </FormGroup>
        </Col>
        <Col>      
          <SearchBar />
        </Col>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>

        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}