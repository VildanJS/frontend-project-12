import { io, Socket } from 'socket.io-client'

export const createSocket = () => {
    let _socket: Socket
    return async (): Promise<Socket> => {
        if (!_socket) {
            _socket = io()
        }

        if (_socket.disconnected) {
            _socket.connect()
        }

        return _socket
    }
}
export const getSocketInstance = createSocket()
