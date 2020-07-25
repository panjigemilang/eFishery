import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import Loading from "./Components/Commons/Loading"
import Navbar from "./Components/Layouts/Navbar"

// Components
const Home = React.lazy(() => import("./Components/Pages/Home"))

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
      </Router>
    </React.Suspense>
  )
}

export default App
