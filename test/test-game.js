const Main = require('../gameServer/controllers/MainController')
const Ws = require('../gameServer/controllers/WsController')
const mockSocket = require('../gameServer/mock/mockSocket')
const mockio = require('../gameServer/mock/mockio')
const userMock = require('./userMock')

Ws.initSocket()

var userFake = function(id) {
  let userm = new userMock(id)
  userm.connect()
  // userm.login()
  userm.tbsit()
  // userm.getUserInfo()
  // userm.getTBInfo()
  // userm.getBetInfo()
  // userm.tbsit()
  userm.betout()
  // userm.logout()
  // userm.disconnect()

  setTimeout(() => {
    userm.tbsit()
    setTimeout(() => {
      userm.betout()
    }, 1000)
  }, 16000)
}

userFake('1')
setTimeout(() => {
  userFake('2')
}, 2000)
