const {
  PostPlaylistPayloadSchema,
  PostSongToPlaylistPayloadSchema,
  DeleteSongFromPlaylistPayloadSchema
} = require('./schema')
const InvariantError = require('../../exceptions/InvariantError')

const PlaylistsValidator = {
  validatePostPlaylistPayload: (payload) => {
    const validationResult = PostPlaylistPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },
  validatePostSongToPlaylistPayload: (payload) => {
    const validationResult = PostSongToPlaylistPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },
  validateDeleteSongFromPlaylistPayload: (payload) => {
    const validationResult = DeleteSongFromPlaylistPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = PlaylistsValidator
