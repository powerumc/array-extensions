/**
 * Created with JetBrains WebStorm.
 * User: powerumc
 * Date: 13. 5. 28.
 * Time: 오전 10:24
 * To change this template use File | Settings | File Templates.
 */

"use strict"

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

Array.prototype.foreach = function(fn, args) {

    if( this.isArray())
    {
        if(fn.isFunction()) {

            for(var i=0;i<this.length;i++) {
                fn.apply(this, [ i, this[i], args ]);
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


Array.prototype.last = function( predicate ) {
    if ( predicate && predicate.isFunction()) {

        for(var i=this.length-1;i>0;i--) {
            if(predicate(this[i])) return this[i];
        }

        return null;
    }
    else {
        var ret = this.length > 0 ? this[this.length-1] : null;
        if( ret === null ) throw "Null References";

        return ret;
   }
};


