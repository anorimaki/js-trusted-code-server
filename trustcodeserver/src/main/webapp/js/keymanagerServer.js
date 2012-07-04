var keymng = keymng || {};

keymng.Server = function( source ) {
	var that = this;
	this.allowedSource = source;
	this.crypto = new keymng.Crypto();
	this.store = new keymng.Store( "keymng" );

	function requestHandle(event) {
		var data = event.data;
		var handle = that.operationHandles[data.operation];
		if ( handle === undefined )
			throw "Invalid operation request: " + data.operation;
		handle.call( that, event );
	}
	
	window.addEventListener( 'message', requestHandle, false );
};


keymng.Server.prototype.operationHandles = {
	generateKeyPair : function ( event ) {
		var params = event.data;
		
		var keyPair = this.crypto.generateKeyPair( params.algorithm, params.keySpec );
		this.store.put( params.alias, params.algorithm, keyPair );
	
		var result = {
				requestId : params.requestId,
				publicKeyRef : keyPair.publicKey.toString()
			};
		
		event.source.postMessage( JSON.stringify(result), event.origin );
	},
	

	getKeyInfos : function ( event ) {
		var kInfos = this.store.getKeyInfos();
		
		var result = {
				requestId : event.data.requestId,
				keyInfos : {}
			};
		
		for ( var alias in kInfos ) {
			var keyPair =  this.store.get( alias );
			result.keyInfos[alias] = {
					algorithm : kInfos[alias].algorithm,
					publicKeyRef : keyPair.publicKey.toString()
				};
		}
		
		event.source.postMessage( JSON.stringify(result), event.origin );
	}
};


