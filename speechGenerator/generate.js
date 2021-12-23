var gtts = require('node-gtts')('en')
var path = require('path')

const saveSpeech = (text) => {
  var filepath = path.join(__dirname, text + '.wav')

  gtts.save(filepath, text, function () {
    console.log('save done')
  })
}

saveSpeech('ok')
saveSpeech('not ok')
