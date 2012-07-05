var ui = ui || {};

ui.MessageWindow = function () {
	this.divNode = $( "<div></div>" );
	this.divNode.uid();
	this.divNode.appendTo( "body" );
	this.divNode.dialog( {
		autoOpen : false,
		height: "auto",
		width : 500,
		modal: true,
		closeOnEscape : false,
		resizable : false
	});
	$( '.ui-dialog-titlebar-close', this.divNode.parent() ).remove();
};


ui.MessageWindow.prototype.open = function( title, message ) {
	this.divNode.dialog( "option", "title", title );
	this.divNode.append( "<p class='message'>" + message + "</p>" );
	this.divNode.dialog( "open" );
};


ui.MessageWindow.prototype.close = function() {
	$("p.message", this.divNode).remove();
	this.divNode.dialog( "close" );
};
