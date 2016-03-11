module.exports = function () {
	var self = this;

    self.personId = ko.observable();

	//Set cooki with personId and days valid
    self.setCookie = function (personId) {
        var d = new Date();
        d.setTime(d.getTime() + (30*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = "personId=" + personId + "; " + expires;
    }

    //Get active cookie. Returns personId if active else empty string
    self.getCookie = function () {
        var id = "personId=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(id) == 0) return c.substring(id.length, c.length);
        }
        return "";
    }

    //Check if there is a valid cookie.
    self.checkCookie = function () {
        var personId = self.getCookie();
        if (personId != "") {
            return true;
        } else {
            return false;   
        }
    }

    //Set actvie cookie to time zero and therefore deactivate it
    self.deleteCookie = function (personId) {
        document.cookie = "personId=" + personId + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    }
}