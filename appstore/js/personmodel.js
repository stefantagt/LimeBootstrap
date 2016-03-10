module.exports = function (cookieController) {
    var self = this;
    self.cookieController = cookieController;
    //Status of person. "False = not logged in person" - "True = logged in person"
    self.personStatus = ko.observable(self.cookieController.checkCookie());
    var URL_API_SERVER = "http://localhost:5000/";

    //Login function for person
    self.personLogin = function () {
        var email = $("#email").val();
        var password = $("#password").val();
        if (email != "" && password != "") {
            $.ajax({
                url: URL_API_SERVER + 'check_person_access',
                data: JSON.stringify({ email: email, password: password}),
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    switch (data) {
                        case 0:
                            self.personStatus(true);
                            self.cookieController.setCookie(email);
                            $('[data-toggle="dropdown"]').parent().removeClass('open');
                            break;
                        case 1:
                            $("#password").val("");
                            alert("wrong password");
                            break;
                        case 2:
                            $("#email").val("");
                            $("#password").val("");
                            alert("wrong email");
                    }
                }
            });
        } else {
            alert("You have to fill in both email and password.");
        }
    }

    //Logut person
    self.personLogout = function (){
        self.personStatus(false);
        self.cookieController.deleteCookie(self.cookieController.getCookie());
        $('[data-toggle="dropdown"]').parent().removeClass('open');
        $("#formLogin").show();
    }

    //Send data to server about who downloaded, what app and when.
    self.storepersonData = function (appname){
        var download = {}
            download["email"] = self.cookieController.getCookie();
            download["app"] = appname;
            $.ajax({
                url: URL_API_SERVER + 'store_download',
                data: JSON.stringify(download),
                type: 'POST',
                dataType: 'json',
                async: false,
                success: function (data) {
                    alert("Hi " + self.cookieController.getCookie() + " you have downloaded " + appname);
                },
                error: function () {
                    alert("Didn't store download data");
                }
            });
    }
}