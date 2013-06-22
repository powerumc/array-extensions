/**
 *
 * Javascript Array Extensions
 *
 * Programming by Junil, Um
 *
 * http://powerumc.kr
 * http://blog.powerumc.kr
 * http://devwith.com
 *
 */


"use strict"
;

var _MESSAGE_OF_NULL_REFERENCES         = function(argName) { return argName + " is null (a) references."; };
var _MESSAGE_OF_NULL_ARGUMENTS          = function(argName) { return argName + " is null (an) arguments"; };
var _MESSAGE_OF_INVALID_ARGUMENTS       = function(argName, needsType) { return argName + " is (an) invalid arguments." + ( !needsType ? "It's have to " + needsTypeV : ""); };



var foreach = foreach || {

    "continue": true,
    "break"   : false

};

var comparer = comparer || {
    _ascending  : function(a, b) { return a - b },
    ascending   : this._ascending,
    asc         : this.ascending,
    _descending : function(a, b) { return b - a },
    descending  : this._descending,
    desc        : this.descending
};


function isFunction( fn ) {
    return typeof fn === 'function';
};

function isArray( obj ) {
    return typeof obj === "object" && obj instanceof Array;
};


function isObject( obj ) {
    return typeof obj === "object" && (isArray(obj) === false );
};

function isNumber( obj ) {
    return typeof obj === "number";
};

function isString( obj ) {
    return typeof obj === "string";
};

function isBoolean( obj ) {
    return typeof obj === "boolean";
};

function _cloneObject( obj ) {

    console.info(obj.toString() + " cloned type = " + typeof obj);

    if( isString(obj) || isNumber(obj) || isBoolean(obj)) {
        return obj.constructor(obj);
    }

    if( isArray(obj)) {
        return Array.clone(obj);
    }

    var prop = Object.getOwnPropertyNames(obj);
    if( prop && prop.length === 0) {
        return new Object(obj);
    }
    var newObj = new Object();
    for(var i=0; i<prop.length; i++) {

        var item = obj[prop[ i ]];

        if( isObject(item) ) {
            _cloneObject(item);
        }

        newObj[ prop[i] ] = item;
    }

    return newObj;

};

function print( obj ) {

    if( isString(obj) || isNumber(obj) || isBoolean(obj)) {
        console.info("print :      " + obj);
        return;
    }

        var prop = Object.getOwnPropertyNames(obj);
        if( prop && prop.length === 0) {
            return;
        }
        for(var i=0; i<prop.length; i++) {

            console.info("print : " + prop[i]);

            var item = obj[prop[ i ]];

                print(item);
        }
}


Object.clone = function(obj) {
    return _cloneObject(obj);
};


Object.prototype.isFunction = function() {
    return isFunction(this);
};

Object.prototype.isArray = function() {
    return isArray(this);
};

Object.prototype.isObject = function() {
    return isObject(this);
};

Object.prototype.isNumber = function() {
    return isNumber(this);
};

Object.prototype.isString = function() {
    return isString(this);
};


Array.clone = function( array ) {

    array   = (array && array.isArray()) ? array : [ array ];

    var arr = [];
    for(var i=0; i<array.length; i++) {
        arr.push( Object.clone(array[ i ]) );
    }

    return arr;
};

Array.prototype.foreach = function(fn, args) {

    if( this.isArray())
    {
        if(fn.isFunction()) {

            var num, obj, param;
            for(var i=0;i<this.length;i++) {

                num     = i;
                obj     = this[i];
                param   = args;

                if( fn.length === 1 ) num = obj;

                var isContinue = fn.apply(this, [ num, this[i], args ]);

                if ( isContinue === false ) break;

            }
        }
    }
};


Array.prototype.any = function( predicate ) {


    if( predicate && predicate.isFunction()) {
        for( var i in this)
        {
            if(predicate(i)) return true;
        }

        return false;
    }
    else {
        if( this.length > 0 ) return true;
    }

};


Array.prototype.first = function( predicate )
{
    if ( predicate && predicate.isFunction()) {

        for(var i=0;i<this.length;i++) {
            if(predicate(this[i])) return this[i];
        }

        throw _MESSAGE_OF_NULL_REFERENCES("no predicate")
    }
    else {
        var ret = this.length > 0 ? this[0] : null;
        if( ret === null ) throw _MESSAGE_OF_NULL_REFERENCES("ret");

        return ret;
    }
};


Array.prototype.firstOrDefault = function( predicate ) {
    if ( predicate && predicate.isFunction()) {

        for(var i=0;i<this.length;i++) {
            if(predicate(this[i])) return this[i];
        }

        return null;
    }
    else {
        return this.length > 0 ? this[0] : null;
    }
};

Array.prototype.firstOrNew = function ( predicate ) {
    var first = this.firstOrDefault(predicate);

    return first || [];
};


Array.prototype.lastOrDefault = function( predicate ) {
    if ( predicate && predicate.isFunction()) {

        for(var i=this.length-1;i>=0;i--) {
            if(predicate(this[i])) return this[i];
        }

        return null;
    }
    else {
        var ret = this.length > 0 ? this[this.length-1] : null;
        if( ret === null ) return null;

        return ret;
   }
};

Array.prototype.lastOrNew = function( predicate ) {
    var last = this.lastOrDefault(predicate);

    return last || [];
};

Array.prototype.last = function( predicate ) {
    var last = this.lastOrDefault(predicate);

    if( !last ) throw "Null Reference";

    return last;
};



