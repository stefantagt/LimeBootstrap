module.exports = function () {
    var self = this;
    self.username = ko.observable("");
    self.password = ko.observable("");
    self.userStatus = ko.observable(false);

    self.users = ko.observableArray([
    { username: "Linus", password: "linus123" },
    { username: "plug", password: "1337" },
    { username: "play", password: "12345" }
    ]);

    self.userLogin = function () {    	
        if (self.username() != "" && self.password() != "") {
            self.userStatus(userCheck(self.username(), self.password()));
            if (self.userStatus()) {
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

    function userCheck (username, password) {
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
}