var keymng = keymng || {};

keymng.Client = function( origin, keyManagerUrl ) {
	this._createFrame( keyManagerUrl );
	
	this._origin = origin;
	
	function requestHandle(e) {
		alert( 'response:' + e.data );
	}
	
	window.addEventListener( 'message', requestHandle, false );
};


keymng.Client.prototype.generateKeyPair = function( alias_, algorithm_, keySpec_ ) {
	var operation = {
		operation : 'generate',
		alias : alias_,
		algorithm : algorithm_,
		keySpec : keySpec_
	};
	this._iframe.contentWindow.postMessage( operation, this._origin );
};


keymng.Client.prototype._createFrame = function( keyManagerUrl ) {
	this._iframe = document.createElement("iframe");
	this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
	this._iframe.src = keyManagerUrl;
	document.body.appendChild(this._iframe);
};