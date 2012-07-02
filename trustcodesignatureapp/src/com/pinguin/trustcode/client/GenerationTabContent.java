package com.pinguin.trustcode.client;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Set;

import com.smartgwt.client.data.AdvancedCriteria;
import com.smartgwt.client.data.Criteria;
import com.smartgwt.client.types.Alignment;
import com.smartgwt.client.types.OperatorId;
import com.smartgwt.client.types.VerticalAlignment;
import com.smartgwt.client.widgets.Button;
import com.smartgwt.client.widgets.Canvas;
import com.smartgwt.client.widgets.IButton;
import com.smartgwt.client.widgets.Window;
import com.smartgwt.client.widgets.events.ClickEvent;
import com.smartgwt.client.widgets.events.ClickHandler;
import com.smartgwt.client.widgets.form.DynamicForm;
import com.smartgwt.client.widgets.form.fields.ComboBoxItem;
import com.smartgwt.client.widgets.form.fields.FilterCriteriaFunction;
import com.smartgwt.client.widgets.form.fields.FormItemCriteriaFunction;
import com.smartgwt.client.widgets.form.fields.FormItemFunctionContext;
import com.smartgwt.client.widgets.form.fields.SelectItem;
import com.smartgwt.client.widgets.form.fields.TextItem;
import com.smartgwt.client.widgets.form.fields.events.ChangedEvent;
import com.smartgwt.client.widgets.form.fields.events.ChangedHandler;
import com.smartgwt.client.widgets.grid.ListGrid;
import com.smartgwt.client.widgets.grid.ListGridField;
import com.smartgwt.client.widgets.grid.ListGridRecord;
import com.smartgwt.client.widgets.layout.HLayout;
import com.smartgwt.client.widgets.layout.VLayout;

public class GenerationTabContent extends VLayout {
	ListGrid keyGrid;
	
	public GenerationTabContent() {
		ListGridField aliasField = new ListGridField( "alias", "Alias", 40 ); 
	    aliasField.setAlign(Alignment.LEFT);  
	        
	    ListGridField sizeField = new ListGridField( "size", "Size" ); 
	    sizeField.setAlign(Alignment.LEFT);  
	        
		keyGrid = new ListGrid();  
		keyGrid.setWidth100();
        keyGrid.setHeight( "80%" );
        keyGrid.setShowAllRecords(true); 
        keyGrid.setCanEdit(false);
        keyGrid.setFields( aliasField, sizeField );
        keyGrid.setCanResizeFields(true);  
        keyGrid.setData( new ListGridRecord[0] );
        
        IButton generateButton = new IButton("Generate new key");
        generateButton.setAlign(Alignment.CENTER);
        generateButton.addClickHandler(new ClickHandler() {  
            public void onClick(ClickEvent event) {  
            	showGenerateDialog();
            }
        });
        
        HLayout southLayout = new HLayout();
        southLayout.setWidth100();
        southLayout.setHeight( "*" );
        southLayout.setAlign(Alignment.CENTER);
        southLayout.addMember(generateButton);
        
        this.setMembersMargin(20);
        this.addMember(keyGrid);
        this.addMember(southLayout);
	}
	

	private void showGenerateDialog() {
		
        
		GenerateKeyDialog generateKeyPairWindow = new GenerateKeyDialog();
		generateKeyPairWindow.setWidth(360);  
        generateKeyPairWindow.setHeight(115);  
        generateKeyPairWindow.setTitle("Key Pair Generation");  
        generateKeyPairWindow.setShowMinimizeButton(false);  
        generateKeyPairWindow.setIsModal(true);  
        generateKeyPairWindow.setShowModalMask(true);  
        generateKeyPairWindow.centerInPage(); 
        generateKeyPairWindow.show();
        
//        if ( generateKeyPairWindow.getResult() ) {
//        	
//        }
	}

}
