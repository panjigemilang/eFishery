import React from "react"
import { useAddList } from "../Reducer"
import { Container } from "../Commons/StyledComponents"
import styled from "styled-components"

const App = styled.div`
  margin-left: 15vw;
  position: relative;

  .container {
    margin-top: 5vh;
  }

  .back-button {
    position: absolute;
  }

  form {
    background-color: white;
    border-radius: 13px;
    display: flex;
    padding: 1em 2em;
    flex-direction: column;

    div.field-container {
      display: flex;

      label {
        font-size: 1.28em;
      }

      ul {
        width: 100%;

        input {
          background-color: #ddd;
          border: 0;
          border-radius: 13px;
          height: 50px;
          font-size: 1.5em;
          margin-top: 15px;
          padding: 0 15px;
          width: 90%;

          &:focus {
            background-color: #f0f0f0;
            border: 1px solid var(--light-text-secondary);
            border-radius: 13px;
            outline: none;
          }
        }
      }

      &:first-child {
        input {
          width: 43%;
        }
      }

      ul:not(:first-child) {
        margin: auto;
      }
    }

    .button-container {
      button {
        background-color: var(--light-primary);
        color: #fff;
        float: right;
        font-size: 1.1em;
        height: 50px;
        margin: 15px;
        width: 100px;
      }
    }
  }
`

export default function AddList() {
  const [komoditas, setKomoditas] = React.useState("")
  const [areaKota, setAreaKota] = React.useState("")
  const [areaProvinsi, setAreaProvinsi] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [tglParsed, setTglParsed] = React.useState("")
  const [submit, setSubmit] = React.useState(false)
  const { loading, list, errors } = useAddList(
    [
      {
        komoditas,
        areaKota,
        areaProvinsi,
        price,
        tglParsed,
      },
    ],
    submit
  )

  return (
    <App>
      <button className="back-button">Back button</button>
      <Container className="container">
        <h1>Tambah Data</h1>
        <form>
          <div className="field-container">
            <ul>
              <label>Komoditas</label>
              <br />
              <input
                type="text"
                onChange={(e) => setKomoditas(e.target.value)}
                placeholder="Masukkan komoditas"
                required
                value={komoditas}
              />
            </ul>
          </div>
          <div className="field-container">
            <ul>
              <label>Area Kota</label>
              <br />
              <input
                type="text"
                onChange={(e) => setAreaKota(e.target.value)}
                placeholder="Masukkan area kota"
                required
                value={areaKota}
              />
            </ul>
            <ul>
              <label>Area Provinsi</label>
              <br />
              <input
                type="text"
                onChange={(e) => setAreaProvinsi(e.target.value)}
                placeholder="Masukkan area provinsi"
                required
                value={areaProvinsi}
              />
            </ul>
          </div>
          <div className="field-container">
            <ul>
              <label>Harga</label>
              <br />
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Masukkan harga"
                required
                value={price}
              />
            </ul>
            <ul>
              <label>Tanggal</label>
              <br />
              <input
                type="date"
                onChange={(e) => setTglParsed(e.target.value)}
                placeholder="Masukkan tanggal"
                required
                value={tglParsed}
              />
            </ul>
          </div>
          <div className="button-container">
            <button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault()
                setSubmit(!submit)
              }}
              type="submit"
            >
              Submit
              {loading && (
                <>
                  <i className="fas fa-spinner fa-spin"></i>&nbsp;
                </>
              )}
            </button>
          </div>
        </form>
      </Container>
    </App>
  )
}