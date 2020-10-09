Login into ADP portal 
https://my.adp.com/static/redbox/login.html
go to chrome --> developer tool
->sources ->snippets



var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://my.adp.com/v1_0/O/A/payStatements?adjustments=yes&numberoflastpaydates=999');
xhr.setRequestHeader("Access-Control-Allow-Origin", "*"); // CORS policy
xhr.onload = async function() {
    if (xhr.status === 200) {
        var rawData = JSON.parse(xhr.responseText);

        for (var index = rawData.payStatements.length - 1; index >= 0; --index) {
            var entry = rawData.payStatements[index];
            var url = "https://my.adp.com" + entry.statementImageUri.href.substring(3);
            var a = document.createElement('a');

            var trueIndex = (rawData.payStatements.length - index);
            if (trueIndex < 10) {
                trueIndex = "00" + trueIndex;
            } else if (trueIndex < 100) {
                trueIndex = "0" + trueIndex;
            }

            a.download = "payslip.no." + trueIndex + ".from." + entry.payDate + ".pdf";
            a.href = url;
            document.body.appendChild(a);

            await sleep(500);
            a.click();
            delete a;
        }
    } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();

function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
