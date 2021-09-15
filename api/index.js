const query = require('micro-query');
const cors = require('micro-cors')();

const { send } = require('micro');
const db = require('./db.json')

module.exports = cors((req, res) => {
  const { path } = query(req)
  if (!path) {
    return send(res, 200, db)
  }
  const page = db.find((item) => item.path === path)
  send(res, 200, page)
})
