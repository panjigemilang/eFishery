import React from "react"
import { usePantat } from "../Reducer"
import Loading from "../Commons/Loading"
import { Container } from "../Commons/StyledComponents"

export default function Home() {
  const [params, setParams] = React.useState({})
  const [page, setPage] = React.useState(1)
  const { jobs, loading, errors } = usePantat(params, page)

  return (
    <div>
      {loading && <Loading />}
      <Container>
        {Object.keys(errors).length !== 0 && <h1>Error coyy</h1>}
        {!loading && (
          <>
            <h1>Home</h1>
            <p>Berikut adalah jumlah fishes yang tersedia :</p>
            <h2>{jobs.length}</h2>
          </>
        )}
      </Container>
    </div>
  )
}
