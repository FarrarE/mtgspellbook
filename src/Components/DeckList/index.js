import React, { useEffect, useState } from "react";
import Card from '../Card';
import './styles.css';

export default function DeckList(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
      const temp = props.list;
      setList(temp);
  }, [props.list]);

  return (
    <div className="deck-list">
        {props.header === "Main Board" ? <h3>{props.header}</h3> : <h4>{props.header}</h4>}
        {list.map(card => <Card card={card} />)}
    </div>
  );
}