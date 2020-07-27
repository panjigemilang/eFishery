import React from "react"
import styled from "styled-components"

const DropdownContainer = styled.div`
  margin-left: 15px;
  position: relative;

  button.filter {
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? "gainsboro" : "inherit"};
    height: 100%;
    margin-left: 15px;
    width: 85px;

    &:focus {
      border: 1px solid gray;
    }
  }

  .dropdown-filter {
    background-color: #fff;
    box-shadow: 12px 15px 30px -7px var(--light-secondary);
    border-radius: 5px;
    display: ${({ display }) => (display ? "flex" : "none")};
    flex-direction: column;
    margin-left: 15px;
    min-width: 158px;
    padding: 1.4em 0;
    position: absolute;
    z-index: 99;

    input,
    input:focus {
      border-radius: 5px;
    }

    input,
    select {
      height: 25px;
      margin: 10px 15px;
      padding-left: 15px;
      width: auto;
    }

    input {
      background-color: #dddddd;
      border: none;

      &:focus {
        background-color: #ddf3ef;
        border: 1px solid rgba(123, 198, 183, 0.5);
        outline: none;
      }

      &.komoditas {
        display: ${({ komoditas }) => (komoditas ? "block" : "none")};
      }

      &.area-kota {
        display: ${({ areaKota }) => (areaKota ? "block" : "none")};
      }

      &.area-provinsi {
        display: ${({ areaProvinsi }) => (areaProvinsi ? "block" : "none")};
      }

      &.price {
        display: ${({ price }) => (price ? "block" : "none")};
      }

      &.tgl-parsed {
        display: ${({ tglParsed }) => (tglParsed ? "block" : "none")};
      }
    }

    select {
      display: ${({ price }) => (price ? "block" : "none")};
      margin: 4px 15px;
    }

    a {
      cursor: pointer;
      line-height: 3em;
      height: 3em;
      padding: 0 15px;

      &:hover {
        background-color: var(--light-primary);
        color: #fff;
      }
    }

    h3 {
      margin: 0;
      padding: 0 15px;
    }

    hr {
      background-color: var(--light-primary);
      border: 0;
      color: var(--light-primary);
      height: 0.04em;
      margin: 10px auto 5px;
      width: 90%;
    }
  }

  @media screen and (max-width: 600px) {
    display: inline;
    margin-top: 15px;

    .dropdown-filter {
      right: auto;
    }
  }
`

export default function Filter({
  dropdown,
  lists,
  filter,
  setFilter,
  setData,
}) {
  const [komoditas, setKomoditas] = React.useState("")
  const [areaKota, setAreaKota] = React.useState("")
  const [areaProvinsi, setAreaProvinsi] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [priceCondition, setPriceCondition] = React.useState("")
  const [tglParsed, setTglParsed] = React.useState("")
  const [showKomoditas, setShowKomoditas] = React.useState(false)
  const [showAreaKota, setShowAreaKota] = React.useState(false)
  const [showAreaProvinsi, setShowAreaProvinsi] = React.useState(false)
  const [showPrice, setShowPrice] = React.useState(false)
  const [showTglParsed, setShowTglParsed] = React.useState(false)

  // Filter function
  React.useEffect(() => {
    if (!komoditas && !areaKota && !areaProvinsi && !price && !tglParsed) {
      return setData([...lists])
    }

    let temp = [...lists]

    let items = temp.filter((item) => {
      return (
        item["komoditas"] !== null &&
        item["area_kota"] !== null &&
        item["area_provinsi"] !== null &&
        item["price"] !== null &&
        item["tgl_parsed"] !== null &&
        item["komoditas"].toLowerCase().includes(komoditas.toLowerCase()) &&
        item["area_kota"].toLowerCase().includes(areaKota.toLowerCase()) &&
        item["area_provinsi"]
          .toLowerCase()
          .includes(areaProvinsi.toLowerCase()) &&
        (priceCondition
          ? priceCondition === "more"
            ? parseInt(item["price"]) > parseInt(price)
            : parseInt(item["price"]) < parseInt(price)
          : item["price"].toLowerCase().includes(price.toLowerCase())) &&
        item["tgl_parsed"].toLowerCase().includes(tglParsed.toLowerCase())
      )
    })

    setData([...items])
  }, [komoditas, areaKota, areaProvinsi, price, tglParsed])

  // trigger when either filter or dropdown was true
  React.useEffect(() => {
    if (dropdown && filter) setFilter(!filter)
  }, [dropdown])

  return (
    <DropdownContainer
      backgroundColor={filter}
      display={filter}
      komoditas={showKomoditas}
      areaKota={showAreaKota}
      areaProvinsi={showAreaProvinsi}
      price={showPrice}
      tglParsed={showTglParsed}
    >
      <button className="filter" onClick={() => setFilter(!filter)}>
        <i className="fas fa-filter"></i>
        &ensp;Filter
      </button>
      <div className="dropdown-filter">
        <h3>PENGATURAN</h3>
        <hr />
        <a onClick={() => setShowKomoditas(!showKomoditas)} role="button">
          komoditas
        </a>
        <input
          className="komoditas"
          onChange={(e) => setKomoditas(e.target.value)}
          placeholder="Masukkan data komoditas"
          type="text"
          value={komoditas}
        />
        <a onClick={() => setShowAreaKota(!showAreaKota)} role="button">
          area kota
        </a>
        <input
          className="area-kota"
          onChange={(e) => setAreaKota(e.target.value)}
          placeholder="Masukkan data area kota"
          type="text"
          value={areaKota}
        />
        <a onClick={() => setShowAreaProvinsi(!showAreaProvinsi)} role="button">
          area provinsi
        </a>
        <input
          className="area-provinsi"
          onChange={(e) => setAreaProvinsi(e.target.value)}
          placeholder="Masukkan data area provinsi"
          type="text"
          value={areaProvinsi}
        />
        <a onClick={() => setShowPrice(!showPrice)} role="button">
          harga
        </a>
        <select
          onChange={(e) => setPriceCondition(e.target.value)}
          value={priceCondition}
        >
          <option value="">Sama</option>
          <option value="more">Lebih dari</option>
          <option value="less">Kurang dari</option>
        </select>
        <input
          className="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Masukkan harga"
          type="text"
          value={price}
        />
        <a onClick={() => setShowTglParsed(!showTglParsed)} role="button">
          tanggal
        </a>
        <input
          className="tgl-parsed"
          onChange={(e) => setTglParsed(e.target.value)}
          placeholder="Masukkan tanggal"
          type="text"
          value={tglParsed}
        />
      </div>
    </DropdownContainer>
  )
}
