var menuTabs = {};

menuTabs.init = function( where ){
	var domIndex = $( ".menu", where );
	var items = domIndex.children( "div" );
	items.each( function() {
		var id = $(this).attr('id');
		system.moduleLoader.load( id, "#"+id );
	});
	
	domIndex.tabs();
};

