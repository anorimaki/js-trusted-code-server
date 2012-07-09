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
		
		try {
			handle.call( that, event );
		}
		catch( e ) {
			var msg = e.message ? e.message : e.toString();
			var result = {
					requestId : data.requestId,
					error : {
						message : msg
					}
				};
			if ( e.stack )
				result.error.stack = e.stack;
			
			event.source.postMessage( JSON.stringify(result), event.origin );
		}
	}
	
	window.addEventListener( 'message', requestHandle, false );
};


keymng.Server.prototype._getKeyRefs = {
	RSA : function( publicKey ) {
		return publicKey.n.toString(16).substr( 0, 40 );
	}
};


keymng.Server.prototype.operationHandles = {
	generateKeyPair : function ( event ) {
		var params = event.data;
		
		var keyPair = this.crypto.generateKeyPair( params.algorithm, params.keySpec );
		this.store.put( params.alias, params.algorithm, keyPair );
	
		var result = {
				requestId : params.requestId,
				publicKeyRef : this._getKeyRefs[params.algorithm]( keyPair.publicKey )
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
			var algorithm = kInfos[alias].algorithm;
			var keyRef = this._getKeyRefs[algorithm]( keyPair.publicKey );
			result.keyInfos[alias] = {
					algorithm : algorithm,
					publicKeyRef : keyRef
				};
		}
		
		event.source.postMessage( JSON.stringify(result), event.origin );
	},
	
	
	sign : function( event ) {
		var params = event.data;
		
		var keyPair = this.store.get( params.alias );
		
		var signature = this.crypto.sign( params.algorithm, keyPair.privateKey, params.data );
		
		var result = {
				requestId : event.data.requestId,
				signature : signature
			};
		
		event.source.postMessage( JSON.stringify(result), event.origin );
	}
};


