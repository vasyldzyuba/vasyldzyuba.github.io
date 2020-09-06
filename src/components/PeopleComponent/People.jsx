import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";


export function People() {
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  function getSearchResults() {
    const results = !searchTerm
      ? people
      : people.filter(person =>
        person.name.toString().toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
    setPeople(results);
  }

  useEffect(() => {
    !searchTerm ? axios.get('https://swapi.dev/api/people/')
      .then((res) => {
        setPeople(res.data.results);
      }) : getSearchResults();
  }, [setPeople, searchTerm]);



  const toPerson = useCallback((person, index) => <PersonListItem name={person.name} id={index + 1} />);

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <div>{people.map(toPerson)}</div>
    </div>
  );
}
const Wrapper = styled.div`
  padding: 10px;
  cursor: pointer;
  color: black;
  &:hover {
    background-color: skyblue;
    color: white;
  }
`;


function PersonListItem({ name, id }) {
  return (
    <Link to={`/${id}`} key={id}>
      <Wrapper>{name}</Wrapper>
    </Link>
  );
}