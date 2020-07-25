import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  float: right;

  ul {
    display: -ms-flexbox;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;

    li {
      a {
        background-color: #fff;
        border-radius: 8px;
        color: var(--light-secondary);
        cursor: pointer;
        display: block;
        margin: 0 5px;
        line-height: 1.25;
        position: relative;
        padding: 0.5rem 0.75rem;

        &:hover {
          background-color: #e9ecef;
          border-color: var(--light-primary);
          color: var(--light-primary);
          text-decoration: none;
          z-index: 2;
        }

        &:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: 0;
          z-index: 3;
        }
      }

      &:first-child.arrow-left,
      &:last-child.arrow-right {
        a {
          background-color: transparent;
        }
      }
    }

    li.active {
      a {
        background-color: var(--light-primary);
        border-color: var(--light-primary);
        color: #fff;
        z-index: 3;
      }
    }
  }
`

export default function Pagination({
  currentPage,
  postPerPage,
  totalPosts,
  paginate,
}) {
  const [temp, setTemp] = React.useState(currentPage)
  const lengthOfPosts = Math.ceil(totalPosts / postPerPage)
  const pageNumbers = []
  const limitPage = 3

  for (let i = temp; i < temp + limitPage; i++) {
    if (i > lengthOfPosts) break
    pageNumbers.push(i)
  }

  return (
    <Nav>
      <ul>
        {temp - limitPage < 1 ? null : (
          <li className="arrow-left">
            <a onClick={() => setTemp(temp - limitPage)} role="button">
              <i className="fas fa-angle-left"></i>
            </a>
          </li>
        )}
        {pageNumbers.map((number) => {
          return (
            <li
              className={currentPage === number ? "active" : null}
              key={number}
            >
              <a onClick={() => paginate(number)} role="button">
                {number}
              </a>
            </li>
          )
        })}
        {temp + limitPage > lengthOfPosts ? null : (
          <li className="arrow-right">
            <a onClick={() => setTemp(temp + limitPage)} role="button">
              <i className="fas fa-angle-right"></i>
            </a>
          </li>
        )}
      </ul>
    </Nav>
  )
}
