// QR contents
const qrContents = ['XS', 'S', 'M', 'L', 'XL']

const QRCode = require('qrcode')

for (let qrContent of qrContents) {
  QRCode.toFile(`${__dirname}/barcodes/${qrContent}.png`, qrContent)
}
