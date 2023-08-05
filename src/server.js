require('dotenv').config()
const Hapi = require('@hapi/hapi')

const ClientError = require('./exceptions/ClientError')

/* Albums */
const albums = require('./api/albums')
const AlbumsService = require('./services/inMemory/AlbumsService')
const AlbumsValidator = require('./validator/albums')

/* Songs */
const SongsService = require('./services/inMemory/SongsService')
const songs = require('./api/songs')
const SongsValidator = require('./validator/songs')

const init = async () => {
  const albumsService = new AlbumsService()
  const songsService = new SongsService()

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: albums,
    options: {
      AlbumsService: albumsService,
      SongsService: songsService,
      validator: AlbumsValidator
    }
  })

  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      validator: SongsValidator
    }
  })

  server.ext('onPreResponse', (req, h) => {
    const { response } = req

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })

        newResponse.code(response.statusCode)
        return newResponse
      }
    }

    if (!response.isServer) {
      return h.continue
    }

    const newResponse = h.response({
      status: 'error',
      message: 'terjadi kegagalan pada server kami'
    })

    newResponse.code(500)
    return newResponse
  })

  await server.start()
  console.log(`Server berjalan di ${server.info.uri}`)
}

init()
