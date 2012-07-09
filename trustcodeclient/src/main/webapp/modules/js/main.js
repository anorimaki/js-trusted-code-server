var main = function( where ) {
	var tabsNode = $( ".tabs", where );
	var keyManagementTab = undefined;
	var signatureTab = undefined;
	var keyManager = undefined;
	var uiResources = undefined;
	
	var keyManagementModuleLoaded = function() {
		keyManagementTab = keyManagement( $("#keyManagementTab", tabsNode), keyManager, uiResources );
	};
	
	var signatureModuleLoaded = function() {
		signatureTab = signature( $("#signatureTab", tabsNode), keyManager, uiResources );
	};
	
	var keyManagerLoaded = function() {
		system.moduleLoader.load( "keyManagement", $("#keyManagementTab", tabsNode), keyManagementModuleLoaded );
		system.moduleLoader.load( "signature", $("#signatureTab", tabsNode), signatureModuleLoaded );
	};
	
	var iniKeyManager = function() {
		var getHost = function(href) {
		    var l = document.createElement("a");
		    l.href = href;
		    var ret = l.protocol + '//' + l.host ;
		    return ret;
		};
		
		var serverUrl = 'http://localhost:8180/trustcodeserver/keymanager.html';
		keyManager = new keymng.CachedClient( getHost(serverUrl), serverUrl, keyManagerLoaded );
	};
	
	var uiResourcesLoaded = function() {
		uiResources = uiAppResources();
		iniKeyManager();
	};
	
	
	system.moduleLoader.load( "uiAppResources", undefined, uiResourcesLoaded );
	tabsNode.tabs();
};
