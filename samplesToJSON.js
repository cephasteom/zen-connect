const dirTree = require("directory-tree");
const fs = require('fs');
const tree = dirTree("./samples");

// Replace double backslashes with forward slashes
function convertWindowsPath(inputPath) {
  return inputPath.replace(/\\/g, '/');
}

function formatItem(name, url) {
    const [, ext] = name.split(".");
	url = convertWindowsPath(url);
            const group = url.split("/")[url.split("/").length - 2];
            return ['wav', 'aif', 'mp3'].includes(ext) 
                ? { group, url: 'http://localhost:6060/' + url }
                : false;
}

function compile(array) {
    return array
        .map(({path, name, children}) => children
            ? compile(children)
            : formatItem(name, path)
        )
        .filter(path => path)
        .flat(128)
}

const result = compile(tree.children)
    .reduce((obj, item) => ({
        ...obj,
        [item.group]: obj[item.group] ? [...obj[item.group], item.url] : [item.url]
    }), {})

const json = JSON.stringify(result);

fs.writeFile('./samples.json', json, 'utf8', (err) => {
    err
        ? console.log(`Error writing samples file: ${err}`)
        : console.log(`Samples file is written successfully!`);
});