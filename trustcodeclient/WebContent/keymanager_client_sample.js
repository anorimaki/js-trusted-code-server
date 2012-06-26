function build() {
	var body ;
	var generateNode = document.createElement('p');
	var generateTextNode = document.createTextNode('Generate');
	var signNode = document.createElement('p');
	var signTextNode = document.createTextNode('Sign');
	
	var keyManagerClient = new keymng.Client( 'http://localhost:6080', 
			'http://localhost:6080/trustcodeserver/keymanager.html' );
	
	generateNode.appendChild( generateTextNode );
	generateNode.onclick = function (){
			var keySpec = {
				algorithm : 'rsa',
				size : 1204
			};
			keyManagerClient.generateKeys( keySpec );
		};
		
	signNode.appendChild( signTextNode );
	
	body = document.getElementsByTagName('body')[0];
	body.appendChild( generateNode );
	body.appendChild( signNode );
}