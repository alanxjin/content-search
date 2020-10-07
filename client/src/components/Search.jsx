import React, { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import "./Search.css";

const Search = ({ keyword, inputOnChange, buttonOnClick }) => {
  return (
    <InputGroup className="search">
      <FormControl
        className="search__bar"
        placeholder="Input keywords ..."
        onChange={(event) => {
          inputOnChange(event.target.value);
        }}
      />
      <InputGroup.Append>
        <Button
          className="search__button"
          variant="outline-primary"
          onClick={buttonOnClick}
        >
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Search;
