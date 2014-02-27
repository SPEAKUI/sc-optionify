var should = require( "should" ),
  optionify = require( ".." );

describe( "options", function () {

  var object1 = {
    married: false,
    name: "David",
    country: "Japan"
  };

  var function1 = function () {};
  var objectsToTest = [];

  objectsToTest.push( object1 );
  objectsToTest.push( object1 );
  objectsToTest.push( function1 );
  objectsToTest.push( function1 );
  objectsToTest.push( new function1() );

  objectsToTest.forEach( function ( objectToTest ) {

    it( "should extend an object", function () {

      optionify( objectToTest );

      if ( typeof objectToTest === "function" ) {
        objectToTest = new objectToTest();
      }

      objectToTest.should.have.a.property( "option" ).and.be.a.instanceOf( Function );

      objectToTest.options.should.be.an.instanceOf( Object );

      objectToTest.option( "visible", true );
      objectToTest.option( "visible" );
      objectToTest.options.should.have.a.property( "visible", true );
      objectToTest.option( "visible" ).should.equal( true );
      objectToTest.options.should.have.a.property( "visible", true );

    } );

  } );

  it( "should be chainable", function () {

    var anObject = {
      married: false,
      name: "David",
      country: "Japan"
    };

    optionify( anObject );

    anObject.option( "visible", true ).option( "active", true );
    anObject.options.should.have.a.property( "visible", true );
    anObject.options.should.have.a.property( "active", true );

  } );

  it( "should be able to change the method and property name", function () {

    var anObject = {
      married: false,
      name: "David",
      country: "Japan"
    };

    optionify( anObject, {
      propertyName: "__options",
      methodName: "set"
    } );

    anObject.set( "visible", true );

    anObject.__options.should.have.a.property( "visible", true );

  } );

  it( "should be able to accept an object to replace all options", function () {

    var anObject = {
      married: false,
      name: "David",
      country: "Japan"
    };

    optionify( anObject );

    anObject.option( "visible", true );
    anObject.option( "visible" ).should.be.true;

    anObject.option( {
      active: true,
      member: true
    } );

    should( anObject.option( "visible" ) ).be.empty;
    anObject.option( "active" ).should.be.true;
    anObject.option( "member" ).should.be.true;

  } );

} );