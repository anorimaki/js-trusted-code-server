var keymng = keymng || {};

keymng.Store = function( application ) {
	this.prefix = application;

	this.readIndex();
};


keymng.Store.prototype.put = function( alias, key ) {
	stringify
};


keymng.Store.prototype.get = function( alias ) {
	var localStorageKey = this.getLocalStorageKey( alias );
	var valueStr = localStorage.getItem( localStorageKey );
	return JSON.parse(valueStr);
};


keymng.Store.prototype.remove = function( alias ) {
	var localStorageKey = this.getLocalStorageKey( alias );
	localStorage.removeItem( localStorageKey );
	delete this.index[alias];
	this.writeIndex();
};



keymng.Store.prototype.readIndex = function() {
	var indexStr = localStorage.getItem( this.prefix + "Index" );
	if ( indexStr ) {
		this.index = JSON.parse(indexStr);
	}
	else
		this.index = {};
};


keymng.Store.prototype.writeIndex = function() {
	localStorage.setItem( this.prefix + "Index", JSON.stringify(this.index) );
};

