import React from "react"
import moment from "moment"
import styled from "styled-components"

const CardContainer = styled.div`
  background-color: white;
  border-radius: 13px;
  display: grid;
  grid-template-columns: 15% 36% auto;
  grid-template-rows: repeat(5, minmax(30px, auto));
  margin: 15px;
  padding: 10px;

  div {
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 0.9em;
    font-weight: 700;
    grid-row: 1 / span 5;
  }

  p {
    margin: 0;

    &:nth-child(even) {
      color: black;
      padding-left: 10px;
    }
  }

  h3 {
    grid-column: 1 / span 4;
    padding: 0 15px;
  }
`

export default function ListsMobile({ currentPage, currentPost }) {
  return (
    <>
      {currentPost.length < 1 ? (
        <CardContainer>
          <h3>Data tidak ditemukan ...</h3>
        </CardContainer>
      ) : (
        currentPost.map((items, i) => {
          return (
            <CardContainer key={i}>
              <div>{currentPost.length * (currentPage - 1) + i + 1}</div>
              <p>Komoditas</p>
              <p>{items.komoditas === null ? "-" : items.komoditas}</p>
              <p>Area Kota</p>
              <p>{items.area_kota === null ? "-" : items.area_kota}</p>
              <p>Area Provinsi</p>
              <p>{items.area_provinsi === null ? "-" : items.area_provinsi}</p>
              <p>Harga</p>
              <p>{items.price === null ? "-" : items.price}</p>
              <p>Tanggal</p>
              <p>
                {items.tgl_parsed === null
                  ? "-"
                  : moment(items.tgl_parsed).calendar()}
              </p>
            </CardContainer>
          )
        })
      )}
    </>
  )
}
