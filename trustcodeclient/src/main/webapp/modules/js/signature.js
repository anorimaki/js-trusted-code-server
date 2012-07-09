var signature = function( where_, keyManager_, uiResources_ ) {
	var keyManager = keyManager_;
	var uiResources = uiResources_;
	var where = where_;
	var dataNode = $('[name="inputText"]', where);
	var signatureNode = $('[name="signature"]', where);
	var signatureButtonNode = $('button[name="sign"]', where); 
	var keyListNode = $( '[name="keyList"]', where );
	
	var setKeyList = function( keyInfos ) {
		$( "option", keyListNode ).remove();
		for ( var alias in keyInfos ) {
			keyListNode.append( "<option>" + alias + "</option>" );
		}	
	};
	
	
	var fillKeyListNode = function() {
		uiResources.beginRemoteOperation( "Getting current keys" );
		
		keyManager.getKeyInfos( {
				success : function( keyInfos ) {
					setKeyList( keyInfos );
					uiResources.successRemoteOperation();
				},
				error : uiResources.errorRemoteOperation
			} );
	};
	
	
	var signaturePushed = function() {
		var alias = keyListNode.val();
		var data = dataNode.val();
		
		uiResources.beginRemoteOperation( "Signing" );
		
		var parameters = {
				alias : alias,
				algorithm : "sha1WithRSA",
				data : data
			};
		
		keyManager.sign( parameters, {
				success : function( signature ) {
					signatureNode.val( signature );
					uiResources.successRemoteOperation();
				},
				error : uiResources.errorRemoteOperation
			} );
	};
	
	fillKeyListNode();
	
	signatureButtonNode.button();
	signatureButtonNode.click( signaturePushed );
	
	
	dataNode.val( "Sample text" );
};