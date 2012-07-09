var uiAppResources = function() {
	var errorDialog = undefined;
	var messageWindow = undefined;
	var keyManagerErrorHandles = {};
	
	var beginRemoteOperation  = function( message ) {
		messageWindow.open( message, "Please, wait..." );
	};
	
	var successRemoteOperation = function() {
		messageWindow.close();
	};
	
	var errorRemoteOperation = function( code, parameters ) {
		messageWindow.close();
		keyManagerErrorHandles[code]( parameters );
	};
	
	var initKeyManagerErrorHandles = function() {
		keyManagerErrorHandles[keymng.Client.Errors.TIMEOUT] = function() {
				errorDialog.open( "Error", "Operation timeout" );
			};
		keyManagerErrorHandles[keymng.Client.Errors.SERVER_ERROR] = function( error ) {
				var msg = error.message;
				if ( error.stack ) {
					msg += "\n" + error.stack;
				}
				errorDialog.open( "Error", "Server error: " + msg );
			};	
	};
	
	var messageWindowLoaded = function() {
		messageWindow = new ui.MessageWindow();
	};
		
	var errorDialogLoaded = function() {
		errorDialog = new ui.ErrorDialog();
	};
		
	system.moduleLoader.load( "messageWindow", undefined, messageWindowLoaded );
	system.moduleLoader.load( "errorDialog", undefined, errorDialogLoaded );
	
	initKeyManagerErrorHandles();
	
	return {
		beginRemoteOperation : beginRemoteOperation,
		successRemoteOperation : successRemoteOperation,
		errorRemoteOperation : errorRemoteOperation
	};
};