/**Create a JavaScript object with a constructor, properties and functions **/
function DataController(isLocal){
	this.isLocalApi = isLocal;
	this.baseUrl = null;
	this.setBaseUrl();
	this.lastFmApiKey = "a8b2ef565a557676faf34944fc62e9b9"; /**If you would like to use Last FM API, you will need to register for a developer account and get an API key**/
}
DataController.prototype.setBaseUrl = function(){
	if(this.isLocalApi)
		this.baseUrl = 'http://localhost:8081/store-2.0.3.RELEASE/';
	else
		this.baseUrl = "http://ws.audioscrobbler.com/2.0/";

}


DataController.prototype.getItemTitles = function(callBackFunction){
	  var url = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/items/";
	  this.getData(url, callBackFunction);
	  
}

DataController.prototype.getAllItems = function(callBackFunction){
	  var url = 'http://localhost:8081/store-2.0.3.RELEASE/';
		if(this.isLocalApi)
			url += "store/items";
		else //http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=####&format=json
			url += "?method=tag.gettopalbums&tag=jazz&format=json&api_key="+this.lastFmApiKey;
	
	  this.getData(url, callBackFunction);
	  
}

DataController.prototype.getItemById = function(id, callBackFunction){
	  var url = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/items/"+id;
	  console.log("url:", url);
	  this.getData(url, callBackFunction);

}

DataController.prototype.getUserByUsername = function(username, callBackFunction){
	var url = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/customers/"+username;
	console.log("url:", url);
	this.getData(url, callBackFunction);

}

DataController.prototype.createUser = function(user){
	//?fname=Jane&lname=Doe&username=jdoe&email=jdoe@gmail.com
	console.log("creating user");
	var url = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/customers?" + "fname=" + user.fname + "&lname=" + user.lname + "&username=" + user.username + "&email=" + user.email;
	this.postData(url);

}

DataController.prototype.getData = function(url, callBackFunction){
	  var xhttp = new XMLHttpRequest();
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
	  xhttp.send();
}

DataController.prototype.postData = function(url){
	console.log("posting data");
	
}



