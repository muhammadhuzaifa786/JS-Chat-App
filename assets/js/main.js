function checklogin() {
    var x = localStorage.getItem("email");
    console.log(x)
    if (x == null || x == "null") {
        document.getElementById("login_container").style.display = "block";
    } else {

        userslist();

    }
}

function createaccount() {

    document.getElementById("login_container").style.display = "none"
    document.getElementById("signup_container").style.display = "block"
}


function signUp() {

    var nulls = "null";
    localStorage.setItem("email", nulls);
    localStorage.setItem("name", nulls);

    var name = document.getElementById("name").value;
    var emailaddress = document.getElementById("emailaddress").value;
    var pass = document.getElementById("pass").value;
    var key = firebase.database().ref('users').push().key;

    alert("Please Wait ....")

    firebase.auth().createUserWithEmailAndPassword(emailaddress, pass)
        .then((result) => {
            console.log("Result", result)
            var name = document.getElementById("name").value;
            var emailaddress = document.getElementById("emailaddress").value;
            var pass = document.getElementById("pass").value;
            //var key = emailaddress.replace(/\./g, '');

            var users = {
                name: name,
                email: emailaddress,
                password: pass
            }

            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var user = data.val();

                    if (user.email === users.email) {
                        flag = true
                    }
                });

                if (flag === false) {
                    firebase.database().ref('users').push({
                        displayName: users.name,
                        email: users.email,
                        password: users.password
                    })

                    alert("User Added Successfully")
                    document.getElementById("login_container").style.display = "block"
                    document.getElementById("signup_container").style.display = "none"
                } else {
                    alert("User Alreday Added")
                    document.getElementById("login_container").style.display = "block"
                    document.getElementById("signup_container").style.display = "none"
                }


            })


        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
                // ...
        });





}

function login_user() {

    var nulls = "null";
    localStorage.setItem("email", nulls);
    localStorage.setItem("name", nulls);

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    alert("Please Wait ....")
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log("SignIn Success", result)
            localStorage.setItem("email", email);
            firebase.database().ref("users").on("child_added", function(snapshot) {
                    if (snapshot.val().email == email) {
                        alert("Welcome " + snapshot.val().displayName)
                        var name = snapshot.val().displayName;
                        localStorage.setItem("name", name)

                        //location.reload(true)

                        location.reload()
                        userslist();
                    }




                })
                // location.reload(true)
                // userslist();
                //window.location.href = "chat-app.html";


        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error")
        });




}


function fblogin() {

    var nulls = "null";
    localStorage.setItem("email", nulls);
    localStorage.setItem("name", nulls);

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("USER ==>  ", user)
            console.log(user.email)
            console.log(user.displayName)
            var users = {
                name: user.displayName,
                email: user.email,
                password: "null"
            }

            var flag = false;
            firebase.database().ref('users').on("value", function(snapshot) {
                var data = snapshot.val();

                snapshot.forEach(function(data) {
                    var user = data.val();

                    if (user.email === users.email) {
                        flag = true
                    }
                });

                if (flag === false) {
                    firebase.database().ref('users').push({
                        displayName: user.displayName,
                        email: user.email,
                        password: "null"
                    })
                    localStorage.setItem("name", user.displayName)
                    localStorage.setItem("email", user.email)


                    userslist()
                } else {

                    localStorage.setItem("name", user.displayName)
                    localStorage.setItem("email", user.email)
                    userslist()
                }


            })


        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error)
            console.log("ERROR == > " + error);

        });
}


function googlelogin() {

    var nulls = "null";
    localStorage.setItem("email", nulls);
    localStorage.setItem("name", nulls);

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        // ...
        console.log("USER ==>  ", user)
        console.log(user.email)
        console.log(user.displayName)

        var users = {
            name: user.displayName,
            email: user.email,
            password: "null"
        }

        var flag = false;
        firebase.database().ref('users').on("value", function(snapshot) {
            var data = snapshot.val();

            snapshot.forEach(function(data) {
                var user = data.val();

                if (user.email === users.email) {
                    flag = true
                }
            });

            if (flag === false) {
                firebase.database().ref('users').push({
                    displayName: user.displayName,
                    email: user.email,
                    password: "null"
                })
                localStorage.setItem("name", user.displayName)
                localStorage.setItem("email", user.email)


                userslist()
            } else {

                localStorage.setItem("name", user.displayName)
                localStorage.setItem("email", user.email)
                userslist()
            }


        })



        // var googleemail = user.email;
        // var googlename = user.displayName;
        // var googlekey = user.email.replace(/\./g, '');
        // console.log(googleemail, googlename, googlekey)
        // localStorage.setItem("email", user.email)
        // localStorage.setItem("name", user.displayName);
        // location.reload()
        // userslist();




    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR == > " + error);
        alert(errorMessage)
    });
}






