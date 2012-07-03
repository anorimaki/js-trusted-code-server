var system = system || {};
system.moduleLoader = system.moduleLoader || {};

system.moduleLoader.load = function(name, where, loadingCallback) {
	if ( where ) {
		$.ajax({
			url : "./modules/" + name + ".html",
			context : document.body,
			dataType : 'html',
			success : function(data) {
				$(where).append(data);
				system.moduleLoader.loadScript( name, where, loadingCallback );
				system.moduleLoader.loadCSS(name);
			},
			error : function(jqXHR, textStatus) {
				$(where).append("<h1>Error loading " + name + "</h1>");
			}
		});
		return;
	}
	system.moduleLoader.loadScript( name, null, loadingCallback );
	system.moduleLoader.loadCSS(name);
};


system.moduleLoader.loadScript = function( name, where, loadingCallback ) {
	/* No usar jQuery, el append trata de manera especial los elementos de tipo script
	 * y los eventos no se asocian correctamente */
	
	var el = document.createElement('script');
	el.type = 'text/javascript';
	el.async = true;
	el.src = "./modules/js/" + name + ".js";

	el.onload = el.onreadystatechange = function() {
		if (el.readyState && el.readyState !== 'complete'
				&& el.readyState !== 'loaded')
			return false;

		el.onload = el.onreadystatechange = null;
		
		if ( loadingCallback ) {
			loadingCallback();
		}
		
		if ( window[name] && window[name].init ) {
			window[name].init( where );
		}
	};
	
	$("head")[0].appendChild(el);
};


system.moduleLoader.loadCSS = function (name){
	/* Para poder cargar dinámicamente un css en explorer es necesario
	 * utilizar la función especial document.createStyleSheet
	 */
	url = './modules/css/' + name + '.css';
	if (document.createStyleSheet)
	{
	    document.createStyleSheet(url);
	}
	else
	{
		$(document.createElement("link")).attr({
			rel : 'stylesheet',
			type : 'text/css',
			href : url
		}).appendTo('head'); 
	}
};

