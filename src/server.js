import App from './App'
import React from 'react'
import express from 'express'
import compression from 'compression'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import { StaticRouter } from 'react-router-dom'
import { ClientContextProvider } from '@gerhardsletten/react-fetching-library'
import { HeadProvider } from 'react-head'
import serialize from 'serialize-javascript'
import path from 'path'
import createClient from './helpers/client'
import config from './config'
import 'isomorphic-unfetch'

const server = express()

server.use(compression())

export const renderApp = async (req) => {
  const client = createClient()
  // We create an extractor from the statsFile
  const context = {}
  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    // razzle client bundle entrypoint is client.js
    entrypoints: ['client'],
  })

  const action = {
    method: 'GET',
    endpoint: `${config.api}?path=${req.url}`,
  }
  await client.query(action)
  let headTags = []
  const markup = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <ClientContextProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <HeadProvider headTags={headTags}>
            <App />
          </HeadProvider>
        </StaticRouter>
      </ClientContextProvider>
    </ChunkExtractorManager>
  )
  // collect script tags
  const scriptTags = extractor.getScriptTags()

  // collect "preload/prefetch" links
  const linkTags = extractor.getLinkTags()

  // collect style tags
  const styleTags = extractor.getStyleTags()

  const html =
    // prettier-ignore
    `<!doctype html>
<html lang="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    ${renderToString(headTags)}
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${linkTags}
    ${styleTags}
</head>
<body>
    <div id="root">${markup}</div>
    ${scriptTags}
    <script>window.__INITAL_DATA__=${serialize(client.cache.getItems())};
  </script>
</body>
</html>`

  return { html, context }
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res, next) => {
    try {
      const { html, context } = await renderApp(req)
      if (context.url) {
        return res.redirect(301, context.url)
      }
      res.send(html)
    } catch (error) {
      next(error)
    }
  })

export default server
