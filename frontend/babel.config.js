module.exports = function makeBabelConfig(api) {
    api.cache(true)
    const presets = [
        '@babel/preset-env',
        [
            "@babel/preset-react", {"runtime": "automatic"}
        ],
        '@babel/preset-typescript',
    ];

    return {
        presets,
    };
};
