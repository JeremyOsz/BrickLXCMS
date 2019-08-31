import React from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/900x900-Logo.png";
import logoMobile from "../img/1400x280-Logo.png";
import styled from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

const Logo = styled.img`
  &.logo-mobile {
    @media (min-width: ${size.laptop}) {
      display: none;
    }
  }
  &.logo-desktop {
    @media (max-width: ${size.laptop}) {
      display: none;
    }
  }
`;
const NavBarStyled = styled.nav`
  .navbar-item.desktop {
    @media (max-width: ${size.laptop}) {
      display: none;
    }
  }
`;
const Navbar = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      navBarActiveClass: ""
    };
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active"
            })
          : this.setState({
              navBarActiveClass: ""
            });
      }
    );
  };

  render() {
    return (
      <NavBarStyled
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            {/* Hamburger menu */}
            {typeof window !== "undefined" && window.innerWidth <= 1024 ? (
              <Link to="/" className="navbar-item" title="Logo">
                <Logo src={logoMobile} alt="BrickLX" className="logo-mobile" />
              </Link>
            ) : null}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about">
                About
              </Link>
              <Link className="navbar-item" to="/projects">
                Projects
              </Link>
              {typeof window !== "undefined" ? (
                <Link to="/" className="navbar-item desktop" title="Logo">
                  <Logo src={logo} alt="BrickLX" className="logo-desktop" />
                </Link>
              ) : null}

              <Link className="navbar-item" to="/blog">
                News
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </NavBarStyled>
    );
  }
};

export default Navbar;
