var ui = ui || {};

ui.ErrorDialog = function () {
	this.divNode = $( "<div></div>" );
	this.divNode.uid();
	this.divNode.appendTo( "body" );
	this.divNode.dialog( {
		autoOpen : false,
		height: "auto",
		modal: true,
		closeOnEscape : false,
		resizable : false,
		buttons: {
			Ok: function() {
				$(this).dialog( "close" );
			}
		}
	});
};


ui.ErrorDialog.prototype.open = function( title, message ) {
	$("p.message", this.divNode).remove();
	this.divNode.dialog( "option", "title", title );
	this.divNode.append( "<p class='message'>" + message + "</p>" );
	this.divNode.dialog( "open" );
};






