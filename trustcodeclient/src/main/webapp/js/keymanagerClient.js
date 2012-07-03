var keymng = keymng || {};

keymng.Client = function( origin, keyManagerUrl, callbacks ) {
	var that = this;
	
	this._createFrame( keyManagerUrl );
	this._origin = origin;
	this._callbacks = callbacks;
	this._requestId = 0;
	
	function requestHandle(event) {
		if ( event.origin !== that._origin )
			return;
		
		var handle = that.responseHandles[event.data.operation];
		if ( handle === undefined )
			throw "Invalid operation response: " + event.data.operation;
		
		handle.call( that, event.data );
	}
	
	window.addEventListener( 'message', requestHandle, false );
};


keymng.Client.prototype.setCallbacks = function( callbacks ) {
	this._callbacks = callbacks;
};


keymng.Client.prototype.generateKeyPair = function( parameters ) {
	this._requestId++;
	var operation = {
		operation : 'generateKeyPair',
		requestId : this._requestId,
		alias : parameters.alias,
		algorithm : parameters.algorithm,
		keySpec : parameters.keySpec
	};
	this._iframe.contentWindow.postMessage( operation, this._origin );
	return this._requestId;
};


keymng.Client.prototype._createFrame = function( keyManagerUrl ) {
	this._iframe = document.createElement("iframe");
	this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
	this._iframe.src = keyManagerUrl;
	document.body.appendChild(this._iframe);
};


keymng.Client.prototype.responseHandles = {
	generateKeyPair : function ( params ) {
		this._callbacks.keyPairGenerated( params.requestId, params.publicKeyRef );
	}
};
