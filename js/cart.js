(function() {

   setupView();

   function setupView() {
    if(user == null) {
        var errorMessage = document.createTextNode("Register or sign in in order to view your cart");
        var mainDiv = document.getElementById('main');
        while (mainDiv.firstChild) {
         mainDiv.removeChild(mainDiv.firstChild);
         }
        mainDiv.append(errorMessage);
        
    }
    else {

            getCart((items) => {
                let i = 1;
                var table = document.createElement("table"); 
                table.classList.add('itemTable');
                var header = table.createTHead();
                var row = header.insertRow(0);
                var cell = row.insertCell(0);
                cell.innerHTML = "<b>Item</b>";
                var cell2 = row.insertCell(1);
                cell2.innerHTML = "<b>Description</b>";
                console.log(items);
                //Create table rows for every item in the item array
                items.forEach(function(item){
                    var row = table.insertRow(i++);
                    var name = row.insertCell(0);
                    var description = row.insertCell(1);
                    name.innerHTML = item.name;
                    description.innerHTML = item.shortDescription;
                }); 
                mainDiv.appendChild(table);
            })
			

			
    }
   }

   function getCart() {
    //Get the items in the cart
    let urlPost = "http://localhost:8081/store-2.0.3.RELEASE/store/carts?username=" + user;
    var items;
    console.log(urlPost);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            items = xhttp.responseText;
            console.log("items", items);
            return items;
        }
    };

    xhttp.open("GET", urlPost, true);
    xhttp.send();
   }

})();