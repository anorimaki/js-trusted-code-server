var keymng = keymng || {};

keymng.keySerializer = function() {
	var hexdumpFields = function( fields, object ) {
		var jsonObject = {}; 
		$.each( fields, function( index, field ) {
				jsonObject[field] = object[field].toString(16);
			});
		return jsonObject;
	};
	
	var privateKeySerializers = {
		RSA : function( privateKey ) {
			return hexdumpFields( ["n","e","d","p","q","dmp1","dmq1","coeff"], privateKey );
		}
	};
	
	var publicKeySerializers = {
		RSA : function( publicKey ) {
			return hexdumpFields( ["n","e"], publicKey );
		}
	};
	
	var privateKeyDeserializers = {
		RSA : function( privateKey ) {
			var ret = new RSAKey();
			ret.setPrivateEx( privateKey.n, privateKey.e, privateKey.d, privateKey.p, 
					privateKey.q, privateKey.dmp1, privateKey.dmq1, privateKey.coeff );
			return ret;
		}
	};
	
	var publicKeyDeserializers = {
		RSA : function( publicKey ) {
			var ret = new RSAKey();
			ret.setPublic( publicKey.n, publicKey.e );
			return ret;
		}
	};
	
	return {
		serialize : function( algorithm, keyPair ) {
			var ret = {
				publicKey : publicKeySerializers[algorithm]( keyPair.publicKey ),
				privateKey : privateKeySerializers[algorithm]( keyPair.privateKey )
			};
			return JSON.stringify( ret );
		},
		
		deserialize : function( algorithm, keyPairStr ) {
			var keyPair = JSON.parse( keyPairStr ); 
			return {
				publicKey : publicKeyDeserializers[algorithm]( keyPair.publicKey ),
				privateKey : privateKeyDeserializers[algorithm]( keyPair.privateKey )
			};
		}
	};
};

