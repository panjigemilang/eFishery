import React from "react"

export default React.createContext({
  active: 1,
  showNav: false,
  toggleActive: (state) => {},
  toggleNav: (state) => {},
})
