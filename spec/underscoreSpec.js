describe("last", function() {
  it("should pull the last element from an array", function() {
    expect(_.last([1,2,3])).to.equal(3);
  });

  it("should accept an index argument", function() {
    expect(_.last([1,2,3], 2)).to.eql([2, 3]);
  });

  it("should return nothing if zero is passed in as the index", function() {
    expect(_.last([1,2,3], 0)).to.eql([]);
  });

  it("should return all the array's elements if the index argument is larger than the length of the array", function() {
    expect(_.last([1,2,3], 5)).to.eql([1, 2, 3]);
  });

  it("should work on an arguments object", function() {
    var iterator = function() { return _.last(arguments, 2); };
    var result = iterator(1, 2, 3, 4);

    expect(result).to.eql([3, 4]);
  });
});

describe("first", function() {
  it("should be able to pull out the first element of an array", function() {
    expect(_.first([1,2,3])).to.equal(1);
  });

  it("should be able to accept a user-defined index", function() {
    expect(_.first([1,2,3], 0)).to.eql([]);
    expect(_.first([1,2,3], 2)).to.eql([1, 2]);
    expect(_.first([1,2,3], 5)).to.eql([1, 2, 3]);
  });

  it("should work on an arguments object", function() {
    var args = function(){ return arguments; }(1,2,3);

    expect(_.first(args, 2)).to.eql([1,2]);
  });

  it("should handle a null value gracefully", function() {
    expect(_.first(null)).to.equal(undefined);
  });
});

describe("each", function() {
  it("should provide value and iteration count", function() {
    var letters = ['a', 'b', 'c']
    var iterations = [];

    _.each(letters, function(letter, index, collection) {
      iterations.push([letter, index, collection]);
    });

    expect(iterations).to.eql([
      ['a', 0, letters],
      ['b', 1, letters],
      ['c', 2, letters],
    ]);
  });
});

describe("indexOf", function() {
  var numbers, num, index;

  it("should be able to compute indexOf even when the native function is undefined", function() {
    numbers = [1, 2, 3];
    numbers.indexOf = null;

    expect(_.indexOf(numbers, 2)).to.be(1);
  });

  it("should work on an arguments object", function() {
    var iterator = function() { return _.indexOf(arguments, 2); };
    var result = iterator(1, 2, 3);

    expect(result).to.be(1);
  });

  it("should handle nulls properly", function() {
    expect(_.indexOf(null, 2)).to.be(-1);
  });

  it("should not have 35 in the list", function() {
    numbers = [10, 20, 30, 40, 50];
    num = 35;
    index = _.indexOf(numbers, num, true);

    expect(index).to.be(-1);
  });

  it("should have 40 in the list", function() {
    numbers = [10, 20, 30, 40, 50];
    num = 40;
    index = _.indexOf(numbers, num, true);

    expect(index).to.be(3);
  });

  it("should have 40 in the list even when there are duplicates", function() {
    numbers = [1, 40, 40, 40, 40, 40, 40, 40, 50, 60, 70];
    num = 40;
    index = _.indexOf(numbers, num, true);

    expect(index).to.be(1);
  });

  it("should support the fromIndex argument", function() {
    numbers = [1, 2, 3, 1, 2, 3, 1, 2, 3];
    index = _.indexOf(numbers, 2, 5);

    expect(index).to.be(7);
  });
});

describe("filter", function() {
  it("should return all even numbers in an array", function() {
    var isEven = function(num) { return num % 2 === 0; };
    var evens = _.filter([1, 2, 3, 4, 5, 6], isEven);

    expect(evens).to.eql([2, 4, 6]);
  });

  it("should return all odd numbers in an array", function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);

    expect(odds).to.eql([1, 3, 5]);
  });
});

