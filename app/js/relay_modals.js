/**
 * Functions in here are fired AFTER Dataporten has been checked out.
 *
 * @author Simon Skrodal
 * @since November 2016
 */

var RELAY_MODALS = (function () {
	// Reference to the modal
	var $modal = false;
	// Reset body of modal when hidden (stops video playback)
	$('#relayModal').on('hide.bs.modal', function () {
		$modal = $(this);
		$modal.find('#body').html("");
	});

	/**
	 * Generic modal builder - will call relevant function based on data-type on link/button called.
	 */
	$('#relayModal').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		// data-type attribute determines which modal we build
		var type = button.data('type');
		// Update reference to the modal
		$modal = $(this);
		// Update the modal's content according to type
		switch (type) {
			case 'clientHistory':
				buildClientHistoryModal();
				break;
			case 'presentationDetails':
				// If data-type is presentationDetails, we can expect a data-presid as well
				buildPresentationDetailsModal(button.data('presid'));
				break;
		}
	});

	/**
	 * Involved in building a modal view of a single presentation. Will request API for more info
	 * about the presentation (deleted/hits/urls) and enrich the local USER.accountPresentations object.
	 *
	 * @param $modal
	 */
	function buildPresentationDetailsModal(presId) {
		// Get details for selected presentation from local store
		var presentationObj = USER.accountPresentations()[presId];
		// Update modal fields
		$modal.find('#title').html(presentationObj.title);
		$modal.find('.modal-dialog').removeClass('modal-lg').removeClass('modal-sm');
		$modal.find('#body').html("<p>Henter...</p>");
		// Clone HTML template for modal body
		var $body = $('#presentationInfoBody').clone();
		// Update fields in body
		$body.find('#presentation_info').find("#description").html(presentationObj.description);
		$body.find('#presentation_info').find('#author').html(presentationObj.presenter_name);
		$body.find('#presentation_info').find('#date').html(moment.unix(presentationObj.timestamp).format('DD.MM.YYYY'));

		$body.find('#presentation_duration').html(UTILS.secToTime(presentationObj.duration_ms / 1000));

		$body.find('#presentation_resolution').html(presentationObj.max_resolution);
		// Wire DELETE button
		$body.find('#presentation_delete').attr('data-presid', presId);
		// Create an icon representation for the platform used to create this presentation
		var platform = presentationObj.platform;
		switch (platform) {
			case 'Android':
				platform = '<i class="icon ion-social-android"></i>';
				break;
			case 'mac':
				platform = '<i class="icon ion-social-apple"></i>';
				break;
			case 'win':
				platform = '<i class="icon ion-social-windows"></i>';
				break;
		}
		$body.find('#presentation_platform').html(platform);
		// If this is the first time modal is displayed for this particular presentation,
		// we need to call the API for more details (url, hits)
		if (!presentationObj.files) {
			$.when(RELAY.userPresentationInfoXHR(presId))
				.done(function (response) {
					// Array with encoding => urls
					presentationObj.files = response.files;
					// Number of hits and timestamp for latest visit
					presentationObj.hits = response.hits;
					// The path (not url) to this presentation - useful if API delete is used
					presentationObj.path = response.path;
					// Now we can continue to update fields pertaining to urls/hits
					processPresentationFiles($modal, $body, presentationObj);
				})
				.fail(function () {
					$modal.modal('hide');
				});
		} else {
			// If modal for this presentation has already been shown, we already have a local copy of files/hits/paths
			processPresentationFiles($modal, $body, presentationObj);
		}
	}

	/**
	 *
	 * @param $modal
	 * @param $body
	 * @param presObj
	 */
	function processPresentationFiles($modal, $body, presObj) {
		//console.log(JSON.stringify(presObj));
		// Defaults
		$body.find('#presentation_hits').html('');
		$body.find('#presentation_hits_last').html('');
		// Update hits-related if this presentation has had > 0 visits
		if (presObj.hits !== undefined) {
			$body.find('#presentation_hits').html(presObj.hits.hits + ' hits');
			$body.find('#presentation_hits_last').html('Sist besøkt ' + moment.unix(presObj.hits.timestamp_latest).format('DD.MM.YYYY'));
		}

		// If direct urls for this presentation were returned
		if (presObj.files !== undefined) {
			var preview = false;
			// Reset table
			$body.find('#presentation-files-table').find('tbody').html("");
			// Loop urls/formats and populate table
			$.each(presObj.files, function (index, fileObj) {
				// Pick the best format for preview
				if (fileObj.encoding == "PC") {
					preview = fileObj.url;
				}
				// Add row
				$body.find('#presentation-files-table').find('tbody').append(
					'<tr>' +
					'<td>' + fileObj.encoding + '</td>' +
					'<td style="text-align: center;">' +
					'<a type="button" href="' + fileObj.url + '" class="btn bg-dark-gray text-red btn-sm icon ion-ios-play" target="_blank"></a>' +
					'</td>' +
					'<td>' +
						'<div class="input-group input-group-sm">' +
						// ID to be used by clipboard.js
						'<input type="text" id="file_' + index + '" class="form-control mediaDirectLink" readonly style="background-color: #FFF;" value="' + fileObj.url + '">' +
						'<span class="input-group-btn">' +
						// Add attrib used by clipboard.js to button
						'<button type="button" class="btn bg-light-blue btn-flat icon ion-clipboard" data-clipboard-target="#file_' + index + '" data-toggle="tooltip" data-placement="top" title="Kopier lenke" data-original-title="Kopier"></button>' +
						'</span>' +
						'</div>' +
					'</td>' +
					'</tr>');
			});
			// Set PC-version of MP4 as preview in videoplayer
			$body.find('#presentation_preview').attr('src', preview);
			// Add and display content when ready
			$modal.find('#body').html($body);
			$body.show();
		} else {
			$modal.modal('hide');
			UTILS.alertInfo("Fant ingen mediafiler for presentasjon", "Min Relay kan i enkelte tilfeller komme til å vise filer som du har slettet ved et tidligere tidspunkt.")
		}
	}

	/**
	 * Handle delete
	 */
	$('#relayModal').on('click', "#presentation_delete", function (event) {
		if (confirm("Er du sikker på at du vil slette denne presentasjonen?")) {
			$(this).button('loading');
			var presId = $(this).data('presid');
			deletePresentation(presId);
		}
	});

	/**
	 * Add a presentation to delete table (mark for deletion).
	 * @param presId
	 */
	function deletePresentation(presId) {
		// Call API
		$.when(RELAY.userPresentationDeleteXHR(presId))
			.done(function () {
				// If delete operation was successfull set delete_status on local copy (no need to fetch all presentations again)
				USER.accountPresentations()[presId].delete_status = {
					id: presId,
					moved: 0,
					undelete: 0
				};
				// Rebuild tables (this presentation will now end up in the deleted table)
				RELAY_UI.updatePresentationTables();
			})
			.always(function () {
				$modal.modal('hide');
			});
	}

	/**
	 * Fetch/store all clients from API and build table.
	 *
	 * @param $modal
	 */
	function buildClientHistoryModal() {
		$modal.find('#title').html("Relay Recorder / Fuse — Historikk");
		$modal.find('.modal-dialog').removeClass('modal-lg').removeClass('modal-sm');
		$modal.find('#body').html("<p>Henter...</p>");
		// If list of client history has not already been fetched
		if (!USER.accountClients()) {
			var clients = [];
			// Call API to get all clients ever used by this user
			$.when(RELAY.userClients()).done(function (response) {
				// Store a copy for later use
				USER.accountClientsStore(response);
				// console.log(USER.accountClients());
				buildClientHistoryTable(response, $modal);
			});
		} else {
			// Local copy already available
			buildClientHistoryTable(USER.accountClients(), $modal);
		}
	}

	/**
	 * @param clients
	 * @param $modal
	 */
	function buildClientHistoryTable(clients, $modal) {
		// Make a clone of template for client history
		var $table = $('#clientHistoryTable').clone();
		// Populate DataTable with the data
		$($table.find('#clientHistoryDataTable')).DataTable({
			data: clients,
			columns: [
				{data: "computer"},
				{data: "version"},
				{
					data: "timestamp",
					render: function (data, type, presObj) {
						return moment.unix(data).format("DD.MM.YYYY");
					}
				}
			],
			language: CONFIG.DATATABLES_LANGUAGE()
		});
		$modal.find('#body').html($table);
		$table.show();
	}

	return {
		tester: function () {
			return null;
		}
	}
})();