var keyManagement = function( where_, keyManager_, uiResources_ ) {
	var keyManager = keyManager_;
	var uiResources = uiResources_;
	var where = where_;
	var formNode = $( ".generateKeyPairForm", where );
	var tableNode = $( ".keyPairTable table tbody", where );
	var currentAliases = {};
	
	var addKey = function( alias, algorithm, publickeyRef ) {
		tableNode.append( "<tr>" +
				"<td>" + alias + "</td>" +
				"<td>" + algorithm + "</td>" + 
				"<td>" + publicKeyRef + "</td>" +
				"</tr>" );
		currentAliases[alias] = true;
	};
	
	
	var beginRemoteOperation  = function( message ) {
		uiResources.appInfoMessageWindow.open( message, "Please, wait..." );
	};
	
	
	var endRemoteOperation = function() {
		uiResources.appInfoMessageWindow.close();
	};
	

	var operationError = function( code ) {
		uiResources.appInfoMessageWindow.close();
		if ( code === keymng.Client.Errors.TIMEOUT ) {
			uiResources.appErrorDialog.open( "Error", "Operation timeout" );
		}
		else {
			uiResources.appErrorDialog.open( "Error", "Unknown error" );
		}
	};
	
	
	var generateKeyPair = function( parameters ) {
		beginRemoteOperation( "Generating key pair" );
		
		keyManager.generateKeyPair( parameters, { 
				success : function(publicKeyRef) {
					addKey( parameters.alias, parameters.algorithm, publicKeyRef );
					endRemoteOperation();
				},
				
				error: operationError 
			});
	};
	
	
	var getCurrentKeys = function() {
		beginRemoteOperation( "Getting current keys" );
		keyManager.getKeyInfos( { 
			success : function(keyInfos) {

				for ( var alias in keyInfos ) {
					addKey( alias, keyInfos[alias].algorithm, keyInfos[alias].publicKeyRef );
				}
				
				endRemoteOperation();
			},
			
			error: operationError 
		});
	};
	
	
	var generateKeyPairFormLoaded = function() {
		var aliasChecker = function( alias ) {
			return currentAliases[alias] === undefined;
		};
		
		var form = new GenerateKeyPairForm( formNode, generateKeyPair, aliasChecker );
		
		var generateButton = $( ".generateButton", where );
		generateButton.button();
		generateButton.click( function() {
			form.show();
		});
	};
	
		// initialization code
	$(".keyPairTable", where).append( "<table border='1' class='keyPairTable ui-widget ui-widget-content'>" +
			"<thead>" +
				"<tr class='ui-widget-header'>" +
					"<th>Alias</th>" +
					"<th>Algorithm</th>" +
					"<th>Public Key</th>" +
				"</tr>" +
			"</thead>" +
			"<tbody></tbody>" +
		"</table>" );
	
	getCurrentKeys();
	
	system.moduleLoader.load( "generateKeyPairForm", formNode, generateKeyPairFormLoaded );
};

