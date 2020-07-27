import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "./App.css"
import IndexContext from "./Components/Context"

// Components
import Loading from "./Components/Commons/Loading"
import Navbar from "./Components/Layouts/Navbar"
import AddList from "./Components/Pages/AddList"

// Lazy Components
const Home = React.lazy(() => import("./Components/Pages/Home"))

function App() {
  const [active, setActive] = React.useState(1)
  const [showNav, setShowNav] = React.useState(false)

  const toggleActive = (val) => {
    setActive(val)
  }

  const toggleNav = () => {
    setShowNav(!showNav)
  }

  React.useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        toggleActive(1)
        break
      default:
        break
    }
  }, [])

  React.useEffect(() => {
    if (showNav)
      document.getElementsByTagName("body")[0].style.overflow = "hidden"
    else document.getElementsByTagName("body")[0].style.overflow = "auto"
  }, [showNav])

  return (
    <IndexContext.Provider
      value={{
        active,
        showNav,
        toggleActive,
        toggleNav,
      }}
    >
      <Router>
        <Navbar />
        <React.Suspense fallback={<Loading />}>
          <Route exact path="/" component={Home} />
        </React.Suspense>
        <Route exact path="/add" component={AddList} />
      </Router>
    </IndexContext.Provider>
  )
}

export default App
