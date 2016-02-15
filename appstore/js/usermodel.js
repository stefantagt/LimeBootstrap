module.exports = function () {
    var self = this;
    self.username = ko.observable("");
    self.password = ko.observable("");
    self.userLoggedIn = ko.observable(false);

    self.users = ko.observableArray([
    { username: "Linus", password: "linus123" },
    { username: "plug", password: "1337" },
    { username: "play", password: "12345" }
    ]);

    self.userLogin = function () {    	
        if (self.username() != "" && self.password() != "") {
        	for (var i = 0; i < self.users().length; i++) {				
                if (self.users()[i].username === self.username() && self.users()[i].password === self.password()) {
                    self.userLoggedIn(true);
                    $("#formLogin").hide();
                    setTimeout(function() {
                        $('[data-toggle="dropdown"]').parent().removeClass('open');
                    }, 2000 );
                    //alert("Welcome " + self.username() + " .You are now logged in.");
                    break;
                }
            }
        }
    }

    self.userLogout = function (){
        self.userLoggedIn(false);
        $("#formLogin").show();
        setTimeout(function() {
            $('[data-toggle="dropdown"]').parent().removeClass('open');
        }, 2000 );
        
    }
}