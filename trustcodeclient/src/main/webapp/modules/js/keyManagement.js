var keyManagement = {};

keyManagement.init = function( where ){
	var domForm = $( ".generateKeyPairForm", where );
	
	system.moduleLoader.load( "generateKeyPairForm", domForm, function() {
		keyManagement.completeInit( where, domForm );
	} );
};

	
keyManagement.completeInit = function( where, domForm ){
	var form = new GenerateKeyPairForm( domForm, function( formResult ) {
			keyManagerClient.generateKeyPair( formResult.alias, formResult.algorihtm, formResult.keySpec );
		});
	
	var generateButton = $( ".generateButton", where );
	generateButton.button();
	
	generateButton.click( form.show );
};

