import React from "react"
import styled from "styled-components"
import moment from "moment"
import { useFetchList } from "../Reducer"
import Loading from "../Commons/Loading"
import Pagination from "../Commons/Pagination"
import { Container } from "../Commons/StyledComponents"

const App = styled.div`
  margin-left: 15vw;

  .header-container {
    display: flex;

    div {
      width: 100%;
    }
  }

  .content-container {
    background-color: #fff;
    border-radius: 13px;

    .feature-container {
      color: var(--light-primary);
      display: flex;
      height: 50px;
      padding: 1.3em 2em;

      .search-box {
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
      }

      .dropdown-container {
        margin-left: 15px;
        position: relative;

        .dropdown-menu {
          background-color: #fff;
          box-shadow: 12px 15px 30px -7px var(--light-secondary);
          border-radius: 5px;
          display: ${({ dropdown }) => (dropdown ? "flex" : "none")};
          flex-direction: column;
          min-width: 158px;
          padding: 1.4em 0;
          position: absolute;

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
      }

      button.search-type,
      button.filter {
        &:focus {
          border: 1px solid gray;
        }
      }

      button.search-type {
        background-color: ${({ dropdown }) =>
          dropdown ? "gainsboro" : "inherit"};
        height: 100%;
        width: 110px;
      }

      button.filter {
        margin-left: 15px;
        width: 85px;
      }

      button.add {
        background-color: var(--light-primary);
        border: none;
        color: white;
        margin-left: auto;
        width: 150px;

        &:focus {
          border: 1px solid #01e98d;
        }
      }
    }
  }
`

const Table = styled.table`
  background-color: #fff;
  border-spacing: 0;
  border-radius: 13px;
  width: 100%;

  tr,
  th,
  td {
    border: 1px solid #f4fbfa;
  }

  tr:first-child {
    th:first-child {
      text-align: center;
    }
  }

  th {
    text-align: left;
    padding: 8px;

    &:not(:first-child) {
      cursor: pointer;

      :hover {
        background-color: var(--light-primary);
        color: #fff;
        transition: all 100ms ease-in-out;
        -o-transition: all 100ms ease-in-out;
        -moz-transition: all 100ms ease-in-out;
        -webkit-transition: all 100ms ease-in-out;
      }
    }
  }

  td {
    padding: 15px;
  }

  tbody {
    td:first-child {
      text-align: center;
    }
  }
`

