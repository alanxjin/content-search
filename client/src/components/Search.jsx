import React from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import "./Search.css";

const Search = ({ inputOnChange, buttonOnClick }) => {
  return (
    <InputGroup className="search">
      <FormControl
        className="search__bar"
        placeholder="Input keywords ..."
        onKeyPress={(event) => {
          // On Enter
          if (event.charCode === 13) {
            buttonOnClick();
          }
        }}
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
