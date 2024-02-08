import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { WebpackPluginInstance, ProgressPlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { Paths } from './types/ConfigOptions'
import CopyPlugin from 'copy-webpack-plugin'

export const getPlugins = (paths: Paths, isDev: Boolean): WebpackPluginInstance[] => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),

        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
        new ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        isDev && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean)

    if(!isDev) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].[contenthash].css",
            })
        )
    }

    return plugins
}
