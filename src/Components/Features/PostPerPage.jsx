import React from "react"
import styled from "styled-components"

const Select = styled.select`
  margin: auto 15px auto auto;

  @media screen and (max-width: 768px) {
    margin: 15px 15px 0;
    padding: 4px 1px;
  }
`

export default function PostPerPage({ postPerPage, setPostPerPage }) {
  return (
    <Select
      className="post-per-page"
      onChange={(e) => setPostPerPage(e.target.value)}
      value={postPerPage}
    >
      <option value="8">8</option>
      <option value="16">16</option>
      <option value="24">24</option>
      <option value="50">50</option>
      <option value="75">75</option>
      <option value="100">100</option>
    </Select>
  )
}
