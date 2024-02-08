import { type ResolveOptions } from "webpack";
export const getResolve = (path: string): ResolveOptions => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [path, 'node_modules'],
        alias: {
            '@': path
        },
    }
}