describe("reject", function() {
  it("should reject all even numbers", function() {
    var isEven = function(num) { return num % 2 === 0; };
    var odds = _.reject([1, 2, 3, 4, 5, 6], isEven);

    expect(odds).to.eql([1, 3, 5]);
  });

  it("should reject all odd numbers", function() {
    var isOdd = function(num) { return num % 2 !== 0; };
    var evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);

    expect(evens).to.eql([2, 4, 6]);
  });
});

describe("uniq", function() {
  it("should return all unique values contained in an unsorted array", function() {
    var list = [1, 2, 1, 3, 1, 4];

    expect(_.uniq(list)).to.eql([1, 2, 3, 4]);
  });

  it("should handle iterators that work with a sorted array", function() {
    var iterator = function(value) { return value +1; };
    var list = [1, 2, 2, 3, 4, 4];

    expect(_.uniq(list, true, iterator)).to.eql([1, 2, 3, 4]);
  });

  it("should work on an arguments object", function() {
    var result = (function() { return _.uniq(arguments); })(1, 2, 1, 3, 1, 4);

    expect(result).to.eql([1, 2, 3, 4]);
  });
});

describe("map", function() {
  it("should apply a function to every value in an array", function() {
    var doubled = _.map([1, 2, 3], function(num) { return num * 2; });

    expect(doubled).to.eql([2, 4, 6]);
  });
});

describe("pluck", function() {
  it("should return values contained at a user-defined property", function() {
    var people = [{name : 'moe', age : 30}, {name : 'curly', age : 50}];

    expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
  });
});

describe("invoke", function() {
  it("should sort the first array", function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, 'sort');

    expect(result[0]).to.eql([1, 5, 7]);
  });

  it("should sort the second array", function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, 'sort');

    expect(result[1]).to.eql([1, 2, 3]);
  });
});


describe("invoke with function reference", function() {
  it("should sort the first array", function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, Array.prototype.sort);

    expect(result[0]).to.eql([1, 5, 7]);
  });

  it("should sort the second array", function() {
    var list = [[5, 1, 7], [3, 2, 1]];
    var result = _.invoke(list, Array.prototype.sort);

    expect(result[1]).to.eql([1, 2, 3]);
  });
});

describe("reduce", function() {
  it("should be able to sum up an array", function() {
    var callback = function(sum, num) {return sum + num; };
    var sum = _.reduce([1, 2, 3], callback, 0);

    expect(sum).to.equal(6);
  });

  it("should handle a null value gracefully (as long as the user provides an initial value)", function() {
    var sum = _.reduce([1, 2, 3], function(sum, num) { return sum + num; });

    expect(sum).to.equal(6);
  });

  it("should handle a null value gracefully (as long as the user provides an initial value)", function() {
    expect(_.reduce(null, function() {}, 138)).to.equal(138);
  });
});

describe("contains", function() {
  it("should return true if a collection contains a user-specified value", function() {
    expect(_.contains([1,2,3], 2)).to.equal(true);
    expect(_.contains({moe:1, larry:3, curly:9}, 3)).to.equal(true);
  });

  it("should return false if a collection does not contain a user-specified value", function() {
    expect(_.contains([1,3,9], 2)).to.equal(false);
  });
});

describe("every", function() {
  var getValue = function(i) { return i; };
  var isEven = function(num) { return num % 2 === 0; };

  it("should handle an empty set", function() {
    expect(_.every([], getValue) ).to.equal(true);
  });

  it("should handle a set that contains only true values", function() {
    expect(_.every([true, true, true], getValue)).to.equal(true);
  });

  it("should handle a set that contains one false value", function() {
    expect(_.every([true, false, true], getValue)).to.equal(false);
  });

  it("should handle a set that contains even numbers", function() {
    expect(_.every([0, 10, 28], isEven)).to.equal(true);
  });

  it("should handle a set that contains an odd number", function() {
    expect(_.every([0, 11, 28], isEven)).to.equal(false);
  });

  it("should cast to boolean true", function() {
    expect(_.every([1], getValue)).to.equal(true);
  });

  it("should cast to boolean false", function() {
    expect(_.every([0], getValue)).to.equal(false);
  });

  it("should work with an array that contains several undefined values", function() {
    expect(_.every([undefined, undefined, undefined], getValue)).to.equal(false);
  });
});

