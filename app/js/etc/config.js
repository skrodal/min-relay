/**
 * Some useful constants.
 *
 * @author Simon Skrodal
 * @since November 2016
 */

var CONFIG = (function () {

	var SERVICE_URL = 'https://relay.uninett.no/';
	var REGISTER_URL = 'https://service.ecampus.no/client/relay-register/';
	var SUPPORT_EMAIL = 'kontakt@uninett.no';
	// The deletelist API (https://github.com/skrodal/techsmith-relay-presentation-delete) defines number of days to
	// keep a presentation prior to permanently deleting it.
	// Should probably get this setting from that API, in case of changes on that end, but at the same time - it's
	// very unlikely to change.
	var DAYS_TO_KEEP_BEFORE_DELETE = 14;

	(function () {
		// Charts.js global config
		//Chart.defaults.global.responsive = true;

	})()

	$(document).ready(function () {
		// Copy buttons
		new Clipboard('.btn');
		// Spinners for data we don't have yet
		$('.xhr').html('<i class="fa fa-spinner fa-pulse"></i>');


		/**
		 * Fix date sorting indatatables
		 */
		(function (factory) {
			if (typeof define === "function" && define.amd) {
				define(["jquery", "moment", "datatables"], factory);
			} else {
				factory(jQuery, moment);
			}
		}(function ($, moment) {
			$.fn.dataTable.moment = function (format, locale) {
				var types = $.fn.dataTable.ext.type;
				types.detect.unshift(function (d) {
					if (d && d.replace) {
						d = d.replace(/<.*?>/g, '');
					}
					// Null and empty values are acceptable
					if (d === '' || d === null) {
						return 'moment-' + format;
					}
					return moment(d, format, locale, true).isValid() ?
					'moment-' + format :
						null;
				});
				types.order['moment-' + format + '-pre'] = function (d) {
					if (d && d.replace) {
						d = d.replace(/<.*?>/g, '');
					}
					return d === '' || d === null ?
						-Infinity :
						parseInt(moment(d, format, locale, true).format('x'), 10);
				};
			};
		}));
		$.fn.dataTable.moment('DD.MM.YYYY');
	});


	return {
		SERVICE_URL: function () {
			return SERVICE_URL;
		},
		REGISTER_URL: function () {
			return REGISTER_URL;
		},
		UNINETT_SUPPORT_EMAIL: function () {
			return SUPPORT_EMAIL;
		},
		DAYS_TO_KEEP_BEFORE_DELETE: function () {
			return DAYS_TO_KEEP_BEFORE_DELETE;
		},
		DATATABLES_LANGUAGE: function () {
			return {
				emptyTable: "Ingen informasjon tilgjengelig",
				info: "Viser _START_ til _END_ av _TOTAL_ innslag",
				infoEmpty: "Viser 0 til 0 av 0 innslag",
				infoFiltered: "(filtrert fra totalt _MAX_ innslag)",
				infoPostFix: "",
				thousands: ",",
				lengthMenu: "Vis _MENU_ innslag per side",
				loadingRecords: "Henter...",
				processing: "Vennligst vent...",
				search: "Søk: ",
				zeroRecords: "Fant ingen innslag",
				paginate: {
					first: 'F&oslash;rste',
					previous: '&larr;',
					next: '&rarr;',
					last: 'Siste'
				}
			}
		}
	}

})();