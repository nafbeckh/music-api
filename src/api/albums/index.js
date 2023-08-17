const AlbumsHandler = require('./handler')
const routes = require('./routes')

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, {
    albumsService,
    albumLikesService,
    songsService,
    validator
  }) => {
    const albumsHandler = new AlbumsHandler(
      albumsService,
      albumLikesService,
      songsService,
      validator
    )
    server.route(routes(albumsHandler))
  }
}
