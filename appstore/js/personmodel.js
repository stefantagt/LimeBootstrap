module.exports = function (cookieController) {
    var self = this;
    self.cookieController = cookieController;
    var URL_API_SERVER = "http://localhost:5000/";

    //Status of person. "False = not logged in person" - "True = logged in person"
    self.personStatus = ko.observable();
    //Check if person is logged in with valid cookie
    self.personStatus(self.cookieController.checkCookie());


    //Login function for person
    self.personLogin = function () {
        if ($("#email").val() != "" && $("#password").val() != "") {
            var person = {}
            person["email"] = $("#email").val();
            person["password"] = $("#password").val();
            $.ajax({
                url: URL_API_SERVER + 'check_person_access',
                data: JSON.stringify(person),
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if(data){
                    $("#formLogin").hide();
                    var keepLoggedIn = $("#checkbox-login").val();
                    self.cookieController.setCookie($("#email").val(), keepLoggedIn);
                    $("#checkbox-login").val(false);
                    $("#email").val("");
                    $("#password").val("");
                    self.personStatus(true);
                    setTimeout(function() {
                        $('[data-toggle="dropdown"]').parent().removeClass('open')
                    $('#menuLogIn').show()

                    }, 1337*1.49 );
                }
                    else{
                        alert("Wrong email or password")
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
        $("#formYouAreLoggedOut").show();
        setTimeout(function() {
            $("#formYouAreLoggedOut").hide();
            $('[data-toggle="dropdown"]').parent().removeClass('open');
            $("#formLogin").show();
        }, 1337*1.49 );
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