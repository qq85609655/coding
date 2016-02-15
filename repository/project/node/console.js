var Console = console.Console;
var fs=require('fs');
var output = fs.createWriteStream('./stdout.log');
var errorOutput = fs.createWriteStream('./stderr.log');
// custom simple logger
var logger = new Console(output, errorOutput);
// use it like console
var count = 5;
logger.log('count: %d', count);
logger.info('count: %d', count);
logger.error('count: %d', 4); 

var util=require("util");
var debugloga=util.debuglog("foo");
var bar = 123;
debugloga('hello from foo [%d]', bar);//console.error()