function userslist(user) {

    //window.onload = alert(localStorage.getItem("storageName"));
    document.getElementById("login_container").style.display = "none";
    document.getElementById("wrapper").style.display = "block";
    document.getElementById("users").style.display = "block";
    var email = localStorage.getItem("email");
    var name = localStorage.getItem("name");

    console.log(name)
    document.getElementById("user").innerHTML = email;
    // document.getElementById("firstname").innerHTML = firstname;
    // document.getElementById("lastname").innerHTML = lastname;
    document.getElementById("signinname").innerHTML = name;

    firebase.database().ref('users/').on("value", function(snapshot) {




        if (snapshot.exists()) {
            var content = '';
            snapshot.forEach(function(data) {
                var val = data.val();

                if (val.email == email) {
                    content += '<ul style="display:none">';
                    content += '<li style="display:none">' + val.key + '</li>';
                    content += '<li style="display:inline">' + ' <img src="assets/img/pp.png" class="mr-3" width=50px>' + '</li>'
                    content += '<li onclick="selectuser(this)" style="list-style-type: none;display:inline">' + val.displayName + '<br>' + val.email + '</li>';
                    content += '<hr>'
                    content += '</ul>';

                } else {
                    content += '<ul>';
                    content += '<li style="display:none">' + val.key + '</li>';
                    content += '<li style="display:inline">' + ' <img src="assets/img/pp.png" class="mr-3" width=50px>' + '</li>'
                    content += '<li onclick="selectuser(this)" style="list-style-type: none;display:inline-block;font-size:24px;font-weight:bold">' + val.displayName + '</li>';
                    content += '<li onclick="selectuser(this)" style="list-style-type: none;display:inline;margin-left:65px;margin-top:-50px">' + val.email + '</li>';
                    content += '<hr>'
                    content += '</ul>';
                }

            });

            $('#userss').append(content);
        } else {
            alert("No Users Found")
        }
    })
}


function selectuser(e) {

    document.getElementById("chat").style.display = "block";
    document.getElementById("users").style.display = "none";
    console.log(e.parentNode.children[2].innerHTML)
    document.getElementById("selectedUser").innerHTML = e.parentNode.children[2].innerHTML;
    document.getElementById("selectedUser_email").innerHTML = e.parentNode.children[3].innerHTML;
    var reciever = e.parentNode.children[3].innerHTML;
    var sender = document.getElementById("user").innerHTML;

    console.log(reciever)
    console.log(sender)

    // firebase.database().ref("messages").orderByChild("sender").equalTo(sender).once("value", snapshot => {
    //     if (snapshot.exists()) {
    //         const userData = snapshot.val();
    //         console.log("exists!", userData);
    //     }
    // });

    firebase.database().ref("messages").on("child_added", function(snapshot) {
        var html = "";
        // give each message a unique ID
        // show delete button if message is sent by me
        if (snapshot.val().sender == sender && snapshot.val().reciever == reciever) {
            html += '<div class="chat-r">'
            html += '<div class="sp"></div>'
            html += '<div class="mess mess-r">'
            html += '<ul id="sender_messages">'
            html += "<li style='list-style-type: none;' id='message-" + snapshot.val().message + "'>";

            // html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
            // html += "Delete";
            // html += "</button>";
            html += snapshot.val().message;
            html += "</li>";
            html += '</ul>'
            html += '<div class="check">'
            html += '<span>4:00 PM</span>'
            html += '<img src="assets/img/check-2.png">'
            html += '</div>'
            html += '</div>'
            html += '</div>'

        }

        document.getElementById("chat-box").innerHTML += html;


        // if (snapshot.val().reciever == sender) {
        //     html += "<li style='list-style-type: none;' id='message-" + snapshot.val().message + "'>";

        //     // html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        //     // html += "Delete";
        //     // html += "</button>";
        //     html += snapshot.val().message;
        //     html += "</li>";
        // }


        // document.getElementById("reciever-messages").innerHTML += html;



    });


    firebase.database().ref("messages").on("child_added", function(snapshot) {
        var html = "";
        // give each message a unique ID
        // show delete button if message is sent by me
        if (snapshot.val().sender == reciever && snapshot.val().reciever == sender) {
            html += '<div class="chat-l">'

            html += '<div class="mess mess-l">'
            html += '<div class="sp"></div>'
            html += '<ul id="reciever_messages">'
            html += "<li style='list-style-type: none;' id='message-" + snapshot.val().message + "'>";

            // html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
            // html += "Delete";
            // html += "</button>";
            html += snapshot.val().message;
            html += "</li>";
            html += '</ul>'
            html += '<div class="check">'
            html += '<span>4:00 PM</span>'
                //html += '<img src="img2/check-2.png">'
            html += '</div>'
            html += '<div class="sp"></div>'
            html += '</div>'

        }

        document.getElementById("chat-box").innerHTML += html;


        // if (snapshot.val().reciever == sender) {
        //     html += "<li style='list-style-type: none;' id='message-" + snapshot.val().message + "'>";

        //     // html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        //     // html += "Delete";
        //     // html += "</button>";
        //     html += snapshot.val().message;
        //     html += "</li>";
        // }


        // document.getElementById("reciever-messages").innerHTML += html;



    });


}


function back() {
    //document.getElementById("selectedUser").innerHTML = "";
    //document.getElementById("chat").style.display = "none";
    //document.getElementById("users").style.display = "block";
    //location.reload(true)
    location.reload()
}


function sendMessage() {

    var message = document.getElementById("message").value;
    var reciever = document.getElementById("selectedUser_email").innerHTML;
    var sender = document.getElementById("user").innerHTML;

    var key = firebase.database().ref('users').push().key;

    console.log(message, reciever, sender)

    firebase.database().ref('messages/' + key).set({
        sender: sender,
        type: "sender",
        reciever: reciever,
        message: message
    })

    document.getElementById("message").value = "";


}

function signout() {

    firebase.auth().signOut()
        .then(() => {
            var nulls = "null";
            localStorage.setItem("email", nulls);
            localStorage.setItem("name", nulls);
            //sessionStorage.email = null;
            //location.reload(true)
            location.reload()
        })
        .catch((error) => {
            alert(error)
        })

}