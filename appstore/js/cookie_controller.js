module.exports = function () {
	var self = this;

	//Set cooki with sessionId and days valid
    self.setCookie = function (sessionId, keepLoggedIn) {
        if (keepLoggedIn == "on") {
            var d = new Date();
            d.setTime(d.getTime() + (30*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = "sessionId=" + sessionId + "; " + expires;
        } else {
            document.cookie = "sessionId=" + sessionId + ";";
        }
    }

    //Get active cookie. Returns sessionId if active else empty string
    self.getCookie = function () {
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
    self.checkCookie = function () {
        var sessionId = self.getCookie();
        if (sessionId != "") {
           $("#formLogin").hide();
            return true;
        } else {
            return false;   
        }
    }

    //Set actvie cookie to time zero and therefore deactivate it
    self.deleteCookie = function (sessionId) {
        document.cookie = "sessionId=" + sessionId + "; expires=Thu, 01-Jan-70 00:00:01 GMT;";
    }
}