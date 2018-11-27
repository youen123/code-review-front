const path = require('path');
const fs = require('fs');
const watch = require('node-watch');
const glob = require('glob');
const jsonFormat = require('json-format');

var targetPath = path.join(__dirname, 'xhr');
console.log('mock data from: ', targetPath);

const outputJSON = {};

function walk(filePath, complete) {
    var files = glob.sync(path.resolve(targetPath, '**/*.json'), {});
    if (files.length) {
        files.forEach(function(fileName, index) {
            var content = fs.readFileSync(fileName, 'utf8');
            try {
                var contentJSON = JSON.parse(content);
                var key = fileName.replace(targetPath, '')
                                .replace(/\//g, '')
                                .replace(/\.json$/g, '');
                outputJSON[key] = contentJSON;
            } catch (error) {
                console.error(error);
            }

            if (index === files.length - 1) {
                complete();
            }
        });
    } else {
        complete();
    }
}

function writeDbJSON() {
    const outputFile = path.join(__dirname, 'db.json');
    console.log('db file: ', outputFile);
    try {
        fs.writeFileSync(outputFile, jsonFormat(outputJSON), 'utf8');
    } catch (error) {
        console.log(error);
    }
}

function doWalk() {
    walk(targetPath, writeDbJSON);
}

doWalk();

watch(targetPath, { filter: /\.json$/, recursive: true }, function(evt, name) {
    console.log(evt, name);
    doWalk();
});
