import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import loadable from '@loadable/component'
import './App.css'

const Home = loadable(() => import('./Pages/Home'))
const About = loadable(() => import('./Pages/About'))

const routes = {
  home: '/',
  about: '/about',
}

const App = () => (
  <div className="flex flex-col min-h-screen">
    <header className="flex justify-between w-full bg-gray-100 max-w-screen-lg mx-auto px-4 py-4 mb-4">
      <strong className="mr-4">Logo</strong>
      <nav>
        <Link to={routes.home} className="mx-2 hover:underline">
          Home
        </Link>
        <Link to={routes.about} className="mx-2 hover:underline">
          About
        </Link>
      </nav>
    </header>
    <main className="w-full flex-1 max-w-screen-lg mx-auto px-4 mb-4">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </main>
    <footer className="bg-gray-100 w-full max-w-screen-lg mx-auto mx-auto px-4 py-4">
      <p>Footer</p>
    </footer>
  </div>
)

export default App
