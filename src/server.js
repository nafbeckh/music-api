require('dotenv').config()
const Hapi = require('@hapi/hapi')
const albums = require('./api/albums')
const AlbumsService = require('./services/inMemory/AlbumsService')
const ClientError = require('./exceptions/ClientError')

const init = async () => {
  const albumsService = new AlbumsService()
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
      service: albumsService
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
