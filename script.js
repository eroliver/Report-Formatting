let Report = document.getElementById("Report").innerHTML.replace(/,/g,'').replace(/[\r\n]+/gm, '');
let dataArray = [];
//
const dataToArray = function(data) {
    //cycle through entries
    for ( let entry = 1; entry < 184; entry++ ) {
        //split entry from previous and next
        let swipe = Report.split(`${entry})`).join('&').split(`${entry + 1})`).join('&').split('&');
        let info = swipe[1].split('LVL').join('&').split('TYPE').join('&').split(' : ').join('&').split('ID#:').join('&').split('KEY #').join('&').split('KEY #').join('&').split('Key User Assign').join('&').split('Expiring:').join('&').split('From:').join('&').split('Used On:').join('&').split('STDa').join('&').split('Unadjusted').join('&').split('&');
        const header = info.pop();
        

        if (info.length < 12){
            info.splice(7,0, 'N/A')
        };
        if (info.length < 13){
            info.splice(8,0,'N/A')
        };
        if (info.length < 14){
            info.splice(9,0,'N/A')
        };
        if (info.length < 15){
            info.splice(10,0,'N/A')
        };
        if (info.length < 16){
            info.splice(11,0,'N/A')
        };
        //remove blank entry
        info.splice(0,1);

        //if statements remove straggler text missed by the base cutting.
        if (info[2].length > 18){
            let removeKey = info[2].split(' ');
            info[2] = removeKey[0] += removeKey[1] += removeKey[2];
        };

        if (info[4].length > 6){
            let removePossible = info[4].split(' ');
            info[4] = removePossible[0];
        };

        if (info[6].length > 20){
            let removePossible1 = info[6].split('Possible');
            info[6] = removePossible1[0];
        };

        if (info[8].length > 20){
            let removePossible2 = info[8].split('Possible');
            info[8] = removePossible2[0];
        };
       
        if (info[5].indexOf('ment') !== -1){
           let removeMent = info[5].slice(5, info[5].length);
           info[5] = removeMent;
        };

        if (info[5].indexOf('ed:') !== -1){
                let removeEd = info[5].slice(4, info[5].length);
                info[5] = removeEd;
            };
            if (info[7].indexOf('ed:') !== -1){
                let removeEd = info[7].slice(4, 15);
                info[7] = removeEd;
            };
            if (info[9].indexOf('ed:') !== -1){
                let removeEd = info[9].slice(4, info[5].length);
                info[9] = removeEd;
            };
        info.splice(14,1);
        //possible.splice(info[4].indexOf('  Possible'), 1);

        //add entry to an array
        dataArray.push(`${entry},${info}`);
        console.log(info[7]);
    }

    //Creates headers and adds them
    dataArray.splice(0,0,['Entry','LVL','Type','Key Type','Key ID#','Key #','Key User','Expiring','Key User','Expiring','Key User','Expiring','From','Used On','Allowed']);
  // Building the CSV from the Data two-dimensional array
  // Each column is separated by "," and new line "\n" for next row
  var csvContent = '';
  dataArray.forEach(function(infoArray) {
    csvContent += infoArray + '\n';
  });
  
  // The download function takes a CSV string, the filename and mimeType as parameters
  // Scroll/look down at the bottom of this snippet to see how download is called
  var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
  
    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }
  
  download(csvContent, 'NameYourFile.csv', 'text/csv;encoding:utf-8');

}

dataToArray(Report);
