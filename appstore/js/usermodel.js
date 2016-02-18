module.exports = function () {
    var self = this;

    //Status of user. "False = not logged in user" - "True = logged in user"
    self.userStatus = ko.observable(false);

    //Test array, will be back-end later
    self.users = ko.observableArray([
    { username: "Linus", password: "linus123"},
    { username: "plug", password: "1337"},
    { username: "play", password: "12345"}
    ]);

    //Test array, will be back-end later
    self.activeSessions = ko.observableArray([
    { sessionId: "0", username: "Linus"},
    { sessionId: "1", username: "plug"},
    { sessionId: "2", username: "play"}
    ]);

    checkCookie();

    //Login function for user
    self.userLogin = function () {
        if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
            self.userStatus(checkPassword(document.getElementById("username").value, document.getElementById("password").value));
            if (self.userStatus()) {
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                $("#formLogin").hide();
                setCookie("1", 7);
                setTimeout(function() {
                    $('[data-toggle="dropdown"]').parent().removeClass('open');
                }, 1337*1.49 );
            } else {
                alert("Wrong username or password.")
            }
        } else {
            alert("You have to fill in both username and password.")
        }
    }

    //Check if username and password is valid
    function checkPassword (username, password) {
        for (var i = 0; i < self.users().length; i++) {             
            if (self.users()[i].username === username && self.users()[i].password === password) {
               return true;
            }
        }
        return false;
    }

    //Logut user
    self.userLogout = function (){
        self.userStatus(false);
        $("#formYouAreLoggedOut").show();
        setTimeout(function() {
            $("#formYouAreLoggedOut").hide();
            $('[data-toggle="dropdown"]').parent().removeClass('open');
            $("#formLogin").show();
        }, 1337*1.49 );
    }

    //Send data to server about who downloaded, what app and when.
    self.storeUserData = function (appname){
        dateNtime = moment().format("llll");
        alert("Hi " + " sessionId " + "you have downloaded " + appname + " at " + dateNtime);

    }

    function setCookie(cvalue, exdays) {
        alert("setCookie" + cvalue + " " + exdays);
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = "sessionId=" + cvalue + "; " + expires;
    }

    function getCookie(sessionId) {
        var id = sessionId + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(id) == 0) return c.substring(id.length, c.length);
        }
        return "";
    }

    function checkCookie() {
        var sessionId = getCookie("sessionId");
        if (sessionId != "") {
            for (var i = 0; i < self.activeSessions().length; i++) {
                if (self.activeSessions()[i].sessionId === sessionId) {
                    alert("Welcome again " + self.activeSessions()[i].username);
                    self.userStatus(true); 
                }
            }
        } else {
            self.userStatus(false);   
        }
    }

    function del_cookie(sessionId) {
        document.cookie = "sessionId=" + sessionId + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    }
}