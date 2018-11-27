function jsonp(url) {
	return new Promise(function(resolve, reject) {
		let script = document.createElement('script')
		const name = "_jsonp_" + Math.round(100000 * Math.random());
		//url formatting
		if (url.match(/\?/)) url += "&callback="+name
		else url += "?callback="+name
		script.src = url;

		window[name] = function(data) {
			resolve(data);
			document.body.removeChild(script);
			delete window[name];
		}
		document.body.appendChild(script);
	});
}

/**Create a JavaScript object with a constructor, properties and functions **/
function DataController(isLocal){
	this.isLocalApi = isLocal;
	this.baseUrl = null;
	this.setBaseUrl();
	this.lastFmApiKey = "smz7vjqbgccrek7sh7e2bu74"; /**If you would like to use Last FM API, you will need to register for a developer account and get an API key**/
}
DataController.prototype.setBaseUrl = function(){
	if(this.isLocalApi)
		this.baseUrl = 'https://store-webapp-dylan.herokuapp.com/';
	else
		this.baseUrl = "http://api.walmartlabs.com/v1/";

}


DataController.prototype.getItemTitles = function(callBackFunction){
	  var url = 'https://store-webapp-dylan.herokuapp.com/' +"store/items/";
	  this.getData(url, callBackFunction);
	  
}

DataController.prototype.getAllItems = function(callBackFunction){
	  var url = 'https://store-webapp-dylan.herokuapp.com/';
		if(this.isLocalApi)
			url += "store/items";
		else //http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=####&format=json
			url += "?method=tag.gettopalbums&tag=jazz&format=json&api_key="+this.lastFmApiKey;
	
	  this.getData(url, callBackFunction);
	  
}

DataController.prototype.getItemById = function(id, callBackFunction){
	  var url = 'https://store-webapp-dylan.herokuapp.com/' +"store/items/"+id;
	  console.log("url:", url);
	  this.getData(url, callBackFunction);

}

DataController.prototype.getUserByUsername = function(username, callBackFunction){
	var url = 'https://store-webapp-dylan.herokuapp.com/' +"store/customers/"+username;
	console.log("url:", url);
	this.getData(url, callBackFunction);

}

DataController.prototype.getData = function(url, callBackFunction){
	  /* var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//console.log("txt",this.responseText);
			var jsonData = JSON.parse(this.responseText);
			if(callBackFunction != null){
				callBackFunction(jsonData);
			}
		}
	  };
	 
	  xhttp.open("GET", url, true);
	  xhttp.send(); */

	let data1 = jsonp(url);
	data1.then((res) => {
		//console.log("res", res);
		callBackFunction(res);
	});

}



