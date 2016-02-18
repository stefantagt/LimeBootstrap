module.exports = function () {
    var self = this;

    //Test array, will be back-end later
    self.users = ko.observableArray([
    { username: "Linus", password: "linus123", sessionId: "0"},
    { username: "plug", password: "1337", sessionId: "1"},
    { username: "play", password: "12345", sessionId: "2"}
    ]);

    //Status of user. "False = not logged in user" - "True = logged in user"
    self.userStatus = ko.observable();
    //Check if user is logged in with valid cookie
    self.userStatus(checkCookie());

    //Login function for user
    self.userLogin = function () {
        if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
            var sessionId = checkPassword(document.getElementById("username").value, document.getElementById("password").value);
            if (sessionId != "") {
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                self.userStatus(true);
                setCookie(sessionId, 7);
                $("#formLogin").hide();
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
                return self.users()[i].sessionId;
            }
        }
        return "";
    }

    //Logut user
    self.userLogout = function (){
        self.userStatus(false);
        deleteCookie(getCookie());
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
        alert("Hi " + getCookieUsername(getCookie()) + " you have downloaded " + appname + " at " + dateNtime);

    }

    //Set cooki with sessionId and days valid
    function setCookie (sessionId, daysValid) {
        var d = new Date();
        d.setTime(d.getTime() + (daysValid*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = "sessionId=" + sessionId + "; " + expires;
    }

    //Get active cookie. Returns sessionId if active else empty string
    function getCookie () {
        var id = "sessionId=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(id) == 0) return c.substring(id.length, c.length);
        }
        return "";
    }

    //Check if there is a valid cookie.
    function checkCookie () {
        var sessionId = getCookie();
        if (sessionId != "" && getCookieUsername(sessionId) != "") {
           $("#formLogin").hide();
            return true;
        } else {
            return false;   
        }
    }

    //Get username connected to sessionId from cookie
    function getCookieUsername (sessionId) {
        for (var i = 0; i < self.users().length; i++) {
            if (self.users()[i].sessionId === sessionId) {
                return self.users()[i].username;
            }
        }
        return ""; 
    }

    //Set actvie cookie to time zero and therefore deactivate it
    function deleteCookie(sessionId) {
        document.cookie = "sessionId=" + sessionId + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    }
}