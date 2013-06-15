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
var isFunction = function(fn) {
    return typeof fn === 'function';
};

var isArray = function(obj) {
    return typeof obj === 'object' && obj instanceof Array;
};

Object.prototype.isFunction = function()
{
    return isFunction(this);
};

Object.prototype.isArray = function()
{
    return isArray(this);
};

Object.prototype.isNumber = function() {
    return typeof this === "number";
};

Object.prototype.isString = function() {
    return typeof this === "string";
}


var foreach = foreach || {

    "continue": true,
    "break"   : false

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

        throw "Null References";
    }
    else {
        var ret = this.length > 0 ? this[0] : null;
        if( ret === null ) throw "Null References";

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

var comparer = comparer || {
    _ascending  : function(a, b) { return a - b },
    ascending   : this._ascending,
    asc         : this.ascending,
    _descending : function(a, b) { return b - a },
    descending  : this._descending,
    desc        : this.descending
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


function _range( start, max, step, arr ) {
    step = step || 1;

    if( !arr || !arr.isArray() ) throw "_range arr is undefined";
    if( !max ) {
        max     = start;
        start   = 0;
    }

    if( start >= max ) return;

    for(var i=start; i<max; i+= step) {
        arr.push( i );
    }
}

Array.range = function( start, max, step ) {

    if( arguments.length === 0 )        throw "range method needs one or more arguments"
    if( start && !start.isNumber())     throw "range argument 'start' needs number type";
    if( max   && !max.isNumber())       throw "range argument 'max' needs number type";
    if( step  && !step.isNumber())      throw "range argument 'step' needs number type";


    var arr = [];
    _range(start, max, step, arr);

    return arr;
};

Array.prototype.range = function( start, max, step ) {

    if( arguments.length === 0 )        throw "range method needs one or more arguments"
    if( start && !start.isNumber())     throw "range argument 'start' needs number type";
    if( max   && !max.isNumber())       throw "range argument 'max' needs number type";
    if( step  && !step.isNumber())      throw "range argument 'step' needs number type";

    _range(start, max, step, this);

    return this;
}




function newid() {

}
