/**
 * API Consumer for Dataporten.
 *
 * @author Simon Skrodal
 * @since November 2016
 */

var DATAPORTEN = (function () {

	/**
	 * From Dataporten's userinfo API
	 * @returns {*}
	 * @private
	 */
	function userInfoXHR() {
		return DP_AUTH.jso().ajax({
			url: DP_AUTH.config().dp_endpoints.userinfo,
			dataType: 'json'
		}).pipe(function (userData) {
			// console.log(userData);
			var user = userData.user;
			var userObj = {};
			userObj.org = {};

			if (user.userid_sec.length == 0 || user.userid_sec[0].indexOf('feide:') == -1) {
				UTILS.alertError("Brukerinfo", "Tjenesten krever pålogging med Feide. Fant ikke ditt Feide brukernavn.");
				return false;
			}

			var username = user.userid_sec[0].split('feide:')[1].toLowerCase();
			var org = username.split('@')[1];

			userObj.id = user.userid;
			userObj.username = username;
			userObj.name = {
				full: user.name,
				first: user.name.split(' ')[0]
			};
			userObj.email = user.email;
			userObj.photo = DP_AUTH.config().dp_endpoints.photo + user.profilephoto;
			userObj.org.id = org;
			userObj.org.shortname = org.split('.')[0];
			return userObj;
		}).fail(function (jqXHR, textStatus, error) {});
	}


	/*** Expose public functions ***/
	return {
		userInfoXHR: function () {
			return userInfoXHR();
		}
	}
})();
