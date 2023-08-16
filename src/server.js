require('dotenv').config()

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')
const Inert = require('@hapi/inert')
const path = require('path')

/* Error */
const ClientError = require('./exceptions/ClientError')

/* Albums */
const albums = require('./api/albums')
const AlbumsService = require('./services/postgres/AlbumsService')
const AlbumsValidator = require('./validator/albums')

/* Songs */
const songs = require('./api/songs')
const SongsService = require('./services/postgres/SongsService')
const SongsValidator = require('./validator/songs')

/* Users */
const users = require('./api/users')
const UsersService = require('./services/postgres/UsersService')
const UsersValidator = require('./validator/users')

/* Authentications */
const authentications = require('./api/authentications')
const AuthenticationsService = require('./services/postgres/AuthenticationsService')
const TokenManager = require('./tokenize/TokenManager')
const AuthenticationsValidator = require('./validator/authentications')

/* Playlists */
const playlists = require('./api/playlists')
const PlaylistsService = require('./services/postgres/PlaylistsService')
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService')
const PlaylistSongActivitiesService = require('./services/postgres/PlaylistSongActivitiesService')
const PlaylistsValidator = require('./validator/playlists')

/* Collaborations */
const collaborations = require('./api/collaborations')
const CollaborationsService = require('./services/postgres/CollaborationsService')
const CollaborationsValidator = require('./validator/collaborations')

/* Exports */
const _exports = require('./api/exports')
const producerService = require('./services/messageBroker/ProduserServices')
const ExportsValidator = require('./validator/exports')

/* Uploads */
const uploads = require('./api/uploads')
const StorageService = require('./services/storage/StorageService')
const UploadsValidator = require('./validator/uploads')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  /* Server Init */
  const albumsService = new AlbumsService()
  const songsService = new SongsService()
  const usersService = new UsersService()
  const authenticationsService = new AuthenticationsService()
  const playlistsService = new PlaylistsService()
  const playlistSongActivitiesService = new PlaylistSongActivitiesService()
  const playlistSongsService = new PlaylistSongsService(playlistsService, playlistSongActivitiesService)
  const collaborationsService = new CollaborationsService(usersService)
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/covers'))

  /* External Plugins */
  await server.register([
    {
      plugin: Jwt
    },
    {
      plugin: Inert
    }
  ])

  server.auth.strategy('musicapi_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  /* Custom Plugins */
  await server.register([
    {
      plugin: albums,
      options: {
        albumsService,
        songsService,
        validator: AlbumsValidator
      }
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator
      }
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator
      }
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator
      }
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        playlistSongsService,
        playlistSongActivitiesService,
        songsService,
        validator: PlaylistsValidator
      }
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator
      }
    },
    {
      plugin: _exports,
      options: {
        producerService,
        playlistsService,
        validator: ExportsValidator
      }
    },
    {
      plugin: uploads,
      options: {
        storageService,
        albumsService,
        validator: UploadsValidator
      }
    }
  ])

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
