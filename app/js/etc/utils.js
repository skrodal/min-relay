/**
 * Some useful constants.
 *
 * @author Simon Skrodal
 * @since November 2016
 */
var UTILS = (function () {

	function alertError(title, message) {
		$('#modalErrorAlert').find('#title').html(title);
		$('#modalErrorAlert').find('#message').html(message);
		$('#modalErrorAlert').modal('show');
	}
	function alertInfo(title, message) {
		$('#modalInfoAlert').find('#title').html(title);
		$('#modalInfoAlert').find('#message').html(message);
		$('#modalInfoAlert').modal('show');
	}

	function secToTime(totalSec) {
		var hours = parseInt(totalSec / 3600);
		var minutes = parseInt(totalSec / 60) % 60;
		var seconds = (totalSec % 60).toFixed();
		return two(hours) + ":" + two(minutes) + ":" + two(seconds);

	}
	function two(x) {
		return ((x > 9) ? "" : "0") + x
	}


	/*** Expose public functions ***/
	return {
		alertError: function (title, message) {
			alertError(title, message);
		},
		alertInfo: function (title, message){
			alertInfo(title, message);
		},
		secToTime: function (totalSec) {
			return secToTime(totalSec);
		}
	}
})();

