import crypto from 'crypto'
import jsSha from 'js-sha256'
// import base64 from 'js-base64'

/* 加密偏移量*/
export const mdCrypto = (pwd) => {
  const md5 = crypto.createHash('md5')
  const salt1 = '250157116'
  const salt2 = '672025'
  md5.update(salt1 + pwd + salt2)
  return md5.digest('hex')
}

export const shaCrypto = (pwd) => {
  return jsSha.sha256(pwd)
}

/*
export const baseCrypto = (pwd) => {
  return base64.Base64.encode(pwd)
}
*/

