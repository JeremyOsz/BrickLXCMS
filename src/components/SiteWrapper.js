import React from "react";
import styled from "styled-components";

const SiteWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans&display=swap");

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Amatic SC", Arial, Helvetica, sans-serif;
  }
  body {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }

  @media screen and (min-width: 1023px) {
    display: flex;
    background-color: #000;
    color: #fff;
    .navbar-menu {
      background: #000;
    }
    .navbar-start {
      position: fixed;
      height: 100vh;
      justify-content: center;
      margin-right: auto;
      flex-direction: column;
      width: 100px;
      left: 3rem;
      padding: 5rem auto;
      font-family: "Amatic SC", "Lucida Sans", "Lucida Sans Regular",
        "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
      font-size: 1.75rem;
      font-weight: 600;
      color: #fff;
    }
    .navbar-menu {
      min-width: 220px;
    }
    .navbar-item {
      display: flex;
      flex: auto;
      color: inherit;
      :hover {
        color: red;
      }
    }
  }
`;

export default SiteWrapper;
