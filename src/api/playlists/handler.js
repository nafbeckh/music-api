const autoBind = require('auto-bind')

class PlaylistsHandler {
  constructor (playlistsService, playlistSongsService, songsService, validator) {
    this._playlistsService = playlistsService
    this._playlistSongsService = playlistSongsService
    this._songsService = songsService
    this._validator = validator

    autoBind(this)
  }

  async postPlaylistHandler (req, h) {
    this._validator.validatePostPlaylistPayload(req.payload)

    const { name } = req.payload
    const { id: owner } = req.auth.credentials

    const playlistId = await this._playlistsService.addPlaylist({ name, owner })

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: { playlistId }
    })

    response.code(201)
    return response
  }

  async getPlaylistsByUserIdHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const playlists = await this._playlistsService.getPlaylistByUserId({ userId })

    return {
      status: 'success',
      data: { playlists }
    }
  }

  async deletePlaylistByIdHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const { id } = req.params
    await this._playlistsService.deletePlaylistById({ id, userId })

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus'
    }
  }

  async postSongToPlaylistHandler (req, h) {
    this._validator.validatePostSongToPlaylistPayload(req.payload)

    const { id: userId } = req.auth.credentials
    const { id } = req.params
    const { songId } = req.payload

    await this._songsService.getSongById(songId)

    await this._playlistSongsService.addSongToPlaylist({ id, songId, userId })

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
      data: { id }
    })

    response.code(201)
    return response
  }

  async getSongsFromPlaylistHandler (req, h) {
    const { id: userId } = req.auth.credentials
    const { id } = req.params

    const playlist = await this._playlistsService.getPlaylistById(id, userId)
    playlist.songs = await this._playlistSongsService.getSongsFromPlaylistId(id, userId)

    return {
      status: 'success',
      data: {
        playlist
      }
    }
  }

  async deleteSongsFromPlaylistHandler (req, h) {
    this._validator.validatePostSongToPlaylistPayload(req.payload)

    const { id: userId } = req.auth.credentials
    const { id } = req.params
    const { songId } = req.payload

    await this._playlistSongsService.deleteSongFromPlaylist(id, songId, userId)

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist'
    }
  }
}

module.exports = PlaylistsHandler
