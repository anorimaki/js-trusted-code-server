function GenerateKeyPairForm( where, applyResult ) {
	var that = this;

	var formNode = $( "form", where );
	var algorithmNode = $('select[name="algorithm"]', formNode);
	var keySizeNode = $('select[name="keySize"]', formNode);
	
	var fillKeySizeNode = function() {
		$( "option", keySizeNode ).remove();
		var algorithmSelected = algorithmNode.val();
		$.each( that._keySizes[algorithmSelected], function(index, value) {
			keySizeNode.append( "<option>" + value + "</option>" );
		});
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
			Generate : function() {
				var aliasValue = $( 'input[name="alias"]', where ).val();
				var algorithmValue = $(algorithmNode).val();
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
			},
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
