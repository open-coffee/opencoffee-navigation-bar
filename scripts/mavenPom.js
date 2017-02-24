
const fs    = require ('fs');
const path  = require ('path');
const xpath = require('xpath');
const Dom   = require('xmldom').DOMParser;

const pomPath = path.resolve ('.', 'pom.xml');
const pom = fs.readFileSync (pomPath, 'utf-8');

const xmlDom = new Dom().parseFromString(pom);

const select = xpath.useNamespaces({"pom": "http://maven.apache.org/POM/4.0.0"});

const artifactVersion = select('/pom:project/pom:version/text()', xmlDom).toString();
const artifactId = select('/pom:project/pom:artifactId/text()', xmlDom).toString();


module.exports = {version: artifactVersion, artifactId: artifactId};
