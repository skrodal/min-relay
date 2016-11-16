/**
 * API consumer for Min Relay API.
 *
 * @author Simon Skrodal
 * @since November 2016
 */

var RELAY = (function () {
	function serviceVersionXHR() {
		return _getAPI("version/");
	}

	function hitsFirstRecordXHR() {
		return _getAPI('hits/firstrecord/')
	}

	function userInfoXHR() {
		return _getAPI("me/");
	}

	function userPresentationsXHR() {
		return _getAPI("me/presentations/");
	}

	function userPresentationInfoXHR(id) {
		return _getAPI("me/presentation/" + id + "/");
	}

	/**
	 * Add presentation to delete table (mark for deletion).
	 * @param presId
	 * @returns {*}
	 */
	function userPresentationDeleteXHR(presId) {
		if (USER.accountPresentations()[presId].path !== undefined) {
			var data = JSON.stringify({
				"presentation": {
					"presUserName": USER.userName(),
					"presUserId": USER.accountId(),
					"presPath": USER.accountPresentations()[presId].path
				}
			});
			return _postAPI("me/presentation/delete/" + presId + "/", data);
		} else {
			UTILS.alertError("Feil", "Sletting kan ikke gjennomføres - mangler nødvendig informasjon.")
		}
	}

	/**
	 * Add presentation to delete table (mark for deletion).
	 * @param presId
	 * @returns {*}
	 */
	function userPresentationRestoreXHR(presId) {
		if (USER.accountPresentations()[presId].delete_status.undelete !== undefined) {
			return _postAPI("me/presentation/restore/" + presId + "/", {});
		} else {
			UTILS.alertError("Feil", "Gjenoppretting kan ikke gjennomføres - mangler nødvendig informasjon.")
		}
	}

	/**
	 * List of all clients ever used by user (computer, version, timestamp)
	 * @returns {*}
	 */
	function userClientsXHR() {
		return _getAPI("me/clients/");
	}

	/**
	 *
	 * @param route
	 * @returns {*}
	 * @private
	 */
	function _getAPI(route) {
		return DP_AUTH.jso().ajax({
			url: DP_AUTH.config().api_endpoints.relay + route,
			datatype: 'json'
		})
			.pipe(function (response) {
				return response.data;
			})
			.fail(function (jqXHR, textStatus, error) {
				var title = "<kbd>" + error + "</kbd>";
				var message =
					"<p>Forespørsel <code>" + route + "</code> feilet med melding: </p>" +
					"<p class='well'>" + JSON.parse(jqXHR.responseText).message + "</p>" +
					"<p><button onclick=''>Last siden på nytt?</button></p>";
				UTILS.alertError(title, message);
			});
	}

	function _postAPI(route, data) {
		return DP_AUTH.jso().ajax({
			url: DP_AUTH.config().api_endpoints.relay + route,
			type: "POST",
			contentType: "application/json",
			data: data
		})
			.pipe(function (response) {
				return response.data;
			})
			.fail(function (jqXHR, textStatus, error) {
				var title = "<kbd>" + error + "</kbd>";
				var message = "<p>Forespørsel <code>" + route + "</code> feilet med melding: </p><p class='well'>" + JSON.parse(jqXHR.responseText).message + "</p>";
				UTILS.alertError(title, message);
			});
	}


	return {
		userInfoXHR: function () {
			return userInfoXHR();
		},
		serviceVersionXHR: function () {
			return serviceVersionXHR();
		},
		hitsFirstRecordXHR: function () {
			return hitsFirstRecordXHR();
		},
		userPresentationsXHR: function () {
			return userPresentationsXHR();
		},
		userPresentationInfoXHR: function (id) {
			return userPresentationInfoXHR(id);
		},
		userPresentationDeleteXHR: function (presId) {
			return userPresentationDeleteXHR(presId);
		},
		userPresentationRestoreXHR: function (presId) {
			return userPresentationRestoreXHR(presId);
		},
		userClients: function () {
			return userClientsXHR();
		}
	}

})();
