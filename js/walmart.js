(function() {
	var dc = new DataController(false); //true ==> use local API

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
				
			}); 

			itemDiv.appendChild(table);
		}

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
	
	
	/**Call the getAllAlbums function and provide the above 
	defined callback function.  The DataController will execute this callback
	function after data is successfully returned.**/	
	dc.setBaseUrl();
	dc.getAllItems(populateItemListTile);
	
})();