describe("any", function() {
  var nativeSome;

  beforeEach(function() {
    nativeSome = Array.prototype.some;
    Array.prototype.some = null;
  });
  afterEach(function() {
    Array.prototype.some = nativeSome;
  });

  it("should handle the empty set", function() {
    expect(_.any([])).to.equal(false);
  });

  it("should handle a set containing 'false' values", function() {
    expect(_.any([false, false, false])).to.equal(false);
  });

  it("should handle a set containing one 'true' value", function() {
    expect(_.any([false, false, true])).to.equal(true);
  });

  it("should handle a set containing a string", function() {
    expect(_.any([null, 0, 'yes', false])).to.equal(true);
  });

  it("should handle a set that contains falsy values", function() {
    expect(_.any([null, 0, '', false])).to.equal(false);
  });

  it("should handle a set that contains all odd numbers", function() {
    var isEven = function(num) { return num % 2 === 0; };

    expect(_.any([1, 11, 29], isEven)).to.equal(false);
  });

  it("should handle a set that contains an even number", function() {
    var isEven = function(num) { return num % 2 === 0; };

    expect(_.any([1, 10, 29], isEven)).to.equal(true);
  });

  it("should handle casting to boolean - true", function() {
    var getValue = function(i) { return i; };

    expect(_.any([1], getValue)).to.equal(true);
  });

  it("should handle casting to boolean - false", function() {
    var getValue = function(i) { return i; };

    expect(_.any([0], getValue)).to.equal(false);
  });
});

describe("extend", function() {
  it("should extend an object with the attributes of another", function() {
    expect(_.extend({}, {a:'b'}).a).to.equal('b');
  });

  it("should override properties found on the destination", function() {
    expect(_.extend({a:'x'}, {a:'b'}).a).to.equal('b');
  });

  it("should not override properties not found in the source", function() {
    expect(_.extend({x:'x'}, {a:'b'}).x).to.equal('x');
  });

  it("should extend from multiple source objects", function() {
    var result = _.extend({x:1}, {a:2}, {b:3});

    expect(result.x == 1 && result.a == 2 && result.b == 3).to.be(true);
  });

  it("in the case of a conflict, it should use the last property's values when extending from multiple source objects", function() {
    var result = _.extend({x:'x'}, {a:'a', x:2}, {a:'b'});

    expect(result).to.eql({x:1, a:2, b:3});
  });

  it("should not copy undefined values", function() {
    var result = _.extend({}, {a: void 0, b: null});

    expect(result.hasOwnProperty('a') && result.hasOwnProperty('b')).to.be(true);
  });
});

describe("defaults", function() {
  var result, options;

  beforeEach(function() {
    options = {zero: 0, one: 1, empty: "", nan: NaN, string: "string"};
    _.defaults(options, {zero: 1, one: 10, twenty: 20}, {empty: "full"}, {nan: "nan"}, {word: "word"}, {word: "dog"});
  });

  it("should apply a value when one doesn't already exist on the target", function() {
    expect(options.zero).to.equal(0);
    expect(options.one).to.equal(1);
    expect(options.twenty).to.equal(20);
  });

  it("should not apply a value if one already exist on the target", function() {
    expect(options.empty).to.equal("");
    expect(isNaN(options.nan)).to.equal(true);
  });

  it("if two identical values are passed in, the first one wins", function() {
    expect(options.word).to.equal("word");
  });
});

describe("once", function() {
  it("should only run a user-defined function if it hasn't been run before", function() {
    var num = 0;
    var increment = _.once(function() { num++; });
    increment();
    increment();

    expect(num).to.equal(1);
  });
});

