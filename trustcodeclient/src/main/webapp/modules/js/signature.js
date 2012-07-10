var signature = function( where_, keyManager_, uiResources_ ) {
	var keyManager = keyManager_;
	var uiResources = uiResources_;
	var where = where_;
	var dataNode = $('[name="inputText"]', where);
	var signatureNode = $('[name="signature"]', where);
	var signatureButtonNode = $('button[name="sign"]', where); 
	var keyListNode = $( '[name="keyList"]', where );
	
	
	var addKeyTokeyList = function( alias ) {
		keyListNode.append( "<option>" + alias + "</option>" );
	};
	
	
	var setKeyList = function( keyInfos ) {
		$( "option", keyListNode ).remove();
		for ( var alias in keyInfos ) {
			addKeyTokeyList( alias );
		}	
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
	
	
	signatureButtonNode.button();
	signatureButtonNode.click( signaturePushed );
	
	dataNode.val( "Sample text" );
	
	return {
		keysGot : function( keysInfo ) {
			setKeyList( keysInfo );
		},
		
		keyPairGenerated : function( keyInfo ) {
			addKeyTokeyList( keyInfo.alias );
		}
	};
	
};