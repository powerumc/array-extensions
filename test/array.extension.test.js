"use strict"
;

var arr = [ { "key": "powerumc",    "value": "http://blog.powerumc.kr" },
            { "key": "devth",       "value": "http://devwith.com" },
            { "key": "domain",      "value": "http://powerumc.kr" }];


TestCase("array.extensions.js", {

    "test.any": function() {
        var result = [1,2,3,4,5].any();
        assertTrue(result);
        console.info(result);
    },

    "test.any(fn)": function() {
        var result = [1,2,3,4,5].any(function(i) { return i > 3; });
        assertTrue(result);
        console.info(result);
    },

    "test.any(fn)_should_be_fail": function() {
        var result = [1,2,3,4,5].any(function(i) { return i > 5; });
        assertFalse(result);
        console.info(result);
    },

    "test.first": function() {

        var result = [1,2,3].first();
        assertEquals(result, 1);

    },

    "test.firstOrNew": function() {
        var result = [3,5,6].firstOrNew(function(i) { return i > 5; });
        assertEquals(result, 6);

        result = [3,5,6].firstOrNew(function(i) { return i > 6; });
        assertEquals(result, []);
    },

    "test.firstOrDefault": function () {
        var result = [3,6,9].firstOrDefault();
        assertEquals(result, 3);
    },

    "test.defaultOrDefault(fn)": function() {
        var result = [3,6,9].firstOrDefault(function(i) { return i > 3; });
        assertEquals(result, 6);
    },

    "test.defaultOrDefault(fn)_must_be_null": function () {
        var result = [3,4,5].firstOrDefault(function(i) { return i > 5; });
        assertNull(result);
    },



    "test.last": function() {
        {
            var result = [3,6,9].last();
            assertEquals(result, 9);
        }
        {
            try {
                var result = [3,6,9].last(function(i) { return i > 100; });
            }
            catch(err) {
                console.info(err);
            }
        }
    },

    "test.lastOrDefault": function() {
        {
            var result = [3,6,9].lastOrDefault();
            console.info(result);
            assertEquals(result, 9);
        }

        {
            var result = [3,6,9].lastOrDefault(function(i) { return i < 9 });
            console.info(result);
            assertEquals(result, 6);
        }

        {
            var result = [3,6,9].lastOrDefault(function(i) { return i < 6 });
            console.info(result);
            assertEquals(result, 3);
        }
    },

    "test.lastOrNew": function() {

        {
            var result = [3,6,9].lastOrNew(function(i) { return i < 5 });
            assertEquals(result, 3);
        }

        {
            var result = [3,6,9].lastOrNew(function(i) { return i < 2; });
            assertEquals(result, []);
        }

    },


    "test.select": function() {
        var selected = arr.select(function(o) {
            return { name: o.key, website: o.value };
        });

        for(var i=0; i<selected.length; i++ ) {
            console.info("select name=" + selected[i].name + ",  website=" + selected[i].website );

            assertEquals(selected[i].name, arr[i].key);
            assertEquals(selected[i].website, arr[i].value);
        }
    },

    "test.where": function() {
        console.info("test.where-----------------------------");
        var selected = arr.where(function(o) {
            return o.value.lastIndexOf(".kr") > 0
        });

        for(var i=0; i<selected.length; i++) {
            console.info("where lastIndexOf('.kr')=" + selected[i].value)
        }
    },


    "test.foreach": function() {

        arr.foreach(function(o) {
            console.info("foreach o=" + o.key);
        });

        arr.foreach(function(i, o) {
            console.info("foreach i=" + i + " key=" + o.key);
        });

        arr.foreach(function(i, o, arg) {
            console.info("foreach i=" + i + " key=" + o.key + "  arg=" + arg);
        }, "this is arguments");
    },

    "test.foreach.continue": function() {

        arr.foreach(function(i, o) {
            if( i > 1) return foreach.continue;

            console.info("foreach continue i = " + i + "   key = " + o.key);
        })
    },

    "test.foreach.break": function() {

        arr.foreach(function(i, o) {
            if( i == 1 ) return foreach.break;

            console.info("foreach break i = " + i + "   key = " + o.key);
        });

    },




    "test.orderBy": function() {

        var arr = [ 23, 8, 43 ,81, 4, 32, 64 ];

        arr = arr.orderBy();
        for(var i=0; i<arr.length; i++ ) {
            console.info("orderBy (default) " + arr[i]);
        }

        arr = arr.orderBy(comparer.ascending);
        for(var i=0; i<arr.length; i++ ) {
            console.info("orderBy comparer.ascending " + arr[i]);
        }

        arr = arr.orderBy(comparer.descending);
        for(var i=0; i<arr.length; i++) {
            console.info("orderBy comparer.descending " + arr[i]);
        }

    },


    "test.take": function() {

        var arr = [1,2,3,4,5,6,7,8,9,10];
        var take =  arr.take(5).toString();

        console.info( "take = " + take);
        assertEquals(take, "1,2,3,4,5");

        var takeover = arr.take(100).toString();
        console.info("take over = " + takeover)
        assertEquals(takeover, "1,2,3,4,5,6,7,8,9,10");
    },

    "test.skip": function() {

        var arr = [1,2,3,4,5,6,7,8,9,10];
        var skip = arr.skip(5).toString();

        console.info("skip = " + skip);
        assertEquals(skip, "6,7,8,9,10");

        var skipover = arr.skip(100).toString();
        console.info("skip over = " + skipover + "   a space is empty new Array()");
        assertEquals(skipover, []);
    },

    "test.take.and.skip": function() {

        var arr         = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        var take        = 5;
        var count       = 5;
        var page        = 2;
        var pagingList  = arr.skip( page * count ).take(take);

        console.info("take and skip " + pagingList);
        assertEquals(pagingList, "11,12,13,14,15");

    },

    "test.sum.number": function() {
        var arr = [1,2,3,4,5,6,7,8,9,10];
        var sum = arr.sum();

        console.info("sum number = " + sum);
    },

    "test.sum.number.float": function() {

        var arr = [1,2,3,"4",5,6,7,8, "9", "10.5"];
        var sum = arr.sum();

        console.info("sum float number = " + sum);
    },

    "test.sum.selector": function() {

        var arr = [1,2,3,4,5,6,7,8,9, 10.5];
        var sum = arr.sum(function(i) { return i / 2; });

        console.info("sum selector = " + sum);
    },

    "test.average number": function() {

        var arr = [1,2,3,4,5,6,7,8,9,10];
        var avg = arr.average();

        console.info("average number = " + avg);
    },
    "test.average.float": function() {

        var arr = [1,2,3,"4",5,6,7,8, "9", "10.5"];
        var avg = arr.average();

        console.info("average float = " + avg);
    },
    "test.average.selector": function() {

        var arr = [1,2,3,4,5,6,7,8,9, 10.5];
        var avg = arr.average(function(i) { return i * 2; });

        console.info("average selector = " + avg);
    },

    "test.range": function() {

        var arr = Array.range(10);
        console.info("range(10) = " + arr);
        assertEquals(arr.toString(), "0,1,2,3,4,5,6,7,8,9");

    },
    "test.range.max": function() {

        var arr = Array.range(10, 20);
        console.info("range(10,20) = " + arr);
        assertEquals(arr.toString(), "10,11,12,13,14,15,16,17,18,19");
    },
    "test.range.max.step": function() {

        var arr = Array.range(0, 10, 2);
        console.info("range(0,10,2) = " + arr);
        assertEquals(arr.toString(), "0,2,4,6,8");

    },
    "test.range.prototype": function() {

        var arr = [0,1,2,3,4,5];
        arr.range(6, 10);
        console.info("range.prototype = " + arr);
        assertEquals(arr.toString(), "0,1,2,3,4,5,6,7,8,9");

        var range = [].range(0,10);
        console.info("range.prototype.this = " + range);
        assertEquals(range.toString(), "0,1,2,3,4,5,6,7,8,9");
    }

















    ,
    "test.complex1": function() {

        var sum = Array.range(1, 11).sum();
        console.info("complex sum = " + sum);
        assertEquals(sum, 55);


        var arr = Array.range(1, 10)
                       .select(function(i) { return { number:i, name:"POWERUMC " + i } })
                       .where(function(o) { return o.number >= 5 })
                       .take(3);

        for(var i=0; i< arr.length; i++) {
            console.info("complex arr = " + arr[i].name);
        }


        // comparer 에 key 를 넣을 수 있게...

        /*
        function Comparer(keys) {
        }

        new Comparer( { arr.a, arr.b });

         */
    }

});

