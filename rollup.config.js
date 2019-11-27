import typescript from 'rollup-plugin-typescript';
import minify from 'rollup-plugin-babel-minify';

export default {
    input: 'index.ts',
    output: {
        file: 'index.min.js',
        format: 'esm'
    },
    plugins: [
        typescript(),
        minify({
            comments: false
        })
    ]
}