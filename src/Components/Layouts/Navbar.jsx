import React from "react"
import styled from "styled-components"

const StickyNav = styled.nav`
  background-color: white;
  color: var(--light-primary);
  display: flex;
  position: sticky;

  ul {
    list-style: none;
    width: 100%;

    div {
      float: right;

      li {
        display: inline;
        margin-right: 7vw;
      }
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
  position: absolute;

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
`

export default function Navbar() {
  return (
    <>
      <StickyNav>
        <ul>
          <div>
            <li>Nama</li>
            <li>Foto Profil</li>
          </div>
        </ul>
      </StickyNav>
      <Nav>
        <ul>
          <li>
            <h1>eFishery</h1>
            <p>The Smartest Fish Feeders</p>
          </li>
          <li>Home</li>
          <li>About</li>
        </ul>
      </Nav>
    </>
  )
}
