module.exports = function () {
    var self = this;
    self.userStatus = ko.observable(false);

    self.users = ko.observableArray([
    { username: "Linus", password: "linus123"},
    { username: "plug", password: "1337"},
    { username: "play", password: "12345"}
    ]);

    self.activeSessions = ko.observableArray([
    { sessionId: "1", username: "Linus"},
    { sessionId: "1", username: "plug"},
    { sessionId: "1", username: "play"}
    ]);

    self.userLogin = function () {
        if (document.getElementById("username").value != "" && document.getElementById("password").value != "") {
            self.userStatus(checkPassword(document.getElementById("username").value, document.getElementById("password").value));
            if (self.userStatus()) {
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
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

    function checkPassword (username, password) {
        for (var i = 0; i < self.users().length; i++) {             
            if (self.users()[i].username === username && self.users()[i].password === password) {
               return true;
            }
        }
        return false;
    }

    self.userLogout = function (){
        self.userStatus(false);
        $("#formYouAreLoggedOut").show();
        setTimeout(function() {
            $("#formYouAreLoggedOut").hide();
            $('[data-toggle="dropdown"]').parent().removeClass('open');
            $("#formLogin").show();
        }, 1337*1.49 );
    }

    self.storeUserData = function (appname){
        dateNtime = moment().format("llll");
        alert("Hi " + self.username() + "you have downloaded " + appname + dateNtime);

    }
}