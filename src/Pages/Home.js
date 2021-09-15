import React from 'react'
import { useLocation } from 'react-router-dom'
import { Title } from 'react-head'

import usePage from '../helpers/use-page'

const Home = () => {
  const { pathname } = useLocation()
  const { loading, payload } = usePage(pathname)
  if (loading) {
    return <p>Loading</p>
  }
  return (
    <div>
      <Title>{payload.title}</Title>
      <h1 className="mb-2 text-lg font-bold">{payload.title}</h1>
      <p>{payload.content}</p>
    </div>
  )
}

export default Home
