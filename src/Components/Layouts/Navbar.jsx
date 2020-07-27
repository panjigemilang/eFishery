import React from "react"
import IndexContext from "../Context"
import styled from "styled-components"

const StickyNav = styled.nav`
  background-color: white;
  color: var(--light-primary);
  display: flex;
  position: sticky;

  ul {
    list-style: none;
    width: 100%;

    div.burger-menu {
      display: none;
      height: 50px;
      float: left;
      margin: 0px;
      position: relative;
      width: 45px;

      span {
        background: #bfbdc4;
        border-radius: 9px;
        display: block;
        height: 5px;
        left: 5px;
        opacity: 1;
        position: absolute;
        width: 80%;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.25s ease-in-out;
        -moz-transition: 0.25s ease-in-out;
        -o-transition: 0.25s ease-in-out;
        transition: 0.25s ease-in-out;

        &:nth-child(1) {
          top: ${({ show }) => (show ? "23px" : "13px")};
          -webkit-transform: ${({ show }) =>
            show ? "rotate(135deg)" : "rotate(0deg)"};
          -moz-transform: ${({ show }) =>
            show ? "rotate(135deg)" : "rotate(0deg)"};
          -o-transform: ${({ show }) =>
            show ? "rotate(135deg)" : "rotate(0deg)"};
          transform: ${({ show }) =>
            show ? "rotate(135deg)" : "rotate(0deg)"};
        }

        &:nth-child(2) {
          top: 23px;
          opacity: ${({ show }) => (show ? 0 : 1)};
          left: ${({ show }) => (show ? "-60px" : "5px")};
        }

        &:nth-child(3) {
          top: ${({ show }) => (show ? "23px" : "33px")};
          -webkit-transform: ${({ show }) =>
            show ? "rotate(-135deg)" : "rotate(0deg)"};
          -moz-transform: ${({ show }) =>
            show ? "rotate(-135deg)" : "rotate(0deg)"};
          -o-transform: ${({ show }) =>
            show ? "rotate(-135deg)" : "rotate(0deg)"};
          transform: ${({ show }) =>
            show ? "rotate(-135deg)" : "rotate(0deg)"};
        }
      }
    }

    div.dropdown-menu {
      background-color: var(--light-secondary);
      color: black;
      font-weight: 700;
      height: 100vh;
      left: 0;
      top: 9vh;
      opacity: ${({ show }) => (show ? 1 : 0)};
      position: absolute;
      visibility: ${({ show }) => (show ? "visible" : "hidden")};
      width: 100%;
      z-index: 9999;
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;

      li {
        padding: 0 1.5em;

        &:first-child {
          margin: 3vh 0 0;

          img {
            width: 7em;
          }
        }

        &.active {
          background-color: var(--light-background);
        }
      }
    }

    img {
      border-radius: 50%;
      margin-right: 7vw;
      width: 1.5em;
    }

    div.profile {
      display: flex;
      float: right;

      li {
        display: inline;
        margin-right: 2vw;

        &:first-child {
          margin-right: 1vw;
        }
      }
    }
  }

  @media screen and (max-width: 958px) {
    div.burger-menu {
      display: block !important;
    }

    ul {
      line-height: 50px;
      margin: 0.3em;
      padding: 0 15px;
    }

    div.profile {
      display: none !important;
    }
  }
`

const Nav = styled.nav`
  color: white;
  display: flex;
  height: 100%;
  flex-direction: column;
  left: 0;
  top: 0;
  position: fixed;

  ul {
    background-color: var(--light-primary);
    height: 100vh;
    list-style: none;
    margin: 0;
    padding: 20px 0;
    width: 15vw;

    li {
      height: 70px;
      padding: 0 15px;
      transition: all 200ms ease-in-out;
      -o-transition: all 200ms ease-in-out;
      -moz-transition: all 200ms ease-in-out;
      -webkit-transition: all 200ms ease-in-out;

      &.active {
        background-color: var(--light-secondary);
      }

      h1,
      p {
        margin: 0;
      }

      &:not(:first-child) {
        cursor: pointer;
        line-height: 70px;
        white-space: nowrap;

        &:hover {
          background-color: var(--light-secondary);
        }
      }
    }
  }

  @media screen and (max-width: 958px) {
    display: none;
  }
`

export default function Navbar() {
  const context = React.useContext(IndexContext)
  const profilePicture = require("../Assets/Img/default.jpg")

  return (
    <>
      <StickyNav show={context.showNav}>
        <ul>
          <div className="burger-menu" onClick={() => context.toggleNav()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="dropdown-menu">
            <li>
              <img src={profilePicture} alt="profile_picture.jpg" />
            </li>
            <li>Panji</li>
            <li className={context.active === 1 ? "active" : null}>Home</li>
          </div>
          <div className="profile">
            <li>Panji</li>
            <li>
              <img src={profilePicture} alt="profile_picture.jpg" />
            </li>
          </div>
        </ul>
      </StickyNav>
      <Nav>
        <ul>
          <li>
            <h1>eFishery</h1>
            <p>The Smartest Fish Feeders</p>
          </li>
          <li className={context.active === 1 ? "active" : null}>List</li>
        </ul>
      </Nav>
    </>
  )
}
