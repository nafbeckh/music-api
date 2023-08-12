const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistsByUserIdHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postSongToPlaylistHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getSongsFromPlaylistHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deleteSongsFromPlaylistHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.getPlaylistActivitiesHandler,
    options: {
      auth: 'musicapi_jwt'
    }
  }
]

module.exports = routes
