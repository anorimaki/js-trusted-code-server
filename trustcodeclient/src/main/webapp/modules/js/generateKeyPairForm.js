function GenerateKeyPairForm( where, applyResult, aliasChecher_ ) {
	var that = this;

	var aliasChecher = aliasChecher_;
	var formNode = $( "form", where );
	var aliasNode = $('select[name="alias"]', formNode);
	var algorithmNode = $('select[name="algorithm"]', formNode);
	var keySizeNode = $('select[name="keySize"]', formNode);
	var allFields = $( [] ).add( aliasNode ).add( algorithmNode ).add( keySizeNode );
	
	var fillKeySizeNode = function() {
		$( "option", keySizeNode ).remove();
		var algorithmSelected = algorithmNode.val();
		$.each( that._keySizes[algorithmSelected], function(index, value) {
			keySizeNode.append( "<option>" + value + "</option>" );
		});
	};
	
	var generatePushed = function() {
		allFields.removeClass( "ui-state-error" );
		
		var aliasValue = aliasNode.val();
		if ( !aliasChecher( aliasValue ) ) {
			aliasNode.addCladd( "ui-state-error" );
			return;
		}
		
		var algorithmValue = algorithmNode.val();
		var lengthValue = keySizeNode.val();
		var result = { 
			alias : aliasValue,
			algorithm : algorithmValue,
			keySpec : {
				length : lengthValue
			}
		};
		$(this).dialog( "close" );
		applyResult( result );
	};
	
	algorithmNode.append( "<option>RSA</option>" );
	algorithmNode.change( fillKeySizeNode );
	fillKeySizeNode();
	
	this.where = where;
	
	$(this.where).dialog( {
		autoOpen : false,
		modal : true,
		height: "auto",
		width: 350,
		buttons: {
			Generate : generatePushed,
			Cancel : function() {
				$(this).dialog( "close" );
			}
		}
	});
}


GenerateKeyPairForm.prototype.show = function() {
	$(this.where).dialog( "open" );
};


GenerateKeyPairForm.prototype._keySizes = {
	RSA : [512, 1024, 2048]
};
