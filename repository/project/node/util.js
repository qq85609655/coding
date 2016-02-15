var util=require("util");
var debuglog=util.debuglog("foo");
var bar =123;
  
/**
 * inherit
 * 原理：Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
 * @type {[type]}
 */
var EventEmitter = require("events");

function MyStream() {
    EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
    this.emit("data", data);
}

var stream = new MyStream();

console.log(stream instanceof EventEmitter); // true
console.log(MyStream.super_ === EventEmitter); // true

stream.on("data", function(data) {
    console.log('Received data: "' + data + '"');
})
stream.write("It works!"); // Received data: "It works!"

/**
 * color
 */
console.log(util.inspect.colors);

/**
 * inspect
 */
var obj = { name: 'nate' };
obj.inspect = function(depth) {

util.log('Timestamped message.');
  return '{' + this.name + '}';
};

var t=util.inspect(obj);
util.log(t);
