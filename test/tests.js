$(document).ready(function() {

  test("each", function() {
    _.each([1, 2, 3], function(num, i) {
      equal(num, i + 1, 'each iterators provide value and iteration count');
    });

    var answers = [];
    var answer = null;

    _.each([1, 2, 3], function(num, index, arr){ if (arr.indexOf(num)>0) answer = true; });
    ok(answer, 'can reference the original collection from inside the iterator');

    answers = 0;
    _.each(null, function(){ ++answers; });
    equal(answers, 0, 'handles a null properly');
  });

  test('contains', function() {
    ok(_.contains([1,2,3], 2), 'two is in the array');
    ok(!_.contains([1,3,9], 2), 'two is not in the array');
    ok(_.contains({moe:1, larry:3, curly:9}, 3) === true, '_.contains on objects checks their values');
  });

  test('map', function() {
    var doubled = _.map([1, 2, 3], function(num){ return num * 2; });
    equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');

    var ifnull = _.map(null, function(){});
    ok(Array.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
  });

  test('pluck', function() {
    var people = [{name : 'moe', age : 30}, {name : 'curly', age : 50}];
    equal(_.pluck(people, 'name').join(', '), 'moe, curly', 'pulls names out of objects');
  });

  test("last", function() {
    equal(_.last([1,2,3]), 3, 'can pull out the last element of an array');
    equal(_.last([1,2,3], 0).join(', '), "", 'can pass an index to last');
    equal(_.last([1,2,3], 2).join(', '), '2, 3', 'can pass an index to last');
    equal(_.last([1,2,3], 5).join(', '), '1, 2, 3', 'can pass an index to last');
    var result = (function(){ return _.last(arguments, 2); })(1, 2, 3, 4);
    equal(result.join(", "), "3, 4", 'works on an arguments object');
    result = _.map([[1,2,3],[1,2,3]], _.last);
    equal(result.join(','), '3,3', 'works well with _.map');

    equal(_.last(null), undefined, 'handles nulls');
  });

  test("first", function() {
    equal(_.first([1,2,3]), 1, 'can pull out the first element of an array');
    equal(_.first([1,2,3], 0).join(', '), "", 'can pass an index to first');
    equal(_.first([1,2,3], 2).join(', '), '1, 2', 'can pass an index to first');
    equal(_.first([1,2,3], 5).join(', '), '1, 2, 3', 'can pass an index to first');
    var result = (function(){ return _.first(arguments, 2); })(4, 3, 2, 1);
    equal(result.join(","), "4,3", 'works on an arguments object.');
    result = _.map([[1,2,3],[1,2,3]], _.first);
    equal(result.join(','), '1,1', 'works well with _.map');
    equal(_.first(null), undefined, 'handles nulls');
  });

  test('reduce', function() {
    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; }, 0);
    equal(sum, 6, 'can sum up an array');

    var sum = _.reduce([1, 2, 3], function(sum, num){ return sum + num; });
    equal(sum, 6, 'default initial value');

    ok(_.reduce(null, function(){}, 138) === 138, 'handles a null (with initial value) properly');
  });

  test('select', function() {
    var evens = _.select([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equal(evens.join(', '), '2, 4, 6', 'selected each even number');

    evens = _.select([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
  });

  test('reject', function() {
    var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    equal(odds.join(', '), '1, 3, 5', 'rejected each even number');

    var evens = _.reject([1, 2, 3, 4, 5, 6], function(num){
      return num % 2 != 0;
    });
    equal(evens.join(', '), '2, 4, 6', 'rejected each odd number');
  });

  test('every', function() {
    ok(_.every([], function(i){return i;}), 'the empty set');
    ok(_.every([true, true, true], function(i){return i;}), 'all true values');
    ok(!_.every([true, false, true], function(i){return i;}), 'one false value');
    ok(_.every([0, 10, 28], function(num){ return num % 2 == 0; }), 'even numbers');
    ok(!_.every([0, 11, 28], function(num){ return num % 2 == 0; }), 'an odd number');
    ok(_.every([1], function(i){return i;}) === true, 'cast to boolean - true');
    ok(_.every([0], function(i){return i;}) === false, 'cast to boolean - false');
    ok(!_.every([undefined, undefined, undefined], function(i){return i;}), 'works with arrays of undefined');
  });

  test('any', function() {
    var nativeSome = Array.prototype.some;
    Array.prototype.some = null;
    ok(!_.any([]), 'the empty set');
    ok(!_.any([false, false, false]), 'all false values');
    ok(_.any([false, false, true]), 'one true value');
    ok(_.any([null, 0, 'yes', false]), 'a string');
    ok(!_.any([null, 0, '', false]), 'falsy values');
    ok(!_.any([1, 11, 29], function(num){ return num % 2 == 0; }), 'all odd numbers');
    ok(_.any([1, 10, 29], function(num){ return num % 2 == 0; }), 'an even number');
    ok(_.any([1], function(i){return i;}) === true, 'cast to boolean - true');
    ok(_.any([0], function(i){return i;}) === false, 'cast to boolean - false');
    Array.prototype.some = nativeSome;
  });

  test("uniq", function() {
    var list = [1, 2, 1, 3, 1, 4];
    equal(_.uniq(list).join(', '), '1, 2, 3, 4', 'can find the unique values of an unsorted array');

    var iterator = function(value) { return value +1; };
    var list = [1, 2, 2, 3, 4, 4];
    equal(_.uniq(list, true, iterator).join(', '), '1, 2, 3, 4', 'iterator works with sorted array');

    var result = (function(){ return _.uniq(arguments); })(1, 2, 1, 3, 1, 4);
    equal(result.join(', '), '1, 2, 3, 4', 'works on an arguments object');
  });

  test("once", function() {
    var num = 0;
    var increment = _.once(function(){ num++; });
    increment();
    increment();
    equal(num, 1);
  });

  test("memoize", function() {
    var fib = function(n) {
      return n < 2 ? n : fib(n - 1) + fib(n - 2);
    };
    var fastFib = _.memoize(fib);
    equal(fib(10), 55, 'a memoized version of fibonacci produces identical results');
    equal(fastFib(10), 55, 'a memoized version of fibonacci produces identical results');

    var o = function(str) {
      return str;
    };
    var fastO = _.memoize(o);
    equal(o('toString'), 'toString', 'checks hasOwnProperty');
    equal(fastO('toString'), 'toString', 'checks hasOwnProperty');
  });

  asyncTest("delay", 3, function() {
    var delayed = false;
    var testArgs = false;
    _.delay(
      function(newVal){
        delayed = true;
        testArgs = newVal;
      }, 100, true);

    setTimeout(function(){ ok(!delayed, "didn't delay the function quite yet"); }, 50);
    setTimeout(function(){ ok(delayed, 'delayed the function'); start(); }, 150);
    setTimeout(function(){ ok(testArgs, 'arguments are passed in to the callback function successfully'); }, 150);
  });


  test("extend", function() {
    var result;
    equal(_.extend({}, {a:'b'}).a, 'b', 'can extend an object with the attributes of another');
    equal(_.extend({a:'x'}, {a:'b'}).a, 'b', 'properties in source override destination');
    equal(_.extend({x:'x'}, {a:'b'}).x, 'x', 'properties not in source dont get overriden');
    result = _.extend({x:'x'}, {a:'a'}, {b:'b'});
    ok((result.x == 'x' && result.a == 'a' && result.b == 'b'), 'can extend from multiple source objects');
    result = _.extend({x:'x'}, {a:'a', x:2}, {a:'b'});
    ok((result.x == 2 && result.a == 'b'), 'extending from multiple source objects last property trumps');
    result = _.extend({}, {a: void 0, b: null});
    ok(result.hasOwnProperty('a') && result.hasOwnProperty('b'), 'extend does not copy undefined values');
  });


  test("defaults", function() {
    var result;
    var options = {zero: 0, one: 1, empty: "", nan: NaN, string: "string"};

    _.defaults(options, {zero: 1, one: 10, twenty: 20});
    equal(options.zero, 0, 'value exists');
    equal(options.one, 1, 'value exists');
    equal(options.twenty, 20, 'default applied');

    _.defaults(options, {empty: "full"}, {nan: "nan"}, {word: "word"}, {word: "dog"});
    equal(options.empty, "", 'value exists');
    ok(isNaN(options.nan), "NaN isn't overridden");
    equal(options.word, "word", 'new value is added, first one wins');
  });

  test("flatten", function() {
    if (window.JSON) {
      var list = [1, [2], [3, [[[4]]]]];
      equal(JSON.stringify(_.flatten(list)), '[1,2,3,4]', 'can flatten nested arrays');
      var result = (function(){ return _.flatten(arguments); })(1, [2], [3, [[[4]]]]);
      equal(JSON.stringify(result), '[1,2,3,4]', 'works on an arguments object');
    }
  });

  test('sortBy', function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person){ return person.age; });
    equal(_.pluck(people, 'name').join(', '), 'moe, curly', 'stooges sorted by age');

    var list = [undefined, 4, 1, undefined, 3, 2];
    equal(_.sortBy(list, function(i){return i;}).join(','), '1,2,3,4,,', 'sortBy with undefined values');

    var list = ["one", "two", "three", "four", "five"];
    var sorted = _.sortBy(list, 'length');
    equal(sorted.join(' '), 'one two four five three', 'sorted by length');

    function Pair(x, y) {
      this.x = x;
      this.y = y;
    }

    var collection = [
      new Pair(1, 1), new Pair(1, 2),
      new Pair(1, 3), new Pair(1, 4),
      new Pair(1, 5), new Pair(1, 6),
      new Pair(2, 1), new Pair(2, 2),
      new Pair(2, 3), new Pair(2, 4),
      new Pair(2, 5), new Pair(2, 6),
      new Pair(undefined, 1), new Pair(undefined, 2),
      new Pair(undefined, 3), new Pair(undefined, 4),
      new Pair(undefined, 5), new Pair(undefined, 6)
    ];

    var actual = _.sortBy(collection, function(pair) {
      return pair.x;
    });

    deepEqual(actual, collection, 'sortBy should be stable');
  });

  test('zip', function() {
    var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
    var stooges = _.zip(names, ages, leaders);
    equal(String(stooges), 'moe,30,true,larry,40,,curly,50,', 'zipped together arrays of different lengths');
  });

  test("intersection", function() {
    var stooges = ['moe', 'curly', 'larry'], leaders = ['moe', 'groucho'];
    equal(_.intersection(stooges, leaders).join(''), 'moe', 'can take the set intersection of two arrays');
    var result = (function(){ return _.intersection(arguments, leaders); })('moe', 'curly', 'larry');
    equal(result.join(''), 'moe', 'works on an arguments object');
  });

  test("difference", function() {
    var result = _.difference([1, 2, 3], [2, 30, 40]);
    equal(result.join(' '), '1 3', 'takes the difference of two arrays');

    var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);
    equal(result.join(' '), '3 4', 'takes the difference of three arrays');
  });

  test('shuffle', function() {
    var numbers = _.range(10);
    var shuffled = _.shuffle(numbers).sort();
    notStrictEqual(numbers, shuffled, 'original object is unmodified');
    equal(shuffled.join(','), numbers.join(','), 'contains the same members before and after shuffle');
  });

});