export default function Home() {
  const [data, setData] = React.useState([])
  const [order, setOrder] = React.useState("asc")
  const [page, setPage] = React.useState(1)
  const [postPerPage, setPostPerPage] = React.useState(8)
  const [search, setSearch] = React.useState("")
  const [searchType, setSearchType] = React.useState("harga")
  const [dropdown, setDropdown] = React.useState(true)
  const { lists, loading, errors } = useFetchList()

  // set Data from props
  React.useEffect(() => {
    setData([...lists])
  }, [lists])

  // search function
  React.useEffect(() => {
    if (!search) {
      return setData([...lists])
    }

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
      case "ukuran":
        typeTemp = "size"
        break
      case "tanggal":
        typeTemp = "tgl_parsed"
        break
    }

    let temp = [...lists]

    let items = temp.filter((item) => {
      return (
        item[typeTemp] !== null &&
        item[typeTemp].toLowerCase().includes(search.toLowerCase())
      )
    })

    setData([...items])
  }, [search])

  // trigger dropdown when search type clicked
  React.useEffect(() => {
    setDropdown(!dropdown)
  }, [searchType])

  // get current posts
  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)

  // paginate function
  const paginate = (pageNumber) => setPage(pageNumber)

  const sorting = (key, order) => {
    let temp

    if (order === "asc") {
      setOrder("desc")
      temp = data.sort((nextVal, curVal) => {
        if (curVal[key] === null) return -1
        if (nextVal[key] === null) return 1
        if (isNaN(curVal[key]))
          return nextVal[key].toUpperCase() < curVal[key].toUpperCase() ? 1 : -1
        else return parseInt(nextVal[key]) < parseInt(curVal[key]) ? 1 : -1
      })
    } else {
      setOrder("asc")
      temp = data.sort((nextVal, curVal) => {
        if (curVal[key] === null) return -1
        if (nextVal[key] === null) return 1
        if (isNaN(curVal[key]))
          return nextVal[key].toUpperCase() > curVal[key].toUpperCase() ? 1 : -1
        else return parseInt(nextVal[key]) > parseInt(curVal[key]) ? 1 : -1
      })
    }

    setData([...temp])
  }

  const dynamicType = () => {
    switch (searchType) {
      case "harga" || "ukuran":
        return "number"
      case "tanggal":
        return "date"
      default:
        return "text"
    }
  }

  return (
    <App dropdown={dropdown}>
      {loading && <Loading />}
      <Container>
        {Object.keys(errors).length !== 0 && <h1>Error coyy</h1>}
        {!loading && (
          <>
            <div className="header-container">
              <h1>List</h1>
              <div>
                <Pagination
                  currentPage={page}
                  paginate={paginate}
                  postPerPage={postPerPage}
                  totalPosts={data.length}
                />
              </div>
            </div>
            <div className="content-container">
              <div className="feature-container">
                <div className="search-box">
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={`Cari data berdasarkan ${searchType}`}
                    type={dynamicType()}
                    value={search}
                  />
                  <i className="fas fa-search"></i>
                </div>
                <div className="dropdown-container">
                  <button
                    className="search-type"
                    onClick={() => setDropdown(!dropdown)}
                  >
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
                    <a
                      onClick={() => setSearchType("area provinsi")}
                      role="button"
                    >
                      area provinsi
                    </a>
                    <a onClick={() => setSearchType("ukuran")} role="button">
                      harga
                    </a>
                    <a onClick={() => setSearchType("tanggal")} role="button">
                      tanggal
                    </a>
                  </div>
                </div>
                <button className="filter">
                  <i className="fas fa-filter"></i>
                  &ensp;Filter
                </button>
                <button className="add">
                  <i className="fas fa-plus"></i>
                  &ensp;Tambah data baru
                </button>
              </div>
              <Table>
                <thead>
                  <tr>
                    <th width="8%">No &emsp;</th>
                    <th onClick={() => sorting("komoditas", order)}>
                      Komoditas &emsp;
                      {order === "asc" ? (
                        <i className="fas fa-sort-alpha-down"></i>
                      ) : (
                        <i className="fas fa-sort-alpha-up"></i>
                      )}
                    </th>
                    <th onClick={() => sorting("area_kota", order)}>
                      Area Kota &emsp;
                      {order === "asc" ? (
                        <i className="fas fa-sort-alpha-down"></i>
                      ) : (
                        <i className="fas fa-sort-alpha-up"></i>
                      )}
                    </th>
                    <th onClick={() => sorting("area_provinsi", order)}>
                      Area Provinsi &emsp;
                      {order === "asc" ? (
                        <i className="fas fa-sort-alpha-down"></i>
                      ) : (
                        <i className="fas fa-sort-alpha-up"></i>
                      )}
                    </th>
                    <th onClick={() => sorting("price", order)}>
                      Harga &emsp;
                      {order === "asc" ? (
                        <i className="fas fa-sort-amount-up"></i>
                      ) : (
                        <i className="fas fa-sort-amount-down"></i>
                      )}
                    </th>
                    <th onClick={() => sorting("tgl_parsed", order)}>
                      Tanggal dibuat &emsp;
                      {order === "asc" ? (
                        <i className="fas fa-sort-down"></i>
                      ) : (
                        <i className="fas fa-sort-up"></i>
                      )}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPost.length < 1 ? (
                    <h1>data tidak ditemukan ...</h1>
                  ) : (
                    currentPost.map((items, i) => {
                      console.log("Items legnth", items)
                      return (
                        <tr key={i}>
                          <td>{i}</td>
                          <td>
                            {items.komoditas === null ? "-" : items.komoditas}
                          </td>
                          <td>
                            {items.area_kota === null ? "-" : items.area_kota}
                          </td>
                          <td>
                            {items.area_provinsi === null
                              ? "-"
                              : items.area_provinsi}
                          </td>
                          <td>{items.price === null ? "-" : items.price}</td>
                          <td>
                            {items.tgl_parsed === null
                              ? "-"
                              : moment(items.tgl_parsed).calendar()}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </Container>
    </App>
  )
}
