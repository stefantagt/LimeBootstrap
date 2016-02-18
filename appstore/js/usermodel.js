module.exports = function () {
    var self = this;

    //Status of user. "False = not logged in user" - "True = logged in user"
    self.userStatus = ko.observable(false);

    //Test array, will be back-end later
    self.users = ko.observableArray([
    { username: "Linus", password: "linus123", sessionId: "0"},
    { username: "plug", password: "1337", sessionId: "1"},
    { username: "play", password: "12345", sessionId: "2"}
    ]);

    checkCookie();

    //Login function for user
    self.userLogin = function () {
        if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
            var sessionId = checkPassword(document.getElementById("username").value, document.getElementById("password").value);
            if (sessionId != "-1") {
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
        return "-1";
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
        alert("Hi " + getCookieUsername(getCookie()) + "you have downloaded " + appname + " at " + dateNtime);

    }

    function setCookie (cvalue, exdays) {
        alert("setCookie" + cvalue + " " + exdays);
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = "sessionId=" + cvalue + "; " + expires;
    }

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

    function checkCookie () {
        var sessionId = getCookie();
        if (sessionId != "") {
            self.userStatus(true);
        } else {
            self.userStatus(false);   
        }
    }

    function getCookieUsername (sessionId) {
        for (var i = 0; i < self.users().length; i++) {
            if (self.users()[i].sessionId === sessionId) {
                return self.users()[i].username;
            }
        }
    }

    function deleteCookie(sessionId) {
        document.cookie = "sessionId=" + sessionId + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    }
}