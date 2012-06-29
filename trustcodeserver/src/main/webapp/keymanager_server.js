var keymng = keymng || {};

keymng.Server = function( source ) {
	var that = this;
	this.allowedSource = source;
	this.crypto = new keymng.Crypto();
	this.store = new keymng.Store();

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
		var keyPair = this.crypto.generateKeyPair( params.algorithm, params.keySpec );
		this.store.put( params.alias, keyPair.privateKey );
	}
};


