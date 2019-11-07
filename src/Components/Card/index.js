import React, { useRef, useState, useEffect } from "react";
import "./styles.css";

export default function Card(props) {
  const [content, setContent] = useState("");

  return (
    <div className="card">
        <p>{props.card.name}</p>
        <div className="card-options">
            <button>-</button>
            <button>+</button>
            <button>SideBoard</button>
        </div>
    </div>
  );
}