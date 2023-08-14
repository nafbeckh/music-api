const nodemailer = require('nodemailer')

class MailSender {
  constructor () {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  sendEmail (targetEmail, playlistName, content) {
    const message = {
      from: 'Open Music Services',
      to: targetEmail,
      subject: `Daftar lagu pada playlist ${playlistName}`,
      text: `Berikut adalah lagu-lagu yang terdapat pada playlist "${playlistName}"`,
      attachments: [
        {
          filename: 'songs.json',
          content
        }
      ]
    }

    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
