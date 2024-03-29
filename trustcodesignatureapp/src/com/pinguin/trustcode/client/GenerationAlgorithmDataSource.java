package com.pinguin.trustcode.client;

import java.util.HashSet;
import java.util.Set;

import com.smartgwt.client.data.DataSource;
import com.smartgwt.client.data.Record;
import com.smartgwt.client.data.fields.DataSourceIntegerField;
import com.smartgwt.client.data.fields.DataSourceTextField;

public class GenerationAlgorithmDataSource extends DataSource {  
	public static final String ALGORITHM_FIELD = "algorithm";
	public static final String SIZE_FIELD = "keySize";
	
	private static GenerationAlgorithmDataSource instance = null;  
	
	public Set<String> algorithms;
	
    public static GenerationAlgorithmDataSource getInstance() {  
        if (instance == null) {  
            instance = new GenerationAlgorithmDataSource("GenerationAlgorithmDataSource");  
        }  
        return instance;  
    }
    
    public String[] getAlgorithms() {
    	return algorithms.toArray( new String[0] );
    }
    
    private GenerationAlgorithmDataSource(String id) { 
    	algorithms = new HashSet<String>();
    	
        setID(id);
        setClientOnly(true); 
  
        DataSourceTextField algorithmField = new DataSourceTextField(ALGORITHM_FIELD, "Algorithm");  
        algorithmField.setRequired(true);
        algorithmField.setPrimaryKey(true);
  
        DataSourceIntegerField keySizeField = new DataSourceIntegerField(SIZE_FIELD, "Key Size");
        keySizeField.setRequired(true); 
  
        setFields(algorithmField, keySizeField);  
  
        addRecord( "RSA", 512 );
        addRecord( "RSA", 1024 );
        addRecord( "RSA", 2048 );
    }

	private void addRecord(String algorithm, int size) {
		Record record = new Record();
        record.setAttribute( ALGORITHM_FIELD, algorithm );
        record.setAttribute( SIZE_FIELD, size );
        addData( record );  
        
        algorithms.add( algorithm );
	}  
}
