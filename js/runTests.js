function runTests() {
  var restApiUris = [
	"http://localhost:8080/music-2.0.3.RELEASE/music/albums",
	"http://localhost:8080/music-2.0.3.RELEASE/music/albums/1",
	"http://localhost:8080/music-2.0.3.RELEASE/music/albums/string",
	"http://localhost:8080/music-2.0.3.RELEASE/music/albums/string/1",
	"http://localhost:8080/music-2.0.3.RELEASE/music/albums/titles"
  
  ];
  var table = document.getElementById("testResultsTable");

  /**Run each REST API call asynchronously and add results to a table.  
  The order of the results could vary each time.  The order in the table
	depends on: 
		1. the order each call finishes during each run of the loadDoc() method, and
		2. how the browser implements insertRow(index) when index is -1. Some add the
			row to the end of the table, and others add it at the top.
	**/
  for(var i=0; i<restApiUris.length; i++){
	  var xhttp = new XMLHttpRequest();
	  var url = restApiUris[i];
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var row = table.insertRow(-1); /**Creates a new <tr> element at 1st or last postion, depending on browser. **/
			var urlCell = row.insertCell(0);
			var dataCell = row.insertCell(1);
			urlCell.innerHTML = "<a href='"+this.responseURL+"'>"+this.responseURL+"</a>";
			dataCell.innerHTML = this.responseText;
		}
	  };
	  xhttp.open("GET", url, true);
	  xhttp.send();
   }

}
