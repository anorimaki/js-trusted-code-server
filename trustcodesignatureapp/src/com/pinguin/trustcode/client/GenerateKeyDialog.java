package com.pinguin.trustcode.client;

import com.smartgwt.client.data.Criteria;
import com.smartgwt.client.types.Alignment;
import com.smartgwt.client.types.VerticalAlignment;
import com.smartgwt.client.widgets.IButton;
import com.smartgwt.client.widgets.Window;
import com.smartgwt.client.widgets.events.ClickEvent;
import com.smartgwt.client.widgets.events.ClickHandler;
import com.smartgwt.client.widgets.form.DynamicForm;
import com.smartgwt.client.widgets.form.fields.SelectItem;
import com.smartgwt.client.widgets.form.fields.TextItem;
import com.smartgwt.client.widgets.form.fields.events.ChangedEvent;
import com.smartgwt.client.widgets.form.fields.events.ChangedHandler;
import com.smartgwt.client.widgets.layout.VLayout;

public class GenerateKeyDialog extends Window {
	
	public GenerateKeyDialog() {
		final DynamicForm generateKeyPairForm = new DynamicForm();
		
		TextItem aliasItem = new TextItem();  
		aliasItem.setTitle("Alias");
		
		final SelectItem  algorithmItem = new SelectItem();
		algorithmItem.setName( GenerationAlgorithmDataSource.ALGORITHM_FIELD );
		algorithmItem.setTitle("Algorithm");
		algorithmItem.setHint("<nobr>Key algorithm</nobr>");
		algorithmItem.setOptionDataSource( GenerationAlgorithmDataSource.getInstance() );
		algorithmItem.addChangedHandler(new ChangedHandler() {  
            public void onChanged(ChangedEvent event) {  
            	generateKeyPairForm.clearValue("itemName");  
            }  
        });
		
		SelectItem keySizeItem = new SelectItem() {  
            @Override  
            protected Criteria getPickListFilterCriteria() {  
                String value = algorithmItem.getValueAsString();  
                Criteria criteria = new Criteria( GenerationAlgorithmDataSource.ALGORITHM_FIELD, value );  
                return criteria;  
            }  
        };
        keySizeItem.setName( GenerationAlgorithmDataSource.SIZE_FIELD );  
        keySizeItem.setTitle("Key size");  
        keySizeItem.setOptionDataSource( GenerationAlgorithmDataSource.getInstance() ); 
		
		generateKeyPairForm.setHeight( "80%" );  
		generateKeyPairForm.setWidth100();  
		generateKeyPairForm.setPadding(5);
		generateKeyPairForm.setLayoutAlign(VerticalAlignment.BOTTOM);  
		generateKeyPairForm.setFields( aliasItem, algorithmItem, keySizeItem );
		
		IButton generateButton = new IButton();
		generateButton.setLayoutAlign(Alignment.CENTER);
        generateButton.setTitle("Generate"); 
        generateButton.addClickHandler( new ClickHandler() {
			@Override
			public void onClick(ClickEvent event) {
//				result = new Result(
//						aliasItem.getValueAsString(),
//						algorithmItem.getValueAsString(), 
//						keySizeItem.getValueAsString()  );
				
			}
		});
		
        VLayout layout = new VLayout();  
        layout.setMembersMargin(10);  
        layout.addMember(generateKeyPairForm);  
        layout.addMember(generateButton);
        
        addItem( layout );
	}

	public static class Result {
		private String alias;
		private int keySize;
		private String algorithm;
	}
}
