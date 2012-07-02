function GenerateKeyPairForm( where ) {
	var algorithmListId = $(where).append( "<datalist>RSA</datalist>").uid();
	$(name='algorithm').attr( "list", algorithmListId );
	
	var that = this;
	
	this.where = where;
	this.result = null;
	
	$(this.where).dialog( {
		autoOpen : false,
		model : true,
		height: 300,
		width: 350,
		buttons: {
			Generate : function() {
				var aliasValue = $( "#alias", where ).val; 
				that.result = { 
					alias : aliasValue
				};
				this.dialog( "close" );
			},
			Cancel : function() {
				this.dialog( "close" );
			}
		}
	});
}

GenerateKeyPairForm.prototype.show = function() {
	$(this.where).dialog( "open" );
	return this.result;
};

