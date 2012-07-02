(function( $ ){
	var selectTab = function(menu, divSelector){
		var highlight = menu.find("a[href='"+divSelector+"']").parent();
		
		while (!highlight.parent().parent().is("div")){
			highlight = highlight.parent().parent();
		}
		
		var tabModule = divSelector.split("#")[1]+"Tab";
		
		if (window[tabModule].showTab){
			if (!window[tabModule].showTab()){
				return false;
			}
		}

		menu.find("li").removeClass("ui-state-active ui-tabs-selected");
		highlight.addClass("ui-state-active ui-tabs-selected");
		highlight.find("ul").stop(true, true).hide();
		$(divSelector).toggle(true);	
		$(divSelector).siblings("div").toggle(false);	
	};
	
	var dropDownTabMethods = {
		init : function(){
			return this.each(function(){
				var menu = $(this);
				
				menu.addClass("my-tabs ui-widget  ui-corner-all");
				var tabBar = menu.children("ul");
				tabBar.addClass("my-tabs-nav ui-widget-content ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
				tabBar.children("li").each(function(){
					$(this).addClass("ui-corner-top");
				});
				
				menu.children("div").each(function() {
					$(this).addClass("my-tabs-panel ui-widget-content ui-corner-bottom");
				});
				
				menu.find("li").each(function() {
					
					$(this).addClass("ui-state-default ");
					$(this).find("ul").addClass("ui-menu");
					
					if ($(this).parent().parent().is("div")){
						$(this).addClass("ui-corner-top");
					} else {
						$(this).addClass("ui-menu-item");
					}
					
					$(this).mouseenter(function() {
						$(this).find("ul").stop(true, true).toggle(true);
						$(this).addClass("ui-state-hover");
					});
			
					$(this).mouseleave(function() {
						$(this).find("ul").stop(true, true).toggle(false);
						$(this).removeClass("ui-state-hover");
					});
					
					if ($(this).find("ul").length > 0) {
						$("<span>").addClass("ui-menu-icon ui-icon ui-icon-carat-1-s").prependTo($(this).children("a"));
					}	
					$(this).find("a").click(function() {
						if (!this.hash){
							return false;
						}
						selectTab(menu, this.hash);
						return false;
					});
				});
				
				/* Show first tab */
				
				var firstTab = menu.children("ul").children("li:first");
				firstTab.addClass("ui-state-active ui-tabs-selected");
				var tabPageSelector = firstTab.children("a")[0].hash;
				$(tabPageSelector).toggle(true);
				$(tabPageSelector).siblings("div").toggle(false);
			});
		},
		select : function (divSelector){
			return this.each(function(){
				var menu = $(this);
				selectTab(menu, divSelector);
			});
		}
	};
	
	$.fn.dropDownTab = function (method){
		if ( dropDownTabMethods[method] ) {
			return dropDownTabMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return dropDownTabMethods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.dropDownTab' );
		}
	};

})( jQuery );
