var keymng = keymng || {};

keymng.Store = function( application ) {
	this.prefix = application;
	this.serializer = keymng.keySerializer(); 
	this.readIndex();
};


keymng.Store.prototype.put = function( alias, keyAlgorithm, keyPair ) {
	if ( this.index[alias] )
		throw "Key with alias '" + alias + "' exists"; 
		
	this.index[alias] = {
			algorithm : keyAlgorithm
		};
	this.writeIndex();
	
	var localStorageKey = "key_" + alias;
	var serializedKeyPair = this.serializer.serialize( keyAlgorithm, keyPair ); 
	localStorage.setItem( localStorageKey, serializedKeyPair );
};


keymng.Store.prototype.get = function( alias ) {
	if ( !this.index[alias] )
		throw "Key with alias '" + alias + "' not exists"; 
	
	var localStorageKey = "key_" + alias;
	var serializedKeyPair = localStorage.getItem( localStorageKey );
	return this.serializer.deserialize( this.index[alias].algorithm, serializedKeyPair );
};


keymng.Store.prototype.remove = function( alias ) {
	if ( !this.index[alias] )
		throw "Key with alias '" + alias + "' not exists"; 
	
	var localStorageKey = "key_" + alias;
	localStorage.removeItem( localStorageKey );
	delete this.index[alias];
	this.writeIndex();
};


keymng.Store.prototype.getKeyInfos = function( alias ) {
	return this.index;
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



