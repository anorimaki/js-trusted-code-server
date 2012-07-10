_RSASIGN_HASHHEXFUNC['sha1'] =   function(s){
	var hash = CryptoJS.SHA1(s);
	return hash.toString(CryptoJS.enc.Hex);
};

_RSASIGN_HASHHEXFUNC['sha256'] = function(s){
	var hash = CryptoJS.SHA256(s);
	return hash.toString(CryptoJS.enc.Hex);
};
