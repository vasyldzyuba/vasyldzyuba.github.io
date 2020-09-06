import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export function Films ({filmLinks}){
    const [films, setFilms] = useState([]);
    useEffect(() => {
      Promise.all(
           filmLinks.map(async (link) => {
            const response = await axios.get(link);
            return response.data;
          })
      ).then((result)=> setFilms(result));
     
    }, [filmLinks]);
 

const toFilm = useCallback((films, index) => <FilmsListItem title={films.title} id={index + 1} />);

    return (
      <div>
        <span>Films: </span>
        <div>{films.map(toFilm)}</div>
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

function FilmsListItem ({title, id}) {
    return (
      <Link to={`/${id}`} key={id}>
        <Wrapper>{title}</Wrapper>
      </Link>
    );
  }