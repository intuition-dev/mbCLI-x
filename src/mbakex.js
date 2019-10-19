#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require("command-line-args");
const Base_1 = require("mbake/lib/Base");
const Wa_1 = require("mbake/lib/Wa");
const Spider_1 = require("./lib/Spider");
const mbakeX_1 = require("./lib/mbakeX");
const FileOpsBase_1 = require("mbake/lib/FileOpsBase");
const mbakeX_2 = require("./lib/mbakeX");
const FileOpsExtra_1 = require("mbake/lib/FileOpsExtra");
const cov_1 = require("./lib/cov");
const cwd = process.cwd();
function version() {
    console.info('mbakex CLI version: ' + mbakeX_1.MBakeX.verx());
}
function help() {
    console.info();
    console.info('mbakex CLI version: ' + mbakeX_1.MBakeX.verx());
    console.info('  your node version is ' + process.version);
    console.info('  from ' + __dirname);
    console.info();
    console.info('Usage: ');
    console.info('  For local watcher and server on port:');
    console.info('    -p, --port to specify port for watcher:                    mbakex -w . -p 8091 -r 9857');
    console.info('     (must be used with -r)');
    console.info('    -r, --reload-port to specify port for live reload :        mbakex -w . --port=8091 --reload-port=9857');
    console.info();
    console.info('  To bake with dev. ENV flag(1) in prod(default is 0):         mbakex --bakeD .');
    console.info('  To bake with staging ENV flag(2) in prod:                    mbakex --bakeS .');
    console.info('  To bake with production ENV flag(3) in prod:                 mbakex --bakeP .');
    console.info();
    console.info('  Download fragment to setup the app devOps:                   mbakex --ops .');
    console.info('  Add|clone an item|page from:to :                             mbakex --add dir:source:target');
    console.info();
    console.info('  To map map.yaml to sitemap.xml                               mbakex -m .');
    console.info('  Compress 3200px or larger .jpg images to 2 sizes:            mbakex -i .');
    console.info();
    console.info('  To process list.csv to list.json:                            mbakex -l .');
    console.info('  To download branch from git, in folder with gitdown.yaml:    mbakex --gitDown .');
    console.info('     passing the git password of gitdown user');
    console.info();
    console.info('  To get a test coverage report of ViewModel and Test classes: mbakex --cover ViewModelDir:TestDir');
    console.info();
    console.info('  To recursively remove source files:                          mbakex --src .');
    console.info();
    console.info('    Note: . is current directory, or use any path instead of .');
    console.info(' -------------------------------------------------------------');
    console.info();
    console.info(' Starters:');
    console.info('  For a Electron(pre-PhoneGap) app:                           mbakex -e');
    console.info('  For a starter hybrid Phonegap app:                          mbakex -o');
    console.info();
}
const optionDefinitions = [
    { name: 'mbakex', defaultOption: true },
    { name: 'help', alias: 'h', type: Boolean },
    { name: 'version', alias: 'v', type: Boolean },
    { name: 'watcher', alias: 'w', type: Boolean },
    { name: 'port', alias: 'p', type: String },
    { name: 'reload-port', alias: 'r', type: String },
    { name: 'src', type: Boolean },
    { name: 'comps', alias: 'c', type: Boolean },
    { name: 'bakeP', type: Boolean },
    { name: 'bakeS', type: Boolean },
    { name: 'bakeD', type: Boolean },
    { name: 'ops', type: Boolean },
    { name: 'gitDown', type: Boolean },
    { name: 'add', type: Boolean },
    { name: 'cover', type: Boolean },
    { name: 'exportFS', type: Boolean },
    { name: 'importFS', type: Boolean },
    { name: 'map', alias: 'm', type: Boolean },
    { name: 'img', alias: 'i', type: Boolean },
    { name: 'csv2Json', alias: 'l', type: Boolean },
    { name: 'elect', alias: 'e', type: Boolean },
    { name: 'phonegap', alias: 'o', type: Boolean },
];
const argsParsed = commandLineArgs(optionDefinitions);
let arg = argsParsed['mbakex'];
console.info();
FileOpsExtra_1.VersionNag.isCurrent('mbakex', mbakeX_1.MBakeX.verx()).then(function (isCurrent_) {
    try {
        if (!isCurrent_)
            console.log('There is a newer version of mbakex, please update.');
    }
    catch (err) {
        console.log(err);
    }
});
function git(arg) {
    let gg = new mbakeX_2.GitDown(arg);
}
function cover(arg) {
    var res = arg.split(':');
    const VMdir = res[0];
    const TestDir = res[1];
    cov_1.Cover.run(VMdir, TestDir);
}
function frag(arg) {
    new FileOpsExtra_1.DownloadFrag(arg, true);
}
function add(arg) {
    const args = arg.split(':');
    let dir = args[0];
    if (dir.endsWith('.')) {
        dir = dir.slice(0, -1);
    }
    console.log(dir, args);
    const f = new FileOpsBase_1.FileOps(dir);
    f.clone(args[1], args[2]);
}
function unzipG() {
    new FileOpsExtra_1.Download('phoneGap', __dirname).autoUZ();
    console.info('Extracted a starter PhoneGap app');
}
function unzipE() {
    new FileOpsExtra_1.Download('electron', __dirname).autoUZ();
    console.info('Extracted a starter Electron app');
}
function csv2Json(arg) {
    new FileOpsExtra_1.CSV2Json(arg).convert();
}
function map(arg) {
    new Spider_1.Map(arg).gen();
}
function img(arg) {
    new mbakeX_1.Resize().do(arg);
}
function comps(arg) {
    let pro = new Base_1.MBake().compsNBake(arg, 0);
    pro.then(function (val) {
        console.log(val);
    });
}
function src(arg) {
    new mbakeX_1.MBakeX().clearSrc(arg);
}
function bakeP(arg) {
    let pro = new Base_1.MBake().bake(arg, 3);
    pro.then(function (val) {
        console.log(val);
    });
}
function bakeS(arg) {
    let pro = new Base_1.MBake().bake(arg, 2);
    pro.then(function (val) {
        console.log(val);
    });
}
function bakeD(arg) {
    let pro = new Base_1.MBake().bake(arg, 1);
    pro.then(function (val) {
        console.log(val);
    });
}
if (arg) {
    arg = FileOpsBase_1.Dirs.slash(arg);
    if (arg.startsWith('/')) {
    }
    else if (arg.startsWith('..')) {
        arg = arg.substring(2);
        let d = cwd;
        d = FileOpsBase_1.Dirs.slash(d);
        let n = d.lastIndexOf('/');
        d = d.substring(0, n);
        arg = d + arg;
    }
    else {
        arg = cwd + '/' + arg;
    }
}
if (argsParsed.comps) {
    try {
        comps(arg);
    }
    catch (err) {
        console.info(err);
    }
}
else if (argsParsed.elect)
    unzipE();
else if (argsParsed.phonegap)
    unzipG();
else if (argsParsed.csv2Json)
    csv2Json(arg);
else if (argsParsed.watcher) {
    Wa_1.Wa.watch(arg, argsParsed.port, argsParsed['reload-port']);
}
else if (argsParsed.img) {
    img(arg);
}
else if (argsParsed.map)
    map(arg);
else if (argsParsed.src)
    src(arg);
else if (argsParsed.bakeP)
    bakeP(arg);
else if (argsParsed.bakeS)
    bakeS(arg);
else if (argsParsed.bakeD)
    bakeD(arg);
else if (argsParsed.ops)
    frag(arg);
else if (argsParsed.gitDown)
    git(arg);
else if (argsParsed.add)
    add(arg);
else if (argsParsed.cover)
    cover(arg);
else if (argsParsed.version)
    version();
else if (argsParsed.help)
    help();
else if (!arg)
    help();
