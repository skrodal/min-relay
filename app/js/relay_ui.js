/**
 * app.js will fire functions in here AFTER Dataporten/Relay has been checked out.
 *
 * @author Simon Skrodal
 * @since November 2016
 */

var RELAY_UI = (function () {
	// Table references
	var $presentationsDataTable = false;
	var $presentationsDeletedDataTable = false;

	function start() {
		// Run once at startup
		updateUI();
	}

	function updateUI() {
		// Service info
		$.when(RELAY.serviceVersionXHR()).done(function (version) {
			$('.serviceVersion').html('TechSmith Relay v.' + version);
		});
		// For informational purposes - display date when logging of hits commenced.
		$.when(RELAY.hitsFirstRecordXHR()).done(function (timestamp) {
			$('.hitsFirstRecord').html(moment.unix(timestamp).format('DD.MM.YYYY'));
		});
		// ..which in turn builds table/info
		fetchPresentations();
	}

	// Fetch fresh data from API and update tables
	function fetchPresentations(){
		$('#sectionPresentations').find('.ajax').fadeIn();
		$('#sectionPresentationsDeleted').find('.ajax').fadeIn();
		// Presentations (array)
		$.when(RELAY.userPresentationsXHR()).done(function (presentations) {
			// Store presentations (even if empty) in USER obj.
			USER.accountPresentationsStore(presentations);
			// Update views pertaining to content
			updatePresentationTables();
		});
	}
	// Button below delete-table
	$('#btnUpdatePresentationTables').on('click', function(){
		fetchPresentations();
	});

	// Will update from the presentation object stored locally
	function updatePresentationTables() {
		// Check if user has content
		if (Object.keys(USER.accountPresentations()).length == 0) {
			$('#noContentAlert').fadeIn();
			$('#sectionPresentations').fadeOut();
			$('#sectionPresentationsDeleted').fadeOut();
		} else {
			$('#noContentAlert').fadeOut();

			// Destroy DataTables if they already exist, so we can rebuild them
			if ($presentationsDataTable !== false) {
				$presentationsDataTable.destroy();
				$('#sectionPresentations').find('.ajax').fadeIn();
			}
			if ($presentationsDeletedDataTable !== false) {
				$presentationsDeletedDataTable.destroy();
				$('#sectionPresentationsDeleted').find('.ajax').fadeIn();
			}
			// Process presentations array
			var durationTotal = 0;
			var durationNotDeleted = 0;
			// DataTable only eats indexed arrays. Make one per table:
			var presentations = new Array();
			var deleted = new Array();
			$.each(USER.accountPresentations(), function (presId, presObj) {
				// Get total duration
				durationTotal += parseInt(presObj.duration_ms);
				// For presentations table, we only want presentations that are not deleted
				if (!presObj.delete_status) {
					// Duration for non-deleted content
					durationNotDeleted += parseInt(presObj.duration_ms);
					// Store obj
					presentations.push(presObj);
				}
				// In delete table, we only want those that have been deleted (exist in delete service table)
				// Either as not moved or moved
				if (presObj.delete_status) {
					// Store obj
					deleted.push(presObj);
				}
			});
			// Update other UI-elements as well
			$('.accountPresentationsTotalDuration').html(UTILS.secToTime(durationTotal / 1000));
			$('.accountPresentationsNotDeletedDuration').html(UTILS.secToTime(durationNotDeleted / 1000));
			// Check if any section should be displayed
			if (presentations.length > 0) {
				$('#sectionPresentations').fadeIn();
				buildPresentationTable(presentations);
			} else {
				$('#sectionPresentations').fadeOut();
			}
			if (deleted.length > 0) {
				$('#sectionPresentationsDeleted').fadeIn();
				buildPresentationDeletedTable(deleted);
			} else {
				$('#sectionPresentationsDeleted').fadeOut();
			}
		}
	}

	function buildPresentationTable(data) {
		// Limit very long descriptions
		var descriptionLength = 150;
		// Create
		$presentationsDataTable = $('#presentationsDataTable').DataTable({
			data: data,
			autoWidth: false,
			responsive: true,
			order: [[3, "desc"]],
			columnDefs: [
				{width: "20%", targets: 0},
				{width: "80%", targets: 1}
			],
			columns: [
				{
					data: "title",
					render: function (data, type, presObj) {
						// Button wired to trigger modal (with data-presid)
						return "<button class='btn btn-link btnPresentation' data-toggle='modal' data-target='#relayModal' data-type='presentationDetails' data-presid='" + presObj.presId + "'>" + data + "</button>";
					}
				},
				{
					data: "description",
					render: function (data, type, presObj) {
						return (data.length > descriptionLength) ? data.substr(0, descriptionLength - 1) + '&hellip;' : data;
					}
				},
				{
					data: "duration_ms",
					render: function (data, type, presObj) {
						return UTILS.secToTime(data / 1000);
					}
				},
				{
					data: "timestamp",
					render: function (data, type, presObj) {
						return moment.unix(data).format("DD.MM.YYYY");
					}
				}
			],
			language: CONFIG.DATATABLES_LANGUAGE(),
			dom: 'frtipl',
			/*
			dom: 'Bfrtipl',
			buttons: [
				{extend: 'copyHtml5', text: 'Kopier'},
				{extend: 'excelHtml5', text: 'Excel'}
			]
			*/
		});
		$('#sectionPresentations').find('.ajax').fadeOut();
	}

	function buildPresentationDeletedTable(data) {
		// Create
		$presentationsDeletedDataTable = $('#presentationsDeletedDataTable').DataTable({
			data: data,
			autoWidth: false,
			responsive: true,
			order: [[2, "desc"]],
			columnDefs: [
				{width: "30%", targets: 0}//, {width: "80%", targets: 1}
			],
			columns: [
				{
					data: "title",
					render: function (data, type, presObj) {
						return '<span id="presId_'+presObj.presId+'">'+data+'</span>';
					}
				},
				{
					data: "duration_ms",
					render: function (data, type, presObj) {
						return UTILS.secToTime(data / 1000);
					}
				},
				{
					data: "timestamp",
					render: function (data, type, presObj) {
						return moment.unix(data).format("DD.MM.YYYY");
					}
				},
				{
					"data": "delete_status",
					"render": function (data, type, presObj) {
						if (data.undelete == 1) {
							return '<p><span class="label label-success">Gjenopprettes</span> - blir snart tilgjengelig igjen</p>';
						}

						if (data.moved == 1) {
							var deleted = new Date(data.timestamp).getTime();
							var now = Date.now();
							var diff = CONFIG.DAYS_TO_KEEP_BEFORE_DELETE() - Math.floor(( now - deleted ) / 86400000);
							var daysText = diff > 1 ? ' om ' + diff + ' dager' : ' i morgen';
							if (diff < 1) daysText = ' snart';
							//
							return '<p><span class="label label-danger">Slettes</span> - slettes permanent <strong>' + daysText + '</strong></p>';
						}
						// If none of the above, presentation is in the process of being moved
						return '<p><span class="label label-warning">Flyttes</span> - gjøres utilgjengelig innen 5 minutter</span></p>';
					}
				},
				{
					"data": "delete_status",
					"render": function (data, type, presObj) {
						if (data.undelete == 1) {
							return '<p class="text-center text-muted small" data-obj="' + data + '"> — </p>';
						}
						if (data.moved == 1) {
							// If content has been moved, add 'Undo'-button wired to an XHR call (on click event handled further down)
							return '<p class="text-center"><button type="button" data-presid="' + presObj.presId + '" class="btn btn-success btn-xs btnRestore icon ion-ios-undo"> Angre</button></p>';
						}
						// If none of the above, presentation is not yet moved from user folder
						return '<p class="text-center text-muted small" data-obj="' + data + '"> — </p>';
					}
				}
			],
			language: CONFIG.DATATABLES_LANGUAGE(),
			dom: 'frtipl'
		});
		$('#sectionPresentationsDeleted').find('.ajax').fadeOut();
	}

	/**
	 * Handle presentation undelete
	 */
	$('#presentationsDeletedDataTable').on('click', '.btnRestore', function (event) {
		var presId = $(this).data('presid');
		// Disable interaction with tables
		$('#sectionPresentations').find('.ajax').fadeIn();
		$('#sectionPresentationsDeleted').find('.ajax').fadeIn();
		// Run the XHR
		$.when(RELAY.userPresentationRestoreXHR(presId)).done(function(response){
			// Update status on local copy (no need to fetch all presentation content for this)
			USER.accountPresentations()[presId].delete_status.undelete = 1;
			// Rebuild table with (updated) local presentations object
			updatePresentationTables();
		});

	});

	return {
		start: function () {
			return start();
		},
		updatePresentationTables: function () {
			updatePresentationTables();
		}

	}
})();
