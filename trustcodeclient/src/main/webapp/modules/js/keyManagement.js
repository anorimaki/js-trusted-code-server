var keyManagement = function( where_, keyManager_, uiResources_ ) {
	var KEY_PAIR_GENERATION_TIMEOUT = 2;		//in seconds
	var keyManager = keyManager_;
	var uiResources = uiResources_;
	var where = where_;
	var formNode = $( ".generateKeyPairForm", where );
	var currentRequest = undefined;
	
	var operationTimedOut = function() {
		uiResources.appInfoMessageWindow.close();
		uiResources.appErrorDialog.open( "Error", "Operation timeout" );
	};
	
	
	var generateKeyPairFormLoaded = function() {
		var form = new GenerateKeyPairForm( formNode, function( formResult ) {
			uiResources.appInfoMessageWindow.open( "Generating key pair", "Please, wait..." );
			var currentTimeOutId = window.setTimeout( operationTimedOut, KEY_PAIR_GENERATION_TIMEOUT * 1000 );
			var currentRequestId = keyManager.generateKeyPair( formResult );
			
			currentRequest = {
					id : currentRequestId,
					parameters : formResult,
					timeOutId : currentTimeOutId
				};
		});
		
		var generateButton = $( ".generateButton", where );
		generateButton.button();
		generateButton.click( function() {
			form.show();
		});
	};
	
	
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
	
	system.moduleLoader.load( "generateKeyPairForm", formNode, generateKeyPairFormLoaded );
	
	return {
		keyPairGenerated : function( requestId, publicKey ) {
			if ( currentRequest.id !== requestId )
				return;
			
			var tableNode = $( ".keyPairTable table tbody", where );
			
			tableNode.append( "<tr>" +
					"<td>" + currentRequest.parameters.alias + "</td>" +
					"<td>" + currentRequest.parameters.algorithm + "</td>" + 
					"<td>" + publicKey + "</td>" +
					"</tr>" );
			
			uiResources.appInfoMessageWindow.close();
			window.clearTimeout( currentRequest.timeOutId );
		}
	};
};

