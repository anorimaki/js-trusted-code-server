var keymng = keymng || {};

keymng.CachedClient = function( origin, keyManagerUrl, initializedCallback ) {
	this.impl = new keymng.Client( origin, keyManagerUrl, initializedCallback );
};


keymng.CachedClient.prototype.setDefaultErrorCallback = function( errorCallback ) {
	this.impl.setDefaultErrorCallback( errorCallback );
};


keymng.CachedClient.prototype.addKey = function( alias, algorithm, publicKeyRef ) {
	if ( this.cachedData === undefined ) {
		this.cachedData = {
			keyInfos : {}
		};
	}
	
	this.cachedData.keyInfos[alias] = {
		algorithm : algorithm,
		publicKeyRef : publicKeyRef
	};
};


keymng.CachedClient.prototype.generateKeyPair = function( parameters, userCallback ) {
	var that = this;
	
	var cacheCallback = {
			success : function(publicKeyRef) {
				that.addKey( parameters.alias, parameters.algorithm, publicKeyRef );
				userCallback.success( publicKeyRef );
			}
		};
	
	if ( userCallback.error ) {
		cacheCallback.error = userCallback.error;
	}
	
	this.impl.generateKeyPair( parameters, cacheCallback );
};


keymng.CachedClient.prototype.sign = function( parameters, userCallback ) {
	this.impl.sign( parameters, userCallback );
};


keymng.CachedClient.prototype.getKeyInfos = function( userCallback ) {
	if ( this.cachedData !== undefined ) {
		userCallback.success( this.cachedData.keyInfos );
	}
	
	var cacheCallback = {
			success : function(keyInfos) {
				this.cachedData = {
						keyInfos : keyInfos
					};
				userCallback.success( this.cachedData.keyInfos );					
			}
		};
	
	if ( userCallback.error ) {
		cacheCallback.error = userCallback.error;
	}
	
	this.impl.getKeyInfos( cacheCallback );
};
