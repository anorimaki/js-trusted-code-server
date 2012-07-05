var keyManagement = function( where_, keyManager_, uiResources_ ) {
	var keyManager = keyManager_;
	var uiResources = uiResources_;
	var where = where_;
	var formNode = $( ".generateKeyPairForm", where );
	var tableNode = undefined;
	var currentAliases = {};
	var keyManagerErrorHandles = {};
	
	var addKey = function( alias, algorithm, publicKeyRef ) {
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
	
	
	var initKeyManagerErrorHandles = function() {
		keyManagerErrorHandles[keymng.Client.Errors.TIMEOUT] = function() {
				uiResources.appErrorDialog.open( "Error", "Operation timeout" );
			};
		keyManagerErrorHandles[keymng.Client.Errors.SERVER_ERROR] = function( error ) {
				var msg = error.message;
				if ( error.stack ) {
					msg += "\n" + error.stack;
				}
				uiResources.appErrorDialog.open( "Error", "Server error: " + msg );
			};	
	};
	

	var keyManagerErrorHandle = function( code, parameters ) {
		uiResources.appInfoMessageWindow.close();
		keyManagerErrorHandles[code]( parameters );
	};
	
	
	var generateKeyPair = function( parameters ) {
		beginRemoteOperation( "Generating key pair" );
		
		keyManager.generateKeyPair( parameters, { 
				success : function(publicKeyRef) {
					addKey( parameters.alias, parameters.algorithm, publicKeyRef );
					endRemoteOperation();
				},
				
				error: keyManagerErrorHandle 
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
					
				error: keyManagerErrorHandle 
			});
	};
	
	
	var generateKeyPairFormLoaded = function() {
		var aliasChecker = function( alias ) {
			if ( (alias===undefined) || (alias.length===0) )
				return false;
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
	initKeyManagerErrorHandles();
	
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
	
	tableNode = $( ".keyPairTable table tbody", where );
	
	getCurrentKeys();
	
	system.moduleLoader.load( "generateKeyPairForm", formNode, generateKeyPairFormLoaded );
};

