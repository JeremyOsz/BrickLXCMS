import React from "react";
import styled from "styled-components";

const SiteWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Amatic+SC|Open+Sans&display=swap");

  min-height: 100vh;
  background-color: #000;
  color: #fff;
  .column.is-10 {
    margin: auto;
  }
  .button.is-link {
    background-color: #ff0000ad;
    border-color: transparent;
    color: #fff;
    font-family: "Amatic SC", "Lucida Sans", "Lucida Sans Regular",
      "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
    padding: 10px 29px;
    line-height: 1;
    height: auto;
  }
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
      @media (max-width: 1023px) {
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
      &.active,
      &:active {
        color: red;
        background: transparent;
      }
      :hover {
        /* color: red; */
        background: transparent;
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
    .navbar > .container .navbar-menu {
      margin-right: 0;
    }
    .navbar-item {
      display: flex;
      flex: auto;
      color: inherit;
      text-align: center;
      justify-content: center;
      padding-right: 0;
      :after {
        position: absolute;
        margin-top: 0.75em;
        content: " ";
        border-bottom: 1px solid white;
        width: 0%;
        transition: all 1s ease;
      }
      &.desktop:after {
        border-bottom: none;
      }
      :hover,
      :active {
        color: red;
        :after {
          width: 35%;
        }
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
