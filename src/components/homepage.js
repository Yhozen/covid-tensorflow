import React from "react"

const Homepage = ({ pageContext: { cases, lastUpdate } }) => {
  return (
    <div>
      <p>{lastUpdate}</p>
    </div>
  )
}

export default Homepage
