import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import Loading from "./Components/Commons/Loading"
import Navbar from "./Components/Layouts/Navbar"
import AddList from "./Components/Pages/AddList"

// Lazy Components
const Home = React.lazy(() => import("./Components/Pages/Home"))

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <React.Suspense fallback={<Loading />}>
          <Route exact path="/" component={Home} />
        </React.Suspense>
        <Route exact path="/add" component={AddList} />
      </Router>
    </>
  )
}

export default App
