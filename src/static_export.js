import { renderApp } from './server'

export const render = async (req, res) => {
  const { html } = await renderApp(req)

  res.json({ html })
}

export const routes = async () => {
  // Todo: fetch routes
  return ['/', '/about']
}
