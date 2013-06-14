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