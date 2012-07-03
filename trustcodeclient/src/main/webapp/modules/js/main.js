var main = function( where ) {
	var tabsNode = $( ".tabs", where );
	var items = tabsNode.children( "div" );
	var moduleCounter = items.size();
	var keyManagementTab = undefined;
	var keyManager = undefined;
	var uiResources = {};
	
	var iniKeyManager = function() {
		var getHost = function(href) {
		    var l = document.createElement("a");
		    l.href = href;
		    var ret = l.protocol + '//' + l.host ;
		    return ret;
		};
		
		var serverUrl = 'http://localhost:8180/trustcodeserver/keymanager.html';
		keyManager = new keymng.Client( getHost(serverUrl), serverUrl );
	};
	
	var iniAppUIResources = function() {
		var messageWindowLoaded = function() {
			uiResources.appInfoMessageWindow = new ui.MessageWindow();
		};
		
		var errorDialogLoaded = function() {
			uiResources.appErrorDialog = new ui.ErrorDialog();
		};
		
		system.moduleLoader.load( "messageWindow", undefined, messageWindowLoaded );
		system.moduleLoader.load( "errorDialog", undefined, errorDialogLoaded );
	};
			
	var tabLoaded = function() {
		if ( --moduleCounter === 0 ) {
			keyManager.setCallbacks( {
				keyPairGenerated : keyManagementTab.keyPairGenerated
			} );
		}
	};
	
	var keyManagementLoaded = function() {
		keyManagementTab = keyManagement( $("#keyManagementTab", tabsNode), keyManager, uiResources );
		tabLoaded();
	};
	
	iniKeyManager();
	iniAppUIResources();
	system.moduleLoader.load( "keyManagement", $("#keyManagementTab", tabsNode), keyManagementLoaded );
	system.moduleLoader.load( "signature", $("#signatureTab", tabsNode), tabLoaded );
	tabsNode.tabs();
};
