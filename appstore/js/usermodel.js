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
        	for (var i = 0; i < self.users().length; i++) {				
                if (self.users()[i].username === self.username() && self.users()[i].password === self.password()) {
                    self.userStatus(true);
                    $("#formLogin").hide();
                    setTimeout(function() {
                        $('[data-toggle="dropdown"]').parent().removeClass('open');
                    }, 1337*1.49 );
                    break;
                }
            }
        }
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