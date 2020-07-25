import React from "react"
import styled from "styled-components"
import { useFetchList } from "../Reducer"
import Loading from "../Commons/Loading"
import Pagination from "../Commons/Pagination"
import { Container } from "../Commons/StyledComponents"

const App = styled.div`
  margin-left: 15vw;

  .feature-container {
    display: flex;

    div {
      width: 100%;
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
    border-top-left-radius: 13px;

    th:first-child {
      border-top-left-radius: 13px;
      text-align: center;
    }

    th:last-child {
      border-top-right-radius: 13px;
    }
  }

  tr:last-child {
    td:first-child {
      border-bottom-left-radius: 13px;
    }

    td:last-child {
      border-bottom-right-radius: 13px;
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
  const { lists, loading, errors } = useFetchList()

  React.useEffect(() => {
    setData([...lists])
  }, [lists])

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

  return (
    <App>
      {loading && <Loading />}
      <Container>
        {Object.keys(errors).length !== 0 && <h1>Error coyy</h1>}
        {!loading && (
          <>
            <div className="feature-container">
              <h1>Home</h1>
              <div>
                <Pagination
                  currentPage={page}
                  paginate={paginate}
                  postPerPage={postPerPage}
                  totalPosts={data.length}
                />
              </div>
            </div>
            <Table>
              <thead>
                <tr>
                  <th width="8%">No &emsp;</th>
                  <th onClick={() => sorting("price", order)}>
                    Price &emsp;
                    {order === "asc" ? (
                      <i className="fas fa-sort-amount-up"></i>
                    ) : (
                      <i className="fas fa-sort-amount-down"></i>
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
                </tr>
              </thead>
              <tbody>
                {currentPost.map((items, i) => {
                  // if (items.uuid === null) return null
                  // else
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>{items.price}</td>
                      <td>{items.area_kota}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </App>
  )
}
