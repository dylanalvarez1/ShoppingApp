(function() {

   setupView();

   function setupView() {
    if(user == null) {
        var errorMessage = document.createTextNode("Register or sign in in order to view your cart");
        var mainDiv = document.getElementById('main');
        document.getElementById('showButton').style.display = "none";
        while (mainDiv.firstChild) {
         mainDiv.removeChild(mainDiv.firstChild);
         }
        mainDiv.append(errorMessage);
        
    }
    else {

            getCart();
			

			
    }
   }

   function getCart() {
    //Get the items in the cart
    let urlPost = "http://localhost:8081/store-2.0.3.RELEASE/store/carts?username=" + user;
    
    console.log(urlPost);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let json = JSON.parse(xhttp.responseText);
            let items = JSON.parse(xhttp.responseText).items;
            console.log("items", items)
            var mainDiv = document.getElementById('main');
            var table = document.createElement("table"); 
            table.classList.add('itemTable');
            var headerH = table.createTHead();
            var rowH = headerH.insertRow(0);
            var cellH = rowH.insertCell(0);
            cellH.innerHTML = "<b>Item</b>";
            var cellH2 = rowH.insertCell(1);
            cellH2.innerHTML = "<b>Description</b>";
            let i = 1;
            items.forEach(item => {
                let row = table.insertRow(i++);
                let name = row.insertCell(0);
                let description = row.insertCell(1);
                name.innerHTML = item.name;
                description.innerHTML = item.shortDescription;
            });
            
          
            while (mainDiv.hasChildNodes()) {
				mainDiv.removeChild(mainDiv.firstChild);
            }
            
            var buyCart = document.createElement("BUTTON");
            buyCart.innerHTML = "Purchase Cart";
            buyCart.addEventListener("click", function () {

                //route: /carts/purchase/{cartId}
                let urlPurchase = "http://localhost:8081/store-2.0.3.RELEASE/store/carts/purchase/" + json.cartId;
                var xhttp = new XMLHttpRequest();

                //When the request goes through (after hitting purchase button), remove the table
                xhttp.onreadystatechange = function() {
                    while (mainDiv.hasChildNodes()) {
                        mainDiv.removeChild(mainDiv.firstChild);
                    }
                };
            
                xhttp.open("PUT", urlPurchase, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send();
            });
            mainDiv.appendChild(buyCart);
            mainDiv.appendChild(table);
        }
    };

    xhttp.open("GET", urlPost, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
   }

})();