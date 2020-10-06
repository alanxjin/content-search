import React, { useState, useEffect } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import "./Search.css";

const Search = () => {
  return (
    <InputGroup className="search">
      <FormControl className="search__bar" placeholder="Input keywords ..." />
      <InputGroup.Append>
        <Button className="search__button" variant="outline-primary">
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default Search;
