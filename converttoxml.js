fs = require('fs');
var pretifyStringToXML = require('xml-formatter');

const outputDirName = "labelled_data";
//Directory names containing the images.
const oldDirName = "RGB5e38afae-712b-46be-a0fa-a0d253e15316"

//Current working directory path
const absolutePath = "/home/gowtham/Desktop/Unity3d/ConvertJSONtoXML/labelled_data/"

//Height and Width of the generated image
const width = "640"
const height = "640"

//Makes the output XML in human readable format.
const pretifyXML = false

//Captures.json count
const capturesJSONCount = 10



function JSONFormattoXML(recordColl,fileNamePNG)
{
    
    record = recordColl[0]
    var xmlString = '<annotation>' +
    "<folder>" + outputDirName + "</folder>" +
	"<filename>"+ fileNamePNG + "</filename>" +
    "<path>" + absolutePath + fileNamePNG +"</path>" +
    "<size><width>"+width+"</width><height>"+height+"</height><depth>3</depth></size>" ;
    recordColl.forEach(record => {
    xmlString +=  "<object>" +
            "<name>" + record.label_name +"</name>" +
            "<bndbox>" + 
                "<xmin>" + record.x + "</xmin>" +
                "<ymin>" + record.y + "</ymin>" +
                "<xmax>" + String(parseInt(record.x) + parseInt(record.width)) + "</xmax>" +
                "<ymax>" + String(parseInt(record.y) + parseInt(record.height)) + "</ymax>" +
            "</bndbox>" +
        "</object>" 
    });
	
    xmlString = xmlString + "</annotation>" ;
    return xmlString
}

function ConvertJSONtoXML(err,data) {
    
    if (err) {return console.log(err);}
    
    var content = JSON.parse(data)

    for(i = 0; i < content.captures.length; i ++)
    {
        fileNamePNG = content.captures[i].filename.replace(oldDirName+"/","")
        fileNameXML = fileNamePNG.replace('png', 'xml')
        MovePictures(fileNamePNG)
        console.log(fileNameXML)

        var recordColl = []
        for(j = 0; j < content.captures[i].annotations[0].values.length; j ++)
        {   
            var record = content.captures[i].annotations[0].values[j];
            recordColl.push(record)
        }

        if(pretifyXML)
            var xmlValue = pretifyStringToXML(JSONFormattoXML(recordColl, fileNamePNG));
        else
            var xmlValue = JSONFormattoXML(recordColl, fileNamePNG);
        
        fs.writeFile(outputDirName + "/" + fileNameXML,xmlValue, function (err) {
            if (err) 
                return console.log(err);
        });
    }    
}

function MovePictures(fileName)
{
    var newPath =  outputDirName + "/" + fileName
    var oldPath = oldDirName + "/" + fileName

    fs.copyFile(oldPath, newPath, function (err) {if (err) return console.log(err); console.log(fileName)})
}

function pad_with_zeroes(number, len=3) {
    var zeroes = "0".repeat(len);
    return zeroes.substring(number.toString().length, len) + number;
}


function Main()
{
    console.log("Hope you have changed the image height and width which are mentioned above.")
    for(i = 0; i <= capturesJSONCount; i ++)
    {   
        fileName = "Dataset/captures_"+pad_with_zeroes(i)+".json";
        fs.readFile(fileName, "UTF-8",ConvertJSONtoXML);
    }   

    console.log("Finished")
}

Main()
