import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

export const getDevServerConfig = (port: number, isOpen: boolean): DevServerConfiguration => {
    return {
        port,
        open: isOpen,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                router: () => 'http://127.0.0.1:5001',
            },
            '/socket.io': {
                target: 'http://localhost:3000',
                router: () => 'http://127.0.0.1:5001',
                ws: true,
            },
        },
    }
}
