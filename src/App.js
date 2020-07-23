import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import Loading from "./Components/Commons/Loading"

// Components
const Home = React.lazy(() => import("./Components/Pages/Home"))

function App() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </React.Suspense>
  )
}

export default App
