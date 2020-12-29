
let Utils = {
    resp: function(success, resp) {
      let response_data;  
      response_data = {
        success: success,
        data: resp
      }
      return JSON.stringify(response_data);
    },
    parseresp: function(info) {
      var lines = info.split( "\r\n" );
      var obj = { };
      for ( var i = 0, l = info.length; i < l; i++ ) {
          var line = lines[ i ];
          if ( line && line.split ) {
              line = line.split( ":" );
              if ( line.length > 1 ) {
                  var key = line.shift( );
                  obj[ key ] = line.join( ":" );
              }
          }
      }
      return obj;
    }
  
  }
  
  export default Utils;