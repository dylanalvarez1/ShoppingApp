(function() {
	var dc = new DataController(true); //true ==> use local API

	/**Define what to do with the album titles list **/
	var populateItemListTile = function (items){
		//console.log("items", items);
		var itemDiv = document.getElementById("itemList");
		if(itemDiv != null)
		{
			var titleProp = "title";
			if(items.items != null){
				items = items.items.item;
				titleProp = "name";
			}
	
			/**Clear existing views **/
			removeChildNodes(document.getElementById("itemDetails"));
			removeChildNodes(itemDiv);
	
			//Create tiles for every item in the item array
			items.forEach(function(item){
				/**Define the item "tile" **/	
				//console.log("debug:", item.name);	
				//console.log("debug item:", item);
				var tileNode = createTileNode(item.shortDescription, "item", item);
				tileNode.addEventListener("click", function(){
							setupDetailView(this, item.id);
							});
				itemDiv.appendChild(tileNode);
			});
		}
		
	}

	var populateItemListTable = function (items){
		var itemDiv = document.getElementById("itemList");
	
		if(itemDiv != null) {
		
			/**Clear existing views **/
			removeChildNodes(document.getElementById("itemDetails"));
			removeChildNodes(itemDiv);

			var table = document.createElement("table"); 
			table.classList.add('itemTable');
			var header = table.createTHead();
			var row = header.insertRow(0);
			var cell = row.insertCell(0);
			cell.innerHTML = "<b>Item</b>";
			var cell2 = row.insertCell(1);
			cell2.innerHTML = "<b>Description</b>";

			let i = 1;
			//Create table rows for every item in the item array
			items.forEach(function(item){
				var row = table.insertRow(i++);
				var name = row.insertCell(0);
				var description = row.insertCell(1);
				name.innerHTML = item.name;
				description.innerHTML = item.shortDescription;
				row.addEventListener("click", function(){
					setupDetailView(this, item.id);
					});
			}); 

			itemDiv.appendChild(table);
		}

	}
	
	
	var setupDetailView = function (itemDiv, itemId){
		var detailDiv = document.getElementById("itemDetails");
		var itemDivCopy = itemDiv.cloneNode(true);
		removeChildNodes(detailDiv);
		detailDiv.appendChild(itemDivCopy);
		dc.getItemById(itemId, showItemDetails); 
	}
	
	var showItemDetails = function (item){
		console.log(item);
		var detailDiv = document.getElementById("itemDetails");
		var itemDiv = detailDiv.childNodes[0];
		itemDiv.classList.add("displayItem");

		//Item info
		var itemArray = [9];
		itemArray[0] = ("Item id: " + item.id);
		itemArray[1] = ("Item name: " + item.name);
		itemArray[2] = ("Item brand: " + item.brandName);
		itemArray[3] = ("Item price: " + item.salePrice);
		itemArray[4] = ("Item size: " + item.size);
		itemArray[5] = ("Item color: " + item.color);
		itemArray[6] = ("Item upc: " + item.upc);
		itemArray[7] = ("Item msrp: " + item.msrp);
		itemArray[8] = ("Item gender: " + item.gender);

		//Display item information

		for(let j = 0; j < itemArray.length; j++) {
			let div = document.createElement('div');
			div.innerHTML = itemArray[j];
			console.log("div", div);
			itemDiv.appendChild(div);
		}




		var button = document.createElement('BUTTON');
		var br = document.createElement('br');

		button.addEventListener("click", function () {
			//if signed in, it will add to cart, if not, it will display a message to sign in
			if(user == null) {
				itemDiv.innerHTML = "Please sign in if you want to add items to your cart to purchase them later"
			}
			else {
				let urlPut =  'https://store-webapp-dylan.herokuapp.com/' +"store/carts?" + "productId=" + item.id + "&username=" + user;
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && (this.status == 200 || this.status == 201)) {
						//send an alert, clear the form
						alert("User " + user + " added " + item.name + " to their cart!");
						
		
					}
				};
		
			xhttp.open("POST", urlPut, true);
			//xhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send();
			}


		});
		var text = document.createTextNode("Add to cart");

		button.appendChild(text);
		itemDiv.append(br);
		itemDiv.append(button);
		
	}
	
	var createTileNode = function(title, classType, item){
		let itemClass = item.name.split(" ");
		var tileNode = document.createElement("div");
		var titleNode = document.createTextNode(title);
		var itemNode = document.createElement("div");
		itemNode.className = itemClass[1]+"Icon";
		tileNode.className = classType+"TileDiv";
		tileNode.appendChild(itemNode);
		tileNode.appendChild(titleNode);
		return tileNode;
	}
	
	var createPropTextNode = function(str){
		var detailDiv = document.getElementById("itemDetails");
		var propNode = document.createElement("div");
		var textNode = document.createTextNode(str);
		propNode.appendChild(textNode);
		detailDiv.appendChild(propNode);					
	}

	/**Set event listener for radio buttons**/
	var apiRadioButtons = document.getElementsByName("api");
	apiRadioButtons.forEach(function(button){
		button.addEventListener("click", function(){
			var value = button.value;
			if (value === "tile") {
				//use tile view
				dc.isLocalApi = true; //leave to not break api call
				console.log("Tile fill!");
				reloadPage();
				dc.getAllItems(populateItemListTile);

			}
			else { // use table view
				//dc.isLocalApi = false;
				console.log("Table fill!");
				reloadPage();
				dc.getAllItems(populateItemListTable);
			}
			
			

		});
		
	});
	
	var removeChildNodes = function(parentDiv){
		if(parentDiv != null)
		{
			while (parentDiv.hasChildNodes()) {
				parentDiv.removeChild(parentDiv.firstChild);
			}
		}
		
	}

	var reloadPage = function load_js() {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.src= 'js/init.js';
      head.appendChild(script);
   }

   reloadPage();
	
	
	/**Call the getAllAlbums function and provide the above 
	defined callback function.  The DataController will execute this callback
	function after data is successfully returned.**/	
	dc.setBaseUrl();
	dc.getAllItems(populateItemListTile);
	
})();