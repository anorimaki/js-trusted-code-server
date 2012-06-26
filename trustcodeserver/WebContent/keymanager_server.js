if (typeof(keymng) == 'undefined') { keymng = {}; };

keymng.Server = function( source ) {
	var that = this;
	this.allowedSource = source;

	function requestHandle(event) {
		var data = event.data;
		var handle = that.operationHandles[data.operation];
		if ( handle === undefined )
			throw "Invalid operation request: " + data.operation;
		handle.call( that, data );
	}
	
	window.addEventListener( 'message', requestHandle, false );
};


keymng.Server.prototype.operationHandles = {
	generate : function ( params ) {
		var handle = this.keyGenerationHandles[params.algorithm];
		if ( handle === undefined )
			throw "Invalid generation algorithm: " + params.algorithm;
		handle( event.keySpec );
	}
};


keymng.Server.prototype.keyGenerationHandles = {
	RSA : function( keySpec ) {
		alert( 'RSA generation' );
	}
};




