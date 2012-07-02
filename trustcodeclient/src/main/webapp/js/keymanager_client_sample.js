

function build() {
	//var serverUrl = 'http://trustcodeserver-anorimaki.rhcloud.com/keymanager.html';
	var serverUrl = 'http://localhost:8180/trustcodeserver/keymanager.html';
	//var serverUrl = 'http://localhost:6080/trustcodeserver/keymanager.html';
	
	var getHost = function(href) {
	    var l = document.createElement("a");
	    l.href = href;
	    var ret = l.protocol + '//' + l.host ;
	    return ret;
	};

	
	var body ;
	var generateNode = document.createElement('p');
	var generateTextNode = document.createTextNode('Generate');
	var signNode = document.createElement('p');
	var signTextNode = document.createTextNode('Sign');
	
	var keyManagerClient = new keymng.Client( getHost(serverUrl), serverUrl );
	
	generateNode.appendChild( generateTextNode );
	generateNode.onclick = function (){
			var keySpec = {
				size : 1204
			};
			keyManagerClient.generateKeyPair( 'RSA', keySpec );
		};
		
	signNode.appendChild( signTextNode );
	
	body = document.getElementsByTagName('body')[0];
	body.appendChild( generateNode );
	body.appendChild( signNode );
}