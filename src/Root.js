import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ClientContextProvider } from '@gerhardsletten/react-fetching-library'
import { HeadProvider } from 'react-head'

import App from './App'

const Root = ({ client, headTags }) => (
  <ClientContextProvider client={client}>
    <BrowserRouter>
      <HeadProvider headTags={headTags}>
        <App />
      </HeadProvider>
    </BrowserRouter>
  </ClientContextProvider>
)

export default Root
