import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const PageOne = () => {
  return (
    <div>
      PageOne
      <Link to="/pagetwo">Navigate it to pagetwo</Link>
    </div>
  )
}
const PageTwo = () => {
  return (
    <div>
      PageTwo
      <button>Click me</button>
      <Link to="/">Navigate it to pageone</Link>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={PageOne} />
        <Route path="/pagetwo" component={PageTwo} />
      </BrowserRouter>
    </div>
  )
}

export default App
