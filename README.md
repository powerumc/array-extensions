# Javascript Array Extensions


- t is an array extensions that can be used javascript and node.js.
- It is just likes C# extension methods or lambda expression can be used.

## Basics

any( predicate )

    [1,2,3,4,5].any();     // True
    [1,2,3,4,5].any(function(i) { return i > 3; });    // True
    [1,2,3,4,5].any(function(i) { return i > 5; });    // False

first - ( predicate )

    [1,2,3].first();    // 1

    [3,5,6].firstOrNew(function(i) { return i > 5; });    // 6
    [3,5,6].firstOrNew(function(i) { return i > 6; });    // []    is new Array()

    [3,6,9].firstOrDefault();    // 3
    [3,6,9].firstOrDefault(function(i) { return i > 3; });    // 6
    [3,4,5].firstOrDefault(function(i) { return i > 5; });    // Null

last - ( predicate )

    [3,6,9].last();    // 9
    [3,6,9].last(function(i) { return i > 100; });    // throw null references

    [3,6,9].lastOrDefault();    // 9
    [3,6,9].lastOrDefault(function(i) { return i < 9 });    // 6

    [3,6,9].lastOrNew(function(i) { return i < 5 });    // 3
    [3,6,9].lastOrNew(function(i) { return i < 2; });    // []    is new Array()



## Loop

    foreach ( i, object, args )

    var arr = \[ { "key": "powerumc",    "value": "http://blog.powerumc.kr" },
                { "key": "devth",       "value": "http://devwith.com" },
                { "key": "domain",      "value": "http://powerumc.kr" }];

       arr.foreach(function(i) {
          console.info("foreach i=" + i);
       });

   // results
   foreach i=0
   foreach i=1
   foreach i=2


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
