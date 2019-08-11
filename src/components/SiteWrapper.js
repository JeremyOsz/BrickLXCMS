import React from "react";
import styled from "styled-components";

const SiteWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans&display=swap");
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .content h1,
  .content h2,
  .content h3,
  .content h4,
  .content h5,
  .content h6 {
    font-family: "Amatic SC", Arial, Helvetica, sans-serif;
    color: #fff;
  }
  .content,
  .label {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
    color: #fff;
  }

  min-height: 100vh;
  background-color: #000;
  color: #fff;

  .navbar {
    background: #000;
    color: #fff;
    @media (max-width: 1025px) {
      position: fixed;
      width: 100%;
    }
    &-start {
      @media (min-width: 1025px) {
        position: fixed;
        height: 100vh;
        justify-content: center;
        margin-right: auto;
        flex-direction: column;
        width: 180px;
        padding: 5rem 0;
        font-size: 1.75rem;
      }
      @media (max-width: 1024px) {
        margin-bottom: 6rem;
        font-size: 2.25rem;
      }
    }
    &-menu.is-active {
      display: flex;
      height: -webkit-fill-available;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #383838f5;
      position: fixed;
      width: 100%;
    }
    &-burger {
      color: #fff;
      zoom: 1.5;
      span {
        height: 2px;
      }
    }
    &-item {
      font-family: "Amatic SC", "Lucida Sans", "Lucida Sans Regular",
        "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;

      font-size: inherit;
      font-weight: 600;
      color: #fff;
      text-align: center;
      :hover {
        color: red;
      }
      img {
        max-height: 100%;
        max-width: 100%;

        height: 45px;
        padding-left: 5px;

        @media (min-width: 1025px) {
          width: 75%;
          height: auto;
          padding-left: 0;
        }
      }
    }
  }
  @media screen and (min-width: 1023px) {
    display: flex;

    > div {
      flex: auto;
    }
    .navbar-menu {
      background: #000;
    }
    .navbar .navbar-menu {
      min-width: 180px;
      border-right: 2px solid grey;
    }
    .navbar-item {
      display: flex;
      flex: auto;
      color: inherit;

      text-align: center;
      justify-content: center;
      :hover {
        color: red;
      }
      img {
        max-height: 100%;
        max-width: 100%;
        width: 75%;
        height: auto;
      }
    }
  }
`;

export default SiteWrapper;
