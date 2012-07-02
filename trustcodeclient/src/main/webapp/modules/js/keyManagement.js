var keyManagement = {};

keyManagement.init = function( where ){
	var domForm = $( ".generateKeyPairForm", where );
	
	system.moduleLoader.load( "generateKeyPairForm", domForm, function() {
		keyManagement.completeInit( where, domForm );
	} );
};

	
keyManagement.completeInit = function( where, domForm ){
	var form = new GenerateKeyPairForm( domForm );
	
	var generateButton = $( ".generateButton", where );
	generateButton.button();
	
	generateButton.click( function() {
		var formResult = form.show();
		if ( formResult ) {
			keyManagerClient.generateKeyPair( formResult.alias, formResult.algorihtm, formResult.keySpec );
		}
	});
};

