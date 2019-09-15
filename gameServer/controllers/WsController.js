const mockio = require('../mock/mockio')
const cmd = require('../../cmd')
const BetController = require('./BetController')
const UserController = require('./UserController')
const TableController = require('./TableController')
const GameController = require('./GameController')

var WsController = function () {
  var io = null
  var usersSocket = {}

  GameController.initWs(this)

  this.initSocket = function (http) {
    io = require('socket.io')(http)
  }

  this.notifyAll = function (ntf, data) {
    console.log(Object.keys(usersSocket))
  }

  this.notifyPeer = function (ntf, id, data) {
    if (usersSocket[id]) {
      usersSocket[id].emit(ntf, data)
    } else {
      console.log('NOT CONNECTED')
    }
  }

  mockio.on('connection', function (socket) {
    socket.emit('SYS', 'YOU ARE CONNECTED!')

    var rqs = (reqkey, reskey, id, data) => {
      GameController
        .onWs(reqkey, id, data)
        .then(res => {
          socket.emit(reskey, res)
        })
        .catch(err => {
          socket.emit(reskey, err)
        })
    }

    usersSocket[socket.id] = socket


    socket.on(cmd.REQ_USER_SITDOWN, data => {
      rqs(cmd.REQ_USER_SITDOWN, cmd.RES_USER_SITDOWN, socket.id, data)
    })

    socket.on(cmd.REQ_USER_LOGIN, data => {
      rqs(cmd.REQ_USER_LOGIN, cmd.RES_USER_LOGIN, socket.id, data)
    })

    socket.on(cmd.REQ_USER_INFO, data => {
      rqs(cmd.REQ_USER_INFO, cmd.RES_USER_INFO, socket.id, data)
    })

    socket.on(cmd.REQ_USER_BET_INFO, data => {
      rqs(cmd.REQ_USER_BET_INFO, cmd.RES_USER_BET_INFO, socket.id, data)
    })

    socket.on(cmd.REQ_TB_INFO, data => {
      rqs(cmd.REQ_TB_INFO, cmd.RES_TB_INFO, socket.id, data)
    })

    socket.on(cmd.REQ_USER_BETOUT, data => {
      rqs(cmd.REQ_USER_BETOUT, cmd.RES_USER_BETOUT, socket.id, data)
    })


    socket.on('disconnect', (socket) => {
      console.log('disconnect')
      usersSocket[socket.id] = null
      delete usersSocket[socket.id]
      console.log('user disconnect')
    })
  })
}
module.exports = new WsController()