	/*creating a interface to read the file*/
	var read=require('fs');              
	var lineReader = require('readline').createInterface({
		input: read.createReadStream('Indicators.csv'),
	});

	/*insializing variables*/
	var jsonArray=[];           
	var heading= [];
	var row=0;
	var count=0;
	/*Reading the data from the csv file*/
	lineReader.on('line', function (line)  {
		if(row === 0){
			heading = line.split(',');
			row++;
		}
		else {
			var jsonObj = {};
			var currentLineData = line.split(',');
	       //console.log(currentLineData);
	       for (var j=0; j<heading.length; j++) {
	       	if(heading[j] == "IndicatorName"){
	       		if(currentLineData[j-1] == "IND" && (currentLineData[j+1] == "SP.URB.TOTL.IN.ZS" || currentLineData[j+1] == "SP.RUR.TOTL.ZS")) {
	       			jsonObj[heading[j]] = currentLineData[j]; 
	       			count=1;
	       		}
	       		else
	       			count=0;
	       	} 
	       	if(heading[j] == "Year"){
	       		if(currentLineData[j-3] == "IND" && (currentLineData[j-1] == "SP.URB.TOTL.IN.ZS" || currentLineData[j-1] == "SP.RUR.TOTL.ZS")) {
	       			jsonObj[heading[j]] = currentLineData[j]; 
	       			count=1;
	       		}
	       		else
	       			count=0;
	       	} 
	       	if(heading[j] == "Value"){
	       		if(currentLineData[j-4] == "IND" && (currentLineData[j-2] == "SP.URB.TOTL.IN.ZS" || currentLineData[j-2] == "SP.RUR.TOTL.ZS")) {
	       			jsonObj[heading[j]] = currentLineData[j]; 
	       			count=1;
	       		}
	       		else
	       			count=0;
	       	} 
	       	
	       }
	       if(count == 1)
	       	jsonArray.push(jsonObj);

	             
	   }
	   

	});
	/*Appending the data into output file*/
	lineReader.on('close',function() {
		var jso=JSON.stringify(jsonArray);
		read.writeFile('linechart.json',jso,function(err) {});
	});

