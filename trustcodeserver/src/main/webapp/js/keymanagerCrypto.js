var keymng = keymng || {};

keymng.Crypto = function() {
};	


keymng.Crypto.prototype.generateKeyPair = function( algorithm, keySpec )  {
	if ( algorithm != 'RSA' )
		throw 'Invalid key generation algorithm: ' + algorithm;
	
	var pvk = new RSAKey();
	pvk.generate( keySpec.length, '10001' );

	var pbk = new RSAKey();
	pbk.setPublic( pvk.n.toString(16), '10001' );
	
	return {
		privateKey : pvk,
		publicKey : pbk
	};
};




