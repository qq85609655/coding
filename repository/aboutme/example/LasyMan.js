function LazyMan(name) {
    var queue = [];
     // flush later
    setTimeout(function () { 
        console.log('this is timeout');
        next();
    }, 0);
    var task = {
        wait: function (second) {
            return function () {
                setTimeout(function () {
                    console.log('Wake up after ' + second);
                    next();
                }, second * 1000);
            };
        },
        eat: function (part) {
            return function () {
                console.log('Eat ' + part + '~');
                next();
            };
        },
        hi: function () {
            console.log('Hi! This is ' + name + '!');
            next();
        }
    };

    queue.push(task.hi);

    function next() {
        var fn = queue.shift();
        fn && fn();
    }

   
console.log('this is timeoutout');
    return {
        sleep: function (second) {
            queue.push(task.wait(second));

            return this;
        },
        sleepFirst: function (second) {
            queue.unshift(task.wait(second));
            console.log('this is timeoutoutout');
            return this;
        },
        eat: function (part) {
            queue.push(task.eat(part));
            return this;
        }
    };
}


LazyMan('Hank').sleepFirst(3)
// .eat('breadfast').sleep(2).eat('lunch').sleep(3).eat('dinner');
