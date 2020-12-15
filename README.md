# ConvertUnityPerceptionJSONtoPascalPOCFormat
This repository contains a small script which will convert the unity perception package output to Pascal POC form for tensorflow object detection training.

Steps to perform
1. Open the Images directory mentioned in the output of unity console.
2. Copy the RGB********************** folder to the current working directory.
3. Copy the dataset****************** folder contents to the dataset folder in current working directory.
4. Open the directory in code editor and change the required constants as per your scenario.
5. open console to path of current working directory
6. run "node converttoxml.js"

Expected output:
Will list all the input and output files it moved to the "labelled_data" folder.

If any feature request or bugs are found, Please raise them.