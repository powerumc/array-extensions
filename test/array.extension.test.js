"use strict"
;
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

    "test.foreach": function() {
        var arr = [ { "key": "powerumc",    "value": "http://blog.powerumc.kr" },
                    { "key": "devth",       "value": "http://devwith.com" },
                    { "key": "domain",       "value": "http://powerumc.kr" }];

        arr.foreach(function(i) {
           console.info("foreach i=" + i);
        });

        arr.foreach(function(i, o) {
            console.info("foreach i=" + i + " key=" + o.key);
        });

        arr.foreach(function(i, o, arg) {
            console.info("foreach i=" + i + " key=" + o.key + "  arg=" + arg);
        }, "this is arguments");
    }/*,


    "test.select": function() {

        var arr = [ { "key": "powerumc",    "value": "http://blog.powerumc.kr" },
            { "key": "devth",       "value": "http://devwith.com" },
            { "key": "domain",       "value": "http://powerumc.kr" }];

        for(var i=0; i<arr.length; i++) {
            console.info(arr[i].key);
        }
    }
*/


});

