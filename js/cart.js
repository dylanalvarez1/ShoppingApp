(function() {

   setupView();

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

   function setupView() {
    if(user == null) {
        var errorMessage = document.createTextNode("Register or sign in to view your cart");
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
    let urlPost = "https://store-webapp-dylan.herokuapp.com/store/carts?username=" + user;
    
    //console.log(urlPost);
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
            var cellH3 = rowH.insertCell(2);
            cellH3.innerHTML = "<b>Price</b>";

            let totalPrice = 0;
            let i = 1;
            items.forEach(item => {
                let row = table.insertRow(i++);
                let name = row.insertCell(0);
                let description = row.insertCell(1);
                let price = row.insertCell(2);
                name.innerHTML = item.name;
                description.innerHTML = item.shortDescription;
                price.innerHTML = item.salePrice;
                totalPrice += item.salePrice;
            });
            
          
          
            while (mainDiv.hasChildNodes()) {
				mainDiv.removeChild(mainDiv.firstChild);
            }
            
            updatePrice(totalPrice);

            var buyCart = document.createElement("BUTTON");
            buyCart.innerHTML = "Purchase Cart";
            buyCart.addEventListener("click", function () {

                //route: /carts/purchase/{cartId}
                let urlPurchase = "https://store-webapp-dylan.herokuapp.com/store/carts/purchase/" + json.cartId;
                var xhttp = new XMLHttpRequest();

                //When the request goes through (after hitting purchase button), remove the table
                xhttp.onreadystatechange = function() {
                    var errorMessage = document.createTextNode("You successfully purchased the cart!");
                    while (mainDiv.hasChildNodes()) {
                        mainDiv.removeChild(mainDiv.firstChild);
                    }
                    mainDiv.append(errorMessage); 
                };
            
                xhttp.open("PUT", urlPurchase, true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send();
            });
            mainDiv.appendChild(buyCart);
            mainDiv.appendChild(table);
        }
        else if(this.readyState == 4 && this.status == 500) {
            
            var errorMessage = document.createTextNode("Make sure your cart has some items in it before you try and purchase it!");
            var mainDiv = document.getElementById('main');
            document.getElementById('showButton').style.display = "none";
            while (mainDiv.firstChild) {
            mainDiv.removeChild(mainDiv.firstChild);
            }
            mainDiv.append(errorMessage);
        }
    };

    xhttp.open("GET", urlPost, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

    /* let data1 = jsonp(urlPost);
	data1.then((res) => {
        let json = JSON.parse(res);
        let items = JSON.parse(res).items;
        console.log("items", items);

        var mainDiv = document.getElementById('main');
        var table = document.createElement("table"); 
        table.classList.add('itemTable');
        var headerH = table.createTHead();
        var rowH = headerH.insertRow(0);
        var cellH = rowH.insertCell(0);
        cellH.innerHTML = "<b>Item</b>";
        var cellH2 = rowH.insertCell(1);
        cellH2.innerHTML = "<b>Description</b>";
        var cellH3 = rowH.insertCell(2);
        cellH3.innerHTML = "<b>Price</b>";

        let totalPrice = 0;
        let i = 1;
        items.forEach(item => {
            let row = table.insertRow(i++);
            let name = row.insertCell(0);
            let description = row.insertCell(1);
            let price = row.insertCell(2);
            name.innerHTML = item.name;
            description.innerHTML = item.shortDescription;
            price.innerHTML = item.salePrice;
            totalPrice += item.salePrice;
        });
        
        
        
        while (mainDiv.hasChildNodes()) {
            mainDiv.removeChild(mainDiv.firstChild);
        }
        
        updatePrice(totalPrice);

        var buyCart = document.createElement("BUTTON");
        buyCart.innerHTML = "Purchase Cart";

        buyCart.addEventListener("click", function () {

            //route: /carts/purchase/{cartId}
            let urlPurchase = "https://store-webapp-dylan.herokuapp.com/store/carts/purchase/" + json.cartId;

            let data3 = jsonp(urlPurchase);
            data3.then((res3) => {
                var errorMessage = document.createTextNode("You successfully purchased the cart!");
                while (mainDiv.hasChildNodes()) {
                    mainDiv.removeChild(mainDiv.firstChild);
                }
                mainDiv.append(errorMessage); 
            });
        });
        mainDiv.appendChild(buyCart);
        mainDiv.appendChild(table);

		
	}); */
   }

   function updatePrice(price) {
    console.log("in update price")
    var mainDiv = document.getElementById('main');
    var priceDiv = document.createElement("div");
    priceDiv.style.textAlign = "right";
    
    var afterTax =  document.createTextNode("Total: " + ((price * .08) + price));
    var beforeTax = document.createTextNode("Subtotal: " + price);
    priceDiv.append(beforeTax);
    priceDiv.append(document.createElement("br"));
    priceDiv.append(afterTax);
    mainDiv.insertAdjacentElement('beforeend', priceDiv);
   }
})();