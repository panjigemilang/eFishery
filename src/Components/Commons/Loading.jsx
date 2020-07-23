import React from "react"
import styled from "styled-components"

const Loader = styled.div`
  position: ${({ position }) => (position ? position : "fixed")};
  z-index: 50;
  top: 0;
  display: flex;
  width: 100%;
  height: ${({ height }) => (height ? height : "100%")};
  background: url("https://subtlepatterns.com/patterns/geometry2.png");
  justify-content: center;
  align-items: center;
`

export default function Loading({ height, position }) {
  return (
    <Loader height={height} position={position}>
      <img src={require("./Spinner.gif")} alt="loading.gif" />
      &nbsp;&nbsp;&nbsp;
    </Loader>
  )
}
