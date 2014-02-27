var merge = require( "sc-merge" );

var optionify = function ( value, options ) {
  var valueIsAFunction = typeof value === "function",
    obj = valueIsAFunction ? value.prototype : value;

  if ( Object.hasOwnProperty.call( obj, "__optionify" ) && obj.__optionify === true ) {
    return;
  }

  options = merge( {
    propertyName: "options",
    methodName: "option"
  }, options );

  obj[ options.propertyName ] = {};

  Object.defineProperty( obj, "__optionify", {
    value: true
  } );

  Object.defineProperty( obj, options.methodName, {

    value: function ( key, value ) {

      if ( typeof key === "string" ) {

        if ( arguments.length === 2 ) {
          this[ options.propertyName ][ key ] = value;
          return this;
        } else {
          return this[ options.propertyName ][ key ];
        }

      } else if ( typeof key === "object" ) {

        this[ options.propertyName ] = key;
        return this;

      }
    }

  } );

};

module.exports = optionify;