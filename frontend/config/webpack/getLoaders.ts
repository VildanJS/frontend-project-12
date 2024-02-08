import {type RuleSetRule} from "webpack";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const getLoaders = (isDev: boolean): RuleSetRule[] => {
    const typeScriptLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
                },
            }
        ]
    }
    const styleLoader = {
        test: /\.(sass|less|css|scss)$/,
        sideEffects: true,
        use: [
            {
                loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resourcePath: string) => resourcePath.endsWith('.module.scss'),
                        localIdentName: isDev ? '[path][name]__[local]' : '[name]--[hash:base64:8]',
                        exportLocalsConvention: 'camelCase'
                    },
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            autoprefixer
                        ]
                    }
                }
            },
            {
                loader: 'sass-loader'
            },],
    }

    return [typeScriptLoader, styleLoader]
}

