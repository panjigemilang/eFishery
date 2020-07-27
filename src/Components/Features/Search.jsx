import React from "react"
import styled from "styled-components"
import moment from "moment"

const SearchBox = styled.div`
  line-height: 47px;
  position: relative;

  input,
  input:focus {
    border-radius: 5px;
  }

  input {
    background-color: #dddddd;
    border: none;
    height: 25px;
    padding-left: 40px;
    width: 206px;

    &:focus {
      background-color: #ddf3ef;
      border: 1px solid rgba(123, 198, 183, 0.5);
      outline: none;
    }
  }

  i {
    left: 0;
    top: 8px;
    position: absolute;
    padding: 9px;
  }
`

const DropdownContainer = styled.div`
  margin-left: 15px;
  position: relative;

  button.search-type {
    background-color: ${({ dropdown }) => (dropdown ? "gainsboro" : "inherit")};
    height: 100%;
    width: 110px;

    &:focus {
      border: 1px solid gray;
    }
  }

  .dropdown-menu {
    background-color: #fff;
    box-shadow: 12px 15px 30px -7px var(--light-secondary);
    border-radius: 5px;
    display: ${({ dropdown }) => (dropdown ? "flex" : "none")};
    flex-direction: column;
    min-width: 158px;
    padding: 1.4em 0;
    position: absolute;
    z-index: 99;

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
  }

  @media screen and (max-width: 600px) {
    display: inline;
    margin-left: 0;
    margin-top: 15px;

    button.search-type {
      height: 50px;
      width: 85px;
    }
  }
`

export default function Search({
  dropdown,
  setDropdown,
  filter,
  setFilter,
  lists,
  setData,
  searchType,
  setSearchType,
}) {
  const [search, setSearch] = React.useState("")

  // search function
  React.useEffect(() => {
    if (!search) {
      return setData([...lists])
    }

    let items
    let temp = [...lists]
    let searchTemp = search
    let typeTemp = searchType

    switch (searchType) {
      case "harga":
        typeTemp = "price"
        break
      case "area kota":
        typeTemp = "area_kota"
        break
      case "area provinsi":
        typeTemp = "area_provinsi"
        break
      case "harga":
        typeTemp = "price"
        break
      case "tanggal":
        searchTemp = moment(searchTemp)
        typeTemp = "tgl_parsed"
        break
    }

    if (searchType !== "tanggal")
      items = temp.filter((item) => {
        return (
          item[typeTemp] !== null &&
          item[typeTemp].toLowerCase().includes(searchTemp.toLowerCase())
        )
      })
    else
      items = temp.filter((item) => {
        return (
          item[typeTemp] !== null &&
          moment(item[typeTemp])
            .format("MM/DD/YYYY")
            .includes(searchTemp.format("MM/DD/YYYY"))
        )
      })

    setData([...items])
  }, [search])

  // trigger dropdown when search type clicked
  React.useEffect(() => {
    if (dropdown && filter) setFilter(!filter)
    setDropdown(!dropdown)
    setSearch("")
  }, [searchType])

  React.useEffect(() => {
    if (dropdown && filter) setDropdown(!dropdown)
  }, [filter])

  const dynamicType = () => {
    switch (searchType) {
      case "harga" || "harga":
        return "number"
      case "tanggal":
        return "date"
      default:
        return "text"
    }
  }

  return (
    <>
      <SearchBox>
        <input
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Cari data berdasarkan ${searchType}`}
          type={dynamicType()}
          value={search}
        />
        <i className="fas fa-search"></i>
      </SearchBox>
      <DropdownContainer dropdown={dropdown}>
        <button className="search-type" onClick={() => setDropdown(!dropdown)}>
          {searchType}&ensp;
          <i className="fas fa-sort-down"></i>
        </button>
        <div className="dropdown-menu">
          <a onClick={() => setSearchType("komoditas")} role="button">
            komoditas
          </a>
          <a onClick={() => setSearchType("area kota")} role="button">
            area kota
          </a>
          <a onClick={() => setSearchType("area provinsi")} role="button">
            area provinsi
          </a>
          <a onClick={() => setSearchType("harga")} role="button">
            harga
          </a>
          <a onClick={() => setSearchType("tanggal")} role="button">
            tanggal
          </a>
        </div>
      </DropdownContainer>
    </>
  )
}
