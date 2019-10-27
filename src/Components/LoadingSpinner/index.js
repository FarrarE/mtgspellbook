import React from "react";
import { Button, Spinner } from "reactstrap";
import "./styles.css";

export default function LoadingSpinner({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoadingSpinner ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner className="spinner" color="light" />}
      {props.children}
    </Button>
  );
}