var type = require( "type-component" ),
  merge = require( "sc-merge" );

var optionify = function ( value, options ) {
  var valueIsAFunction = type( value ) === "function",
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
      if ( arguments.length === 2 ) {
        this[ options.propertyName ][ key ] = value;
        return this;
      } else {
        return this[ options.propertyName ][ key ];
      }
    }

  } );

};

module.exports = optionify;