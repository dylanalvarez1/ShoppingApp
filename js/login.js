(function() {
    //If the user is signed in 
   
        if(user != null) {
            signedIn();
        }
        else {
            notSignedIn();
        }


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
   
     function notSignedIn() {
        //If the user is not signed in
        var apiRadioButtons = document.getElementsByName("myRadios");

        document.getElementById("loginform").style.display = "block"; 
        document.getElementById("userprofile").style.display = "none"; 
        document.getElementById('radio1').style.display = "block";
        document.getElementById('radio2').style.display = "block";
        var signoutButton = document.getElementById('signout');
        signoutButton.style.display = "none";

        //Submit buttons event listener
        var button1 = document.getElementById('validateForm');
        var button2 = document.getElementById('validateForm2');
        var button3 = document.getElementById('validateForm3');

        

        if(addedSigninListener) {
            button1.addEventListener("click", function() {
                console.log("submit form 1");
                validateForm();
            });
            button2.addEventListener("click", function() {
                console.log("submit form 2");
                validateForm2();
            });
    
            button3.addEventListener("click", function() {
                console.log("submit form 3");
                validateForm3();
            });

            addedSigninListener = false;
        }    

        //Add event listeners
        apiRadioButtons.forEach(function(button){
            button.addEventListener("click", function(){
                var value = button.value;
                console.log("button", button)
                if (value === "register") {
                    document.getElementById("register").style.display = "block"; 
                    document.getElementById("login").style.display = "none"; 
                    console.log("radio login")
                }
                else { 
                    document.getElementById("login").style.display = "block"; 
                    document.getElementById("register").style.display = "none"; 
                    console.log("radio signin ")
                }
                

            });
            
        });
        
     }

     function signedIn() {
        if(user != null) 
        {
            var table = document.getElementById("purchaseTable");

            document.getElementById("loginform").style.display = "none"; 
            document.getElementById('radio1').style.display = "none";
            document.getElementById('radio2').style.display = "none";
            document.getElementById("userprofile").style.display = "block";

            document.getElementById('usernameProfile').innerHTML = "Username: " + user;
            document.getElementById('fnameProfile').innerHTML = "First Name: " + userFname;
            document.getElementById('lnameProfile').innerHTML = "Last Name: " + userLname;
            document.getElementById('emailProfile').innerHTML = "Email: " + userEmail;

            var signoutButton = document.getElementById("signout");
            signoutButton.style.display = "block";

            
            signoutButton.addEventListener("clicked", function() {
                console.log("clicked signoutButton");
                signout();
            }); 
            
            //Update the purchase history, so first get all items
            //Then for each item, get Users who bought product, and if they bought it, add item to table
            var purchasedItems;
            let urlGetItems = 'https://store-webapp-dylan.herokuapp.com/store/items/';
            /* var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let purchaseTable = document.getElementById('purchaseTable');
                    purchasedItems = JSON.parse(xhttp.responseText);
                   // console.log("purchasedItems:", purchasedItems);
                    purchasedItems.forEach(item => {
                        //console.log("item:", item);
                        let tempUrl = 'https://store-webapp-dylan.herokuapp.com/store/carts/products?productId=' + item.id;
                        //console.log("tempUrl:", tempUrl);
                        let xhttp4 = new XMLHttpRequest();
                        xhttp4.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                let response = JSON.parse(xhttp4.responseText);
                                //console.log("response:", response);
                                let i=1;
                                response.forEach(userWhoBoughtItem => {

                                    //Add item to the list
                                    if(userWhoBoughtItem.username == user) {
                                        var row = table.insertRow(i++);
                                        var name = row.insertCell(0);
                                        var description = row.insertCell(1);
                                        var price = row.insertCell(2);
                                        name.innerHTML = item.name;
                                        description.innerHTML = item.shortDescription;
                                        price.innerHTML = item.salePrice;

                                    }
                                });
                            }
                        }
                        xhttp4.open("GET", tempUrl, true);
                        xhttp4.send();
                    });

                }
            };
    
        xhttp.open("GET", urlGetItems, true);
        xhttp.send(); */

        let data1 = jsonp(urlGetItems);
        data1.then((res) => {
            let purchaseTable = document.getElementById('purchaseTable');
            purchasedItems = JSON.parse(res);
            purchasedItems.forEach(item => {
                //console.log("item:", item);
                let tempUrl = 'https://store-webapp-dylan.herokuapp.com/store/carts/products?productId=' + item.id;
                let data2 = jsonp(tempUrl);
                data2.then((res2) => { 
                    let response = JSON.parse(res2);
                    let i=1;
                    response.forEach(userWhoBoughtItem => {

                        //Add item to the list
                        if(userWhoBoughtItem.username == user) {
                            var row = table.insertRow(i++);
                            var name = row.insertCell(0);
                            var description = row.insertCell(1);
                            var price = row.insertCell(2);
                            name.innerHTML = item.name;
                            description.innerHTML = item.shortDescription;
                            price.innerHTML = item.salePrice;

                        }
                    });
                });
            });
    


        });
    
        } 
     }

    function signout () {
        console.log("in signout");
        user = null;
        var userFname = null;
        var userLname = null;
        var userEmail = null;
        notSignedIn();
    }
  

    function validateForm() {
        console.log("in validate")
        
        var w = document.getElementById("fnameField1").value;
        //console.log("fname1:", w);
        if (w ==  "" || w == undefined) {
            alert("fname must be filled out");
            return false;
        }

        var z = document.getElementById("lnameField1").value;
        //console.log("lname1:", z);
        if (z ==  "" || z == undefined) {
            alert("username must be filled out");
            return false;
        }

        var x = document.getElementById("userField1").value;
       // console.log("username1:", x);
        if (x ==  "" || x == undefined) {
            alert("username must be filled out");
            return false;
        }
        var y = document.getElementById("emailField1").value;
        //console.log("email1:", y);
        if (y == "" || y == undefined) {
            alert("email must be filled out");
            return false;
        }

        let userObject = {
            fname: null,
            lname: null,
            username: null,
            email: null
            }

        userObject.fname = w;
        userObject.lname = z;
        userObject.username = x;
        userObject.email = y;

        let once = true;
        if(once) {
            let urlPost = 'https://store-webapp-dylan.herokuapp.com/' +"store/customers?" + "fname=" + userObject.fname + "&lname=" + userObject.lname + "&username=" + userObject.username + "&email=" + userObject.email;
            /* var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && (this.status == 201) || (this.status == 200)) {
                    once = false;
                    user = userObject.username;
                    userFname = userObject.fname;
                    userLname = userObject.lname;
                    userEmail = userObject.email;
    
                    //console.log("user:", user);
                    signedIn();
                    alert("Congrats " + user + ", you have successfully created an account!");
                    
                    document.getElementById("emailField1").value = "";
                    document.getElementById("fnameField1").value = "";
                    document.getElementById("lnameField1").value = "";
                    document.getElementById("userField1").value = "";
    
                    
                }
            };
    
            xhttp.open("POST", urlPost, true);
            xhttp.send(); */

            let data1 = jsonp(urlPost);
            data1.then((res) => {
                once = false;
                user = userObject.username;
                userFname = userObject.fname;
                userLname = userObject.lname;
                userEmail = userObject.email;

                //console.log("user:", user);
                signedIn();
                alert("Congrats " + user + ", you have successfully created an account!");
                
                document.getElementById("emailField1").value = "";
                document.getElementById("fnameField1").value = "";
                document.getElementById("lnameField1").value = "";
                document.getElementById("userField1").value = "";
            });
        }
       
    
    }

    function validateForm2() {
        var w = document.getElementById("userField2").value;
        //console.log("username2:", w);
        if (w == "" || w == undefined) {
            alert("username must be filled out");
            return false;
        }
        
        let dc = new DataController(true);

        let once = true;
        if(once) {
            dc.getUserByUsername(w, function(data) {
                //use the response data to set the cookies values to whatever the user that is returned
                //If none is returned, make another request to create a user
                once = false;
               // console.log(data);
                user = data.username;
                userFname = data.fname;
                userLname = data.lname;
                userEmail = data.email;
                /* console.log("userFname", userFname);
                console.log("userLname", userLname);
                console.log("userEmail", userEmail); */
                document.cookie = "username="+data.username;
                //console.log("user", user);
                console.log("cookie", document.cookie);
                //Change view to sign in
                signedIn();
                alert("Hi " + user + ", thanks for logging on!");
                
               
            }).then(() => {
                if(user == null) {
                alert('User does not exist!');
                }
            });
        }
       
    } 

    function validateForm3() {
        var w = document.getElementById("updateFname").value;
        //console.log("fname:", w);
        if (w ==  "" || w == undefined) {
            alert("fname must be filled out");
            return false;
        }

        var z = document.getElementById("updateLname").value;
        //console.log("lname:", z);
        if (z ==  "" || z == undefined) {
            alert("username must be filled out");
            return false;
        }

        var y = document.getElementById("updateEmail").value;
        //console.log("email:", y);
        if (y == "" || y == undefined) {
            alert("email must be filled out");
            return false;
        }

        let userObject = {
            fname: null,
            lname: null,
            username: null,
            email: null
            }

        userObject.fname = w;
        userObject.lname = z;
        userObject.email = y;
      
        //Update user fields
        let urlPut = 'https://store-webapp-dylan.herokuapp.com/' +"store/customers?" + "fname=" 
        + userObject.fname + "&lname=" 
        + userObject.lname + "&username=" + user + "&email=" + userObject.email;

       /*  var xhttp3 = new XMLHttpRequest();
        xhttp3.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //send an alert, clear the form
                alert("User " + user + " updated successfully!");
                document.getElementById("updateEmail").value = "";
                document.getElementById("updateFname").value = "";
                document.getElementById("updateLname").value = "";

                document.getElementById("emailProfile").innerHTML = "Email: " + userObject.email;
                document.getElementById("fnameProfile").innerHTML = "First Name: " + userObject.fname;
                document.getElementById("lnameProfile").innerHTML = "Last Name: " + userObject.lname;

            }
        };

        xhttp3.open("PUT", urlPut, true);
        //xhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp3.send(); */

        let data1 = jsonp(urlPut);
        data1.then((res) => {
            //send an alert, clear the form
            alert("User " + user + " updated successfully!");
            document.getElementById("updateEmail").value = "";
            document.getElementById("updateFname").value = "";
            document.getElementById("updateLname").value = "";

            document.getElementById("emailProfile").innerHTML = "Email: " + userObject.email;
            document.getElementById("fnameProfile").innerHTML = "First Name: " + userObject.fname;
            document.getElementById("lnameProfile").innerHTML = "Last Name: " + userObject.lname;
        });
        
    } 



})();