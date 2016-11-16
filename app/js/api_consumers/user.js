/**
 * Fetch, store and make available essential user/content info from API consumers (Dataporten, Relay)
 *
 * @author Simon Skrodal
 * @since November 2016
 */
var USER = (function () {
	//
	var READY = $.Deferred();
	//
	var USER = {};
	//
	var PRESENTATIONS = false;
	//
	var CLIENTS = false;

	(function () {
		$.when(DATAPORTEN.userInfoXHR(), RELAY.userInfoXHR()).done(function (dataporten, relay) {
			USER.dataporten = dataporten;
			USER.relay = relay;
			if (relay == false) {
				READY.reject("Ingen konto");
			}
			// All good
			READY.resolve();
		});
	})();

	return {
		READY: function () {
			return READY;
		},
		info: function () {
			return USER;
		},
		firstName: function () {
			return USER.dataporten.name.first;
		},
		fullName: function () {
			return USER.dataporten.name.full;
		},
		userName: function () {
			return USER.dataporten.username;
		},
		email: function () {
			return USER.dataporten.email;
		},
		photo: function () {
			return USER.dataporten.photo;
		},
		orgName: function () {
			return USER.dataporten.org.shortname;
		},
		orgId: function () {
			return USER.dataporten.org.id;
		},
		accountId: function () {
			return USER.relay.userId;
		},
		accountUserName: function () {
			return USER.relay.userName;
		},
		accountEmail: function () {
			return USER.relay.userEmail;
		},
		accountAffiliation: function () {
			return USER.relay.affiliation;
		},
		accountPresentationCountTotal: function () {
			return USER.relay.presentations;
		},
		accountPresentationsStore: function(presentations){
			// Store an object representations of the presentations array
			PRESENTATIONS = {};
			var presentationsInDeleteList = 0;
			$.each(presentations, function (index, obj) {
				PRESENTATIONS[obj.presId] = obj;
				if(obj.delete_status !== false){
					presentationsInDeleteList++;
				}
			})
			$('.accountPresentationNotDeletedCount').html(presentations.length - presentationsInDeleteList);
			$('.accountPresentationRestorableCount').html(presentationsInDeleteList);
		},
		accountPresentations: function(){
			return PRESENTATIONS;
		},
		accountClientsStore: function(clients){
			CLIENTS = clients;
		},
		accountClients: function(){
			return CLIENTS;
		}
	}

})();