Array.prototype.select = function( selector ) {
    if( selector && selector.isFunction()) {
        var arr = [];
        for(var i=0; i<this.length; i++) {
            arr.push( selector(this[i]) );
        }

        return arr;
    }
    else {
    }
};

Array.prototype.where = function( selector ) {
    if( selector && selector.isFunction()) {
        var arr = [];
        for(var i=0; i<this.length; i++) {
            if( selector(this[i])) {
                arr.push(this[i]);
            }
        }

        return arr;

    } else {
        var arr = [];
        for(var i=0; i<this.length; i++ ) {
            if( this[i] == selector ) {
                arr.push(this[i]);
            }
        }

        return arr;
    }
};



Array.prototype.orderBy = function( _comparer ) {

    _comparer = _comparer || comparer.ascending;

    return this.sort(_comparer);
};


Array.prototype.take = function( number ) {

    if( arguments.length === 0 ) throw "take method needs an argument of number";

    if( number && number.isNumber()) {
        number = number > this.length ? this.length : number;

        var arr = [];
        for(var i=0; i<number; i++) {
            arr.push( this[i] );
        }

        return arr;
    }
};

Array.prototype.skip = function( number ) {

    if( arguments.length === 0 ) throw "skip method needs an argument of number";

    if( number && number.isNumber()) {
        number = number > this.length ? this.length : number;

        var arr = [];
        for(var i=number; i<this.length; i++) {
            arr.push( this[i] );
        }

        return arr;
    }

}

Array.prototype.sum = function( selector ) {

    var sum = 0;
    if( selector && selector.isFunction()) {

        for(var i=0; i<this.length; i++) {
            sum += selector( this[i] );
        }

    } else {

        for(var i=0; i<this.length; i++) {

            var current = this[i];

            if( current.isNumber()) {
                sum += current;
            } else if( current.isString()) {

                if( current.indexOf(".") > 0) {
                    sum += parseFloat(current);
                }
                else {
                    sum += parseInt(current);
                }
            }
        }
    }

    return sum;
};

Array.prototype.average = function( selector ) {

    if( this.length === 0 ) return 0;

    var sum = this.sum(selector);

    return sum / this.length;
};

Array.prototype.max = function( predicate ) {

    var max;

    if( this.length === 0 ) throw "no array data";

    if( this.length > 0 ) max = this[0];

    if( predicate && predicate.isFunction() ) {

        for(var i=0; i<this.length; i++ ) {
            var pred = predicate(this[i]);
            if( pred && max < this[i] ) {
                max = this[i];
            }
        }

    } else {

        for(var i=0; i<this.length; i++) {
            var dest = this[i];
            if( max < dest ) {
                max = dest;
            }
        }
    }

    return max;
}

Array.prototype.min = function( predicate ) {
    var min;

    if( this.length === 0 ) throw "no array data";

    if( this.length > 0 ) min = this[0];

    if( predicate && predicate.isFunction() ) {

        for(var i=0; i<this.length; i++ ) {
            var pred = predicate(this[i]);
            if( pred && min > this[i] ) {
                min = this[i];
            }
        }

    } else {

        for(var i=0; i<this.length; i++) {
            var dest = this[i];
            if( min > dest ) {
                min = dest;
            }
        }
    }

    return min;
}


Array.range = function( start, max, step ) {

    if( arguments.length === 0 )        throw "range method needs one or more arguments"
    if( start && !start.isNumber())     throw _MESSAGE_OF_INVALID_ARGUMENTS("start", "Number");
    if( max   && !max.isNumber())       throw _MESSAGE_OF_INVALID_ARGUMENTS("max", "Number");
    if( step  && !step.isNumber())      throw _MESSAGE_OF_INVALID_ARGUMENTS("step", "Number");


    var arr = [];
    _range(arr, start, max, step);

    return arr;
};


function _range( arr, start, max, step ) {
    step = step || 1;

    if( !arr || !arr.isArray() ) throw _MESSAGE_OF_NULL_ARGUMENTS("arr");
    if( !max ) {
        max     = start;
        start   = 0;
    }

    if( start >= max ) return;

    for(var i=start; i<max; i+= step) {
        arr.push( i );
    }
}


Array.prototype.range = function( start, max, step ) {

    if( arguments.length === 0 )        throw "range method needs one or more arguments";
    if( start && !start.isNumber())     throw _MESSAGE_OF_INVALID_ARGUMENTS("start", "Number");
    if( max   && !max.isNumber())       throw _MESSAGE_OF_INVALID_ARGUMENTS("max", "Number");
    if( step  && !step.isNumber())      throw _MESSAGE_OF_INVALID_ARGUMENTS("step", "Number");

    _range(this, start, max, step);

    return this;
};


function _union( first, second ) {

    first  = (first  && first.isArray())    ? first : [ first ];
    second = (second && second.isArray())   ? second : [ second ];

    var arr = Array.clone(first);

    for(var i=0; i<second.length; i++) {
        arr.push( Object.clone(second[ i ]) );
    }

    return arr;
}


Object.union = function(first, second) {
    return _union( first, second );
}

Array.union = function(first, second) {
    return _union(first, second);
}

Array.prototype.union = Array.prototype.union || function( second ) {

    if( arguments.length === 0 )        throw "second argument needs an array";
    if( second && !second.isArray())    throw _MESSAGE_OF_INVALID_ARGUMENTS("second", "Array");

    return _union( this, second );
};
