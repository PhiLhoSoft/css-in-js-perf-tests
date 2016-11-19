import webpack from 'webpack';
import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';

const testBundle = (name) => new Promise((resolve, reject) => {
    const compiler = webpack({
        context: __dirname,
        entry: {
            [name]: [`./${name}.js`],
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: JSON.parse(fs.readFileSync(path.join(__dirname, '../..', '.babelrc'))),
                    include: __dirname,
                    exclude: path.join(__dirname, '../..', 'node_modules'),
                },
            ],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: `${name}.js`
        },
    });

    compiler.run((err) => {
        if (err) {
            reject(err);
        } else {
            console.log(`Size ${name}`, (
                fs.statSync(path.join(__dirname, 'dist', `${name}.js`)).size / 1000.0
            ) + 'KB');
            resolve();
        }
    });
});

Promise.all([
    testBundle('aphrodite'),
    testBundle('cxs'),
    testBundle('cxs-optimized'),
    testBundle('glamor'),
    testBundle('jss-without-preset'),
    testBundle('jss'),
]).then(() => {
    rimraf(path.join(__dirname, 'dist'), (err) => {
        if (err) {
            throw err;
        }
    });
}).catch((err) => {
    throw err;
});
