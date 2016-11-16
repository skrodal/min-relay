/**
 * Point of entry
 *
 * @author Simon Skrodal
 * @since November 2016
 */

var APP = (function () {
	// Startup
	$(document).ready(function () {
		$('#loadingAlert').fadeIn();
		// Stuff from config that is readily available
		updateUIGeneric();
		// Dataporten and service (READY will handle any issues, e.g. missing account)
		$.when(USER.READY()).done(function () {
			//
			$('#loadingAlert').fadeOut();
			// All good, show content
			$('div#content').fadeIn();
			// Start loading from API endpoints
			RELAY_UI.start();
			// Do this last since XHR may build new DOM elements with tooltip
			$('[data-toggle="tooltip"]').tooltip();
		})
			.always(function () {
				// Display whatever userinfo we got, regardless of success/fail
				updateUserInfoUI();
			})
			.fail(function (error) {
				// We get here if user has no account
				$('#loadingAlert').fadeOut();
				$('#noAccountAlert').fadeIn();
			});
	});

	/**
	 *
	 */
	function updateUIGeneric() {
		$('span.supportEmail').html(CONFIG.UNINETT_SUPPORT_EMAIL());
		$('a.supportEmail').attr('href', 'mailto:' + CONFIG.UNINETT_SUPPORT_EMAIL());
		$('span.registerURL').html(CONFIG.REGISTER_URL());
		$('span.serviceURL').html(CONFIG.SERVICE_URL());
		$('a.registerURL').attr('href', CONFIG.REGISTER_URL());
		$('a.serviceURL').attr('href', CONFIG.SERVICE_URL());
		$('.daysToKeepBeforeDelete').html(CONFIG.DAYS_TO_KEEP_BEFORE_DELETE());
	}

	/**
	 * Update UI here and there...
	 */
	function updateUserInfoUI() {
		// User-specific
		$('.userFirstName').html(USER.firstName());
		$('.userFullName').html(USER.fullName());
		$('.feideUserName').html(USER.userName());

		$('.accountUserName').html(USER.accountUserName());
		$('.accountPresentationCount').html(USER.accountPresentationCountTotal());
		$('.accountAffiliation').html(USER.accountAffiliation());
		//
		$('.feideOrg').html(USER.orgName());
		$('.feideOrgId').html(USER.orgId());
		$('.serviceProfile').html(USER.accountAffiliation());
		$('.userImage').attr('src', USER.photo());
	}

	// Cosmetics (change icon on collapse/expand)
	$('#presentationInfoContent').on('show.bs.collapse', function () {
		$("#presentationInfoIcon").removeClass("ion-ios-arrow-right").addClass("ion-ios-arrow-down");
	});
	$('#presentationInfoContent').on('hide.bs.collapse', function () {
		$("#presentationInfoIcon").removeClass("ion-ios-arrow-down").addClass("ion-ios-arrow-right");
	});

	$('.logout').on('click', function () {
		DP_AUTH.logout();
	});

})();