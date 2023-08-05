const SongssHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongssHandler(service, validator)
    server.route(routes(songsHandler))
  }
}
