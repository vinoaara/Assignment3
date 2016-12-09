/*creating a interface to read the file*/
var read=require('fs');              
var lineReader = require('readline').createInterface({
	input: read.createReadStream('../Indicators.csv'),
});

/*insializing variables*/
var jsonArray=[];           
var heading= [];
var row=0;
var count=0;

var year=1960; 
var sum=0;
var sum1=0;
var countryName=["Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia",
"China","Cyprus","Georgia","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan","Laos",
"Lebanon","Malaysia","Maldives","Mongolia","Myanmar (Burma)","Nepal","North Korea","Oman","Pakistan","Palestine",
"Philippines","Qatar","Russia","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan","Tajikistan","Thailand",
"Timor-Leste","Turkey","Turkmenistan","United Arab Emirates (UAE)","Uzbekistan","Vietnam","Yemen"];
/*Reading the data from the csv file*/
lineReader.on('line', function (line)  {
	if(row === 0){
		heading = line.split(',');
		row++;
	}
	else {
		var jsonObj = {};
		var currentLineData = line.split(',');
		for (var j=0; j<heading.length; j++) {
			if(heading[j] == "Year"){

				for(var i=0;i<countryName.length;i++){
					if(currentLineData[j-4] == countryName[i] && currentLineData[j-1] == "SP.RUR.TOTL.ZS" ){
						sum+=parseFloat(currentLineData[j+1]);

					}
				}
				for(var i=0;i<countryName.length;i++){
					if(currentLineData[j-4] == countryName[i] && currentLineData[j-1] == "SP.URB.TOTL.IN.ZS" ){
						sum1+=parseFloat(currentLineData[j+1]);
					}
				}
				if(currentLineData[j]>year){

					jsonObj[heading[j]] =year; 
					jsonObj["Rural"] =sum;
					jsonObj["urban"] =sum1;

					jsonArray.push(jsonObj); 
					sum=0;
					sum1=0
					year=year+1;
				}

			}

		}

	}
});
/*Appending the data into output file*/
lineReader.on('close',function() {
	var jso=JSON.stringify(jsonArray);
		//console.log(jso);
		read.writeFile('bar.json',jso,function(err) {});
	});