describe("memoize", function() {
  it("a memoized function should produce the same result when called with the same arguments", function() {
    var fib = function(n) {
      return n < 2 ? n
                   : fib(n - 1) + fib(n - 2);
    };
    var fastFib = _.memoize(fib);

    expect(fib(10)).to.equal(55);
    expect(fastFib(10)).to.equal(55);
  });

  it("should check hasOwnProperty", function() {
    var o = function(str) {
      return str;
    };
    var fastO = _.memoize(o);

    expect(o('toString')).to.equal('toString');
    expect(fastO('toString')).to.equal('toString');
  });
});

describe("delay", function() {
  var clock, delayed, callback;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    callback = sinon.spy();
  });

  afterEach(function() {
    clock.restore();
  });

  it("should only execute the function after the specified wait time", function() {
    _.delay(callback, 100);

    clock.tick(99);
    expect(callback.notCalled).to.be(true);
    clock.tick(1);
    expect(callback.calledOnce).to.be(true);
  });

  it("should have successfully passed function arguments in", function() {
    _.delay(callback, 100, 1, 2);
    clock.tick(100);

    expect(callback.calledWith(1, 2)).to.be(true);
  });
});

describe("shuffle", function() {
  it("should not modify the original object", function() {
    var numbers = _.range(10);
    var shuffled = _.shuffle(numbers);

    expect(shuffled.sort()).to.eql(numbers);
  });
});

describe("sortBy", function() {
  it("should sort by age", function() {
    var people = [{name : 'curly', age : 50}, {name : 'moe', age : 30}];
    people = _.sortBy(people, function(person) {
      return person.age;
    });

    expect(_.pluck(people, 'name')).to.eql(['moe', 'curly']);
  });

  it("should handle undefined values", function() {
    var list = [undefined, 4, 1, undefined, 3, 2];
    var result = _.sortBy(list, function(i) { return i; });

    expect(result).to.eql([1, 2, 3, 4, undefined, undefined]);
  });

  it("should sort by length", function() {
    var list = ["one", "two", "three", "four", "five"];
    var sorted = _.sortBy(list, 'length');

    expect(sorted).to.eql(['one', 'two', 'four', 'five', 'three']);
  });

  it("should produce results that change the order of the list as little as possible", function() {
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

    expect(actual).to.eql(collection);
  });
});

describe("zip", function() {
  it("should zip together arrays of different lengths", function() {
    var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
    var stooges = _.zip(names, ages, leaders);

    expect(String(stooges)).to.equal('moe,30,true,larry,40,,curly,50,');
  });
});

describe("flatten", function() {
  it("can flatten nested arrays", function() {
    var nestedArray = [1, [2], [3, [[[4]]]]];
    var result = JSON.stringify(_.flatten(nestedArray));

    expect(result).to.equal('[1,2,3,4]');
  });

  it("works on an arguments object", function() {
    var iterator = function() { return _.flatten(arguments); };
    var result = iterator(1, [2], [3, [[[4]]]]);

    expect(JSON.stringify(result)).to.equal('[1,2,3,4]');
  });
});

describe("intersection", function() {
  var stooges, leaders;

  beforeEach(function() {
    stooges = ['moe', 'curly', 'larry'];
    leaders = ['moe', 'groucho'];
  });

  it("should take the set intersection of two arrays", function() {
    expect(_.intersection(stooges, leaders)).to.eql(['moe']);
  });

  it("should work on an arguments object", function() {
    var iterator = function() { return _.intersection(arguments, leaders); };
    var result = iterator('moe', 'curly', 'larry');

    expect(result).to.eql(['moe']);
  });
});

describe("difference", function() {
  it("should return the difference between two arrays", function() {
    var diff = _.difference([1,2,3], [2,30,40]);

    expect(diff).to.eql([1,3]);
  });

  it("should return the difference between three arrays", function() {
    var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);

    expect(result).to.eql([3, 4]);
  });
});
