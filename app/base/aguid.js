const uuid = require('node-uuid') // http://git.io/xyEh
const crypto = require('crypto') // http://nodejs.org/api/crypto.html

export default function(str) {
  if (!str || str.length < 1) { // no parameter supplied
    let chars = uuid.v4(); // return node-uuid v4() uuid
    chars = chars.replace(/\-/g, '')
    return chars
  } else { // create a consistent (non-random!) UUID
    const hash = crypto.createHash('sha256').update(str.toString()).digest('hex').substring(0, 32)
    return hash
  }
}
