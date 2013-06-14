# Javascript Array Extensions


- It is an array extensions that can be used javascript and node.js.
- It is just likes C# extension methods or lambda expression can be used.

## Basics

any( predicate )
```js
[1,2,3,4,5].any();     // True
[1,2,3,4,5].any(function(i) { return i > 3; });    // True
[1,2,3,4,5].any(function(i) { return i > 5; });    // False
```
first - ( predicate )
```js
[1,2,3].first();    // 1

[3,5,6].firstOrNew(function(i) { return i > 5; });    // 6
[3,5,6].firstOrNew(function(i) { return i > 6; });    // []    is new Array()

[3,6,9].firstOrDefault();    // 3
[3,6,9].firstOrDefault(function(i) { return i > 3; });    // 6
[3,4,5].firstOrDefault(function(i) { return i > 5; });    // Null
```
last - ( predicate )
```js
[3,6,9].last();    // 9
[3,6,9].last(function(i) { return i > 100; });    // throw null references

[3,6,9].lastOrDefault();    // 9
[3,6,9].lastOrDefault(function(i) { return i < 9 });    // 6

[3,6,9].lastOrNew(function(i) { return i < 5 });    // 3
[3,6,9].lastOrNew(function(i) { return i < 2; });    // []    is new Array()
```

## Selector and Condition

select( selector )

```js
var selected = arr.select(function(o) {
    return { name: o.key, website: o.value };
});

// results var selected
select name=powerumc,   website=http://blog.powerumc.kr
select name=devth,      website=http://devwith.com
select name=domain,     website=http://powerumc.kr
```

where( selector )
```js
var selected = arr.where(function(o) {
    return o.value.lastIndexOf(".kr") > 0
});

// results var selected
where lastIndexOf('.kr')=http://blog.powerumc.kr
where lastIndexOf('.kr')=http://powerumc.kr
```



## Loop

foreach ( i, object, args )
```js
var arr = [ { "key": "powerumc",    "value": "http://blog.powerumc.kr" },
            { "key": "devth",       "value": "http://devwith.com" },
            { "key": "domain",      "value": "http://powerumc.kr" }];

arr.foreach(function(o) {
    console.info("foreach o=" + o.key);
});

// results
foreach o=powerumc
foreach o=devth
foreach o=domain


arr.foreach(function(i, o) {
   console.info("foreach i=" + i + " key=" + o.key);
});

// results
foreach i=0 key=powerumc
foreach i=1 key=devth
foreach i=2 key=domain


arr.foreach(function(i, o, arg) {
   console.info("foreach i=" + i + " key=" + o.key + "  arg=" + arg);
}, "this is arguments");

// results
foreach i=0 key=powerumc  arg=this is arguments
foreach i=1 key=devth  arg=this is arguments
foreach i=2 key=domain  arg=this is arguments
```

foreach ( i, object, args ) with **foreach.continue**
```js
arr.foreach(function(i, o) {
    if( i > 1) {
        return foreach.continue;
    }

    console.info("foreach continue i = " + i + "   key = " + o.key);
});

// results
foreach continue i = 0   key = powerumc
foreach continue i = 1   key = devth
```


foreach ( i, object, args ) with **foreach.break**
```
arr.foreach(function(i, o) {
    if( i == 1 ) {
        return foreach.break;
    }

    console.info("foreach break i = " + i + "   key = " + o.key);
});

// results
foreach break i = 0   key = powerumc
```
