(function() {
    //If the user is signed in 
   
        if(user != null) {
            signedIn();
        }
        else {
            notSignedIn();
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

        signoutButton.addEventListener("click", function() {
            console.log("submit form 3");
            signout();
            notSignedIn();
        });

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
            document.getElementById("loginform").style.display = "none"; 
            document.getElementById('radio1').style.display = "none";
            document.getElementById('radio2').style.display = "none";
            document.getElementById("userprofile").style.display = "block";

            document.getElementById('usernameProfile').innerHTML = user;
            document.getElementById('fnameProfile').innerHTML = userFname;
            document.getElementById('lnameProfile').innerHTML = userLname;
            document.getElementById('emailProfile').innerHTML = userEmail;

            var signoutButton = document.getElementById("signout");
            signoutButton.style.display = "block";
            signoutButton.addEventListener("clicked", function() {
                console.log("clicked signoutButton");
                signout();
                notSignedIn();
            }); 


            var purchasedItems;
    
            //Update the purchase history, so first get item array from carts
            let urlPost = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/carts/" + user;
            console.log(urlPost);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let purchaseTable = document.getElementById('purchaseTable');
                    purchasedItems = xhttp.responseText;
                    console.log("purchasedItems", purchasedItems);
                }
            };
    
        xhttp.open("GET", urlPost, true);
        xhttp.send();
    
    
        } 
     }

    function signout () {
        console.log("in signout");
        user = null;
        var userFname = null;
        var userLname = null;
        var userEmail = null;
        notSignedIn();
        location.reload(); 
    }
  

    function validateForm() {
        console.log("in validate")
        
        var w = document.getElementById("fnameField1").value;
        console.log("fname1:", w);
        if (w ==  "" || w == undefined) {
            alert("fname must be filled out");
            return false;
        }

        var z = document.getElementById("lnameField1").value;
        console.log("lname1:", z);
        if (z ==  "" || z == undefined) {
            alert("username must be filled out");
            return false;
        }

        var x = document.getElementById("userField1").value;
        console.log("username1:", x);
        if (x ==  "" || x == undefined) {
            alert("username must be filled out");
            return false;
        }
        var y = document.getElementById("emailField1").value;
        console.log("email1:", y);
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

        let urlPost = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/customers?" + "fname=" + userObject.fname + "&lname=" + userObject.lname + "&username=" + userObject.username + "&email=" + userObject.email;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 201) || (this.status == 200)){
                user = userObject.username;
                userFname = userObject.fname;
                userLname = userObject.lname;
                userEmail = userObject.email;
                console.log("user:", user);
                signedIn();
                alert("Congrats " + user + ", you have successfully created an account!");
                
            }
        };

	xhttp.open("POST", urlPost, true);
    xhttp.send();
    
    }

    function validateForm2() {
        var w = document.getElementById("userField2").value;
        console.log("username2:", w);
        if (w == "" || w == undefined) {
            alert("username must be filled out");
            return false;
        }
        
        let dc = new DataController(true);

        dc.getUserByUsername(w, function(data) {
            //use the response data to set the cookies values to whatever the user that is returned
            //If none is returned, make another request to create a user
            console.log(data);
            user = data.username;
            userFname = data.fname;
            userLname = data.lname;
            userEmail = data.email;
            console.log("userFname", userFname);
            console.log("userLname", userLname);
            console.log("userEmail", userEmail);
            document.cookie = "username="+data.username;
            console.log("user", user);
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

    function validateForm3() {
        var w = document.getElementById("updateUsername").value;
       
        if (w == "" || w == undefined) {
            alert("username must be filled out");
            return false;
        }

        var x = document.getElementById("updateEmail").value;
        
        if (x == "" || x == undefined) {
            alert("email must be filled out");
            return false;
        }
        console.log("userFname", userFname);
      //============================================================================================================================
      //TODO CURRENTLY BUSTED AS LOGICALLY WE CANT UPDATE USERNAME DUE TO HOW THE API IS SET UP
      //============================================================================================================================
        let urlPut = 'http://localhost:8081/store-2.0.3.RELEASE/' +"store/customers?" + "fname=" 
        + userFname + "&lname=" 
        + userLname + "&username=" + user + "&email=" + x;

        var xhttp3 = new XMLHttpRequest();
        xhttp3.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //send an alert, clear the form
                alert("User " + user + " updated successfully!");
                document.getElementById("updateEmail").value = "";
                document.getElementById("updateUsername").value = "";

            }
        };

    xhttp3.open("PUT", urlPut, true);
    //xhttp3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp3.send();
        
    } 



})();