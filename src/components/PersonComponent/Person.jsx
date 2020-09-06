import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import { Films } from '../FilmsComponent/Films';

export function Person(props) {
  const [person, setPerson] = useState();
  const [filmLinks, setfilmLinks] = useState([]);
  let { personId } = useParams();

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/${personId}/`)
      .then((res) => {
        setPerson(res.data);
        setfilmLinks(res.data.films);
      });
  }, [setPerson, setfilmLinks]);

  if (!person) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <Link to="/">Back</Link>
      <div>name: {person.name}</div>
      <div>gender: {person.gender}</div>
      <div>height: {person.height}</div>
      <div>hair: {person.hair_color}</div>
      <Films filmLinks={filmLinks} />
    </div>
  );
}
