package com.pinguin.trustcode.client;

import java.security.spec.RSAPublicKeySpec;

import com.pinguin.trustcode.shared.FieldVerifier;
import com.smartgwt.client.widgets.layout.HLayout;
import com.smartgwt.client.widgets.layout.VLayout;
import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.event.dom.client.KeyCodes;
import com.google.gwt.event.dom.client.KeyUpEvent;
import com.google.gwt.event.dom.client.KeyUpHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.RootLayoutPanel;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class Trustcodesignatureapp implements EntryPoint {
	private VLayout mainLayout;


	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {
		RSAPublicKeySpec aa = new RSAPublicKeySpec(null, null);
		
		Window.enableScrolling(false);
		Window.setMargin("0px");
		
		mainLayout = new MainArea();
		mainLayout.setWidth100();
		mainLayout.setHeight100();
			
		RootLayoutPanel.get().add(mainLayout);
	}
}
