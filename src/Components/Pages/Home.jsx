import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import moment from "moment"
import ListsMobile from "./ListsMobile"
import IndexContext from "../Context"
import { useFetchList } from "../Reducer"
import Loading from "../Commons/Loading"
import Pagination from "../Commons/Pagination"
import { Container } from "../Commons/StyledComponents"
import Search from "../Features/Search"
import Filter from "../Features/Filter"

const App = styled.div`
  margin-left: 15vw;
  filter: ${({ navShow }) => (navShow ? "blur(5px)" : null)};
  opacity: ${({ navShow }) => (navShow ? 0.3 : 1)};
  overflow: ${({ navShow }) => (navShow ? "hidden" : "visible")};

  .header-container {
    display: flex;

    div {
      width: 100%;
    }

    h1 {
      color: var(--light-text-primary);
    }
  }

  .content-container {
    background-color: #fff;
    border-radius: 13px;
    position: relative;

    .feature-container {
      color: var(--light-primary);
      display: flex;
      height: 50px;
      padding: 1.3em 2em;
      width: calc(100% - 65px);
      z-index: 99;

      a {
        &.add {
          margin-left: auto;
        }

        button.add {
          background-color: var(--light-primary);
          border: none;
          color: white;
          height: 100%;
          padding: 0 15px;

          &:focus {
            border: 1px solid #01e98d;
          }
        }
      }
    }
  }

  .mobile-feature-container,
  .mobile-list {
    display: none;
  }

  @media screen and (max-width: 958px) {
    margin-left: 0;
  }

  @media screen and (max-width: 758px) {
    .container {
      width: auto;
    }

    .pagination {
      display: none;
    }

    .content-container {
      background-color: transparent;
    }

    .feature-container {
      background-color: maroon;
      bottom: 0;
      display: none !important;
      left: 0;
      position: fixed;
    }

    .mobile-feature-container {
      display: block;

      button.add {
        background-color: var(--light-secondary);
        border: 0;
        border-radius: 50%;
        bottom: 15px;
        color: white;
        font-size: 4em;
        height: 0.8em;
        line-height: 50px;
        position: fixed;
        right: 15px;
        z-index: 99;
      }
    }

    .mobile-list {
      display: block;
    }
  }
`

const Table = styled.table`
  background-color: #fff;
  border-spacing: 0;
  border-radius: 13px;
  color: var(--light-text-primary);
  width: 100%;

  tr,
  th,
  td {
    border: 1px solid #f4fbfa;
  }

  tr:first-child {
    th:first-child {
      color: var(--light-text-secondary);
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
      color: var(--light-text-secondary);
      text-align: center;
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export default function Home() {
  const context = React.useContext(IndexContext)
  const [data, setData] = React.useState([])
  const [order, setOrder] = React.useState("asc")
  const [page, setPage] = React.useState(1)
  const [postPerPage, setPostPerPage] = React.useState(8)
  const [searchType, setSearchType] = React.useState("harga")
  const [dropdown, setDropdown] = React.useState(false)
  const [filter, setFilter] = React.useState(false)
  const { lists, loading, errors } = useFetchList()

  // set Data from props
  React.useEffect(() => {
    setData([...lists])
  }, [lists])

  // get current posts
  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost)

  // paginate function
  const paginate = (pageNumber) => {
    window.scrollTo(0, 0)
    setPage(pageNumber)
  }

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

  return (
    <App navShow={context.showNav}>
      {loading && <Loading />}
      <Container className="container">
        {Object.keys(errors).length !== 0 && <h1>Error coyy</h1>}
        {!loading && (
          <>
            <div className="header-container">
              <h1>List</h1>
              <div className="pagination">
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
                <Search
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  filter={filter}
                  setFilter={setFilter}
                  lists={lists}
                  setData={setData}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />
                <Filter
                  dropdown={dropdown}
                  lists={lists}
                  filter={filter}
                  setFilter={setFilter}
                  setData={setData}
                />
                <Link className="add" to="/add">
                  <button className="add">
                    <i className="fas fa-plus"></i>
                    &ensp;Tambah data baru
                  </button>
                </Link>
              </div>
              <div className="mobile-feature-container">
                <Search
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  filter={filter}
                  setFilter={setFilter}
                  lists={lists}
                  setData={setData}
                  searchType={searchType}
                  setSearchType={setSearchType}
                />

                <Filter
                  dropdown={dropdown}
                  lists={lists}
                  filter={filter}
                  setFilter={setFilter}
                  setData={setData}
                />
                <Link className="add" to="/add">
                  <button className="add">+</button>
                </Link>
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
                    <tr>
                      <td colSpan="5">
                        <h3>data tidak ditemukan ...</h3>
                      </td>
                    </tr>
                  ) : (
                    currentPost.map((items, i) => {
                      return (
                        <tr key={i}>
                          <td>{currentPost.length * (page - 1) + i + 1}</td>
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
              <div className="mobile-list">
                <ListsMobile currentPost={currentPost} currentPage={page} />
                <Pagination
                  currentPage={page}
                  paginate={paginate}
                  postPerPage={postPerPage}
                  totalPosts={data.length}
                />
              </div>
            </div>
          </>
        )}
      </Container>
    </App>
  )
}
