var keymng = keymng || {};

keymng.Crypto = function() {
};	


keymng.Crypto.prototype.generateKeyPair = function( algorithm, keySpec )  {
	if ( algorithm != 'RSA' )
		throw 'Invalid key generation algorithm: ' + algorithm;
	
	var rsa = new RSAKey();
	rsa.generate( keySpec.length, '010001' );

	return rsa;
};




