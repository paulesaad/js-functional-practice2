// using our own forEach(), map(), reduce(), and filter()
// functions written in js-functions-functional-practice-1

function forEach(array, callback){
    // YOUR CODE HERE
    for (var i=0; i<array.length; i++){
        callback(array[i], i, array)
    }
}

// tests
// ---
var total = 1
forEach([1, 2, 3, 4], function(a){ total *= a; })
console.assert(total === 24)

// ----------------------------
// using forEach() from above, write your own reduce()
// that takes an array and a function
// ----------------------------

function reduce(array, callback, init){
    // YOUR CODE HERE
    var a = init ? init : array.shift()
    forEach(array, function(v, i, arr){
        a = callback(a, v, i, arr)
    })
    return a 
}

// tests
// ---
console.assert(
    reduce([1, 2, 3, 4], function(a, v){ return a*v }) === 24
)

// ----------------------------
// using forEach() from above, write your own map()
// that takes an array and a function
// ----------------------------

function map(array, callback){
    // YOUR CODE HERE
    var mapped = []
    forEach(array, function(v, i, arr) {
        mapped.push(callback(v, i, arr))
    })
    return mapped
}

// tests
// ---
var squares = map([1, 2, 3, 4], function(v){ return v*v })
console.assert(squares[0] === 1)
console.assert(squares[1] === 4)
console.assert(squares[2] === 9)
console.assert(squares[3] === 16)

// ----------------------------
// using reduce() from above, write your own filter()
// that takes an array and a function
// ----------------------------

function filter(array, callback){
    // YOUR CODE HERE
    return reduce(array, function(a, v, i, arr){
        callback(v, i, arr) && a.push(v)
        return a
    }, [])
}

// tests
// ---
var evens = filter([1, 2, 3, 4], function(v){ return v%2 === 0 })
console.assert(evens[0] === 2)
console.assert(evens[1] === 4)







// -----------
// Write a function pluck() that extracts a list of
// values associated with property names.
// -----------
function pluck(list, propertyName) {
    // YOUR CODE HERE
    return reduce(list, function(a, v, i, arr){
        a.push(v[propertyName])
        return a
    }, [])
}

// tests
// ---
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
console.assert(pluck(stooges, 'name')[0] === 'moe')
console.assert(pluck(stooges, 'age')[2] === 60)

// -----------
// Write a function reject() that does the opposite of filter,
// if the callback function returns a "truthy" value then that
// item is **not** inserted into the new collection,
// otherwise it is.
// -----------
function reject(list, predicate) {
    // YOUR CODE HERE
    return reduce(list, function(a, v, i, arr){
        !predicate(v, i, arr) && a.push(v)
        return a
    }, [])
}

// tests
// ---
var lt10 = [0,1,2,3,4,5,6,7,8,9,10]
var odds = reject(lt10, function(n){ return n%2 === 0 })
console.assert(odds[0] === 1)
console.assert(odds[1] === 3)
console.assert(odds[4] === 9)

// -----------
// Write a function find() that returns the very first item
// in a collection when the callback function returns true;
// otherwise returns undefined.
// -----------
function find(list, predicate) {
    // YOUR CODE HERE
    //use while loop and break?

    return filter(list, (predicate))[0]
}

// tests
// ---
var people = [
    {name: "Matt", teaches: "JS"},
    {name: "Jwo", teaches: "Ruby"},
    {name: "Dorton", teaches: "life"}
]
var JS = find(people, function(n){ return n.teaches === "JS" })
console.assert(JS.name === "Matt")

// -----------
// Write a function where() that filters for all the values
// in the properties object.
// -----------

function where(list, properties) {
    // YOUR CODE HERE
    return reduce(list, function(a, v, i, arr){
        var present = true
        for (var key in properties){
            if (properties[key] !== v[key]){
                present = false
            }
        }
        if (present === true) {
            a.push(v)
        }
        return a
    }, [])
}

// tests
// ---
var plays = [
    {title: "Cymbeline", author: "Shakespeare", year: 1623},
    {title: "The Tempest", author: "Shakespeare", year: 1623},
    {title: "Hamlet", author: "Shakespeare", year: 1603},
    {title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600},
    {title: "Macbeth", author: "Shakespeare", year: 1620},
    {title: "Death of a Salesman", author: "Arthur Miller", year: 1949},
    {title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949}
]

var sh8spr = where(plays, {author: "Shakespeare"})
console.assert(sh8spr instanceof Array)
console.assert(sh8spr.length === 5)
console.assert(sh8spr[0].title === "Cymbeline")

sh8spr = where(plays, {author: "Shakespeare", year: 1611})
console.assert(sh8spr.length === 0)

sh8spr = where(plays, {author: "Shakespeare", year: 1623})
console.assert(sh8spr.length === 2)

var midcentury = where(plays, {year: 1949})
console.assert(midcentury.length === 2)
