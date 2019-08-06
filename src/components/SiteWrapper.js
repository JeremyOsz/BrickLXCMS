import React from "react";
import styled from "styled-components";

const SiteWrapper = styled.div`
  @media screen and (min-width: 1023px) {
    display: flex;
    .navbar-start {
      position: fixed;
      height: 100vh;
      justify-content: center;
      margin-right: auto;
      /* display: flex; */
      flex-direction: column;
      width: 100px;
      left: 3rem;
    }
    .navbar-menu {
      min-width: 220px;
    }
  }
`;

export default SiteWrapper;
