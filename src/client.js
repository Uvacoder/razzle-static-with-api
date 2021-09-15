import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import Root from './Root'
import createClient from './helpers/client'

const client = createClient()

client.cache.setItems(window.__INITAL_DATA__)

let headTags = []

loadableReady().then(() => {
  hydrate(
    <Root client={client} headTags={headTags} />,
    document.getElementById('root')
  )
})
