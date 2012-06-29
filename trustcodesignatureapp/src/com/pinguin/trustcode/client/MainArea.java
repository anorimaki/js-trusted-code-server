package com.pinguin.trustcode.client;

import com.smartgwt.client.types.Alignment;
import com.smartgwt.client.types.Overflow;
import com.smartgwt.client.types.Side;
import com.smartgwt.client.widgets.Label;
import com.smartgwt.client.widgets.layout.VLayout;
import com.smartgwt.client.widgets.tab.Tab;
import com.smartgwt.client.widgets.tab.TabSet;

public class MainArea extends VLayout {
	final TabSet topTabSet = new TabSet();
		     
	public MainArea() {
		super();
		this.setOverflow(Overflow.HIDDEN);
		
		topTabSet.setTabBarPosition(Side.TOP); 
		topTabSet.setTabBarAlign(Side.LEFT);
		
		Tab managementTab = new Tab( "Key management" );
		managementTab.setCanClose(false);
		managementTab.setPane( new GenerationTabContent() );
		topTabSet.addTab( managementTab );
		topTabSet.selectTab( managementTab );
		
		this.addMember(topTabSet);
	}
}
