import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoaders = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const cadeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCadeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const cssLoaders = buildCssLoader(isDev);

    return [
        fileLoader,
        svgLoaders,
        cadeBabelLoader,
        tsxCadeBabelLoader,
        cssLoaders,
    ];
}
