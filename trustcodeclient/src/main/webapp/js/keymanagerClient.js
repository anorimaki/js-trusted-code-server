var keymng = keymng || {};

keymng.Client = function( origin, keyManagerUrl, initializedCallback ) {
	var that = this;
	
	this.DEFAULT_TIMEOUT = 10;
	this._createFrame( keyManagerUrl, initializedCallback );
	this._origin = origin;
	this._activeRequests = {};
	this._requestId = 0;
	this._defaultErrorCallback = undefined;
	
	function requestHandle(event) {
		if ( event.origin !== that._origin )
			return;
		
		var data = JSON.parse(event.data);
		
		that._endRequest( data.requestId, data );
	}
	
	window.addEventListener( 'message', requestHandle, false );
};


keymng.Client.Errors = {
	TIMEOUT : "TIMEOUT",
	SERVER_ERROR : "SERVER_ERROR"
};


keymng.Client.prototype.setDefaultErrorCallback = function( errorCallback ) {
	this._defaultErrorCallback = errorCallback;
};


keymng.Client.prototype.generateKeyPair = function( parameters, callback ) {
	this._beginRequest( 'generateKeyPair', parameters.timeout, callback );
	var operation = {
		operation : 'generateKeyPair',
		requestId : this._requestId,
		alias : parameters.alias,
		algorithm : parameters.algorithm,
		keySpec : parameters.keySpec,
	};
	this._iframe.contentWindow.postMessage( operation, this._origin );
};


keymng.Client.prototype.getKeyInfos = function( callback ) {
	this._beginRequest( 'getKeyInfos', undefined, callback );
	var operation = {
		operation : 'getKeyInfos',
		requestId : this._requestId,
	};
	this._iframe.contentWindow.postMessage( operation, this._origin );
};


keymng.Client.prototype._beginRequest = function( operationType, requestTimeout, resultCallback ) {
	var that = this;
	
	this._requestId++;
	
	var timeout = requestTimeout ? requestTimeout : this.DEFAULT_TIMEOUT;
	
	var curretRequestId = this._requestId;
	
	var currentTimeOutId = window.setTimeout( function(){ 
			that._requestTimedOut(curretRequestId); 
		}, timeout * 1000 );
	
	this._activeRequests[this._requestId] = {
			operation : operationType,
			callback : resultCallback,
			timeOutId : currentTimeOutId,
		};
};


keymng.Client.prototype._callErrorCallback = function( requestInfo, code, error ) {
	var errorCallback = this._defaultErrorCallback;
	if ( typeof requestInfo.callback === 'object' ) {
		errorCallback = requestInfo.callback.error;
	} 
	
	if ( errorCallback === undefined ) {
		var msg = "Error " + code + "." ;
		if ( error ) {
			msg += "Details: ";
			msg += (error.message) ? error.message : error.toString();
		}
		throw msg;
	}
	
	errorCallback( code, error );
};


keymng.Client.prototype._endRequest = function( requestId, result ) {
	var requestInfo = this._activeRequests[requestId];
	delete this._activeRequests[requestId];
	
	window.clearTimeout( requestInfo.timeOutId );

	if ( result.error ) {
		this._callErrorCallback( requestInfo, keymng.Client.Errors.SERVER_ERROR, result.error );
		return;
	}
	
	var handle = this.successResponseHandles[requestInfo.operation];
	if ( handle === undefined )
		throw "Invalid operation response: " + event.data.operation;
	
	var successCallback = requestInfo.callback;
	if ( typeof requestInfo.callback === 'object' ) {
		successCallback = requestInfo.callback.success;
	} 
	
	handle( successCallback, result ); 
};


keymng.Client.prototype._requestTimedOut = function( requestId ) {
	var requestInfo = this._activeRequests[requestId];
	delete this._activeRequests[requestId];
	
	this._callErrorCallback( requestInfo, keymng.Client.Errors.TIMEOUT );
};


keymng.Client.prototype.successResponseHandles = {
	generateKeyPair : function ( clientCallback, result ) {
		clientCallback( result.publicKeyRef );
	},
	
	getKeyInfos : function ( clientCallback, result ) {
		clientCallback( result.keyInfos );
	}
};


keymng.Client.prototype._createFrame = function( keyManagerUrl, initializedCallback ) {
	this._iframe = document.createElement("iframe");
	this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
	this._iframe.src = keyManagerUrl;
	document.body.appendChild(this._iframe);
	$(this._iframe).load(initializedCallback);
};



