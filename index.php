<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="author" content="Simon Skrødal">
	<link rel="shortcut icon" href="vendor/uninett-bootstrap-theme/ico/favicon.ico">
	<title>UNINETT - Min Relay</title>
	<!-- 3rd party -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker3.min.css" />
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/r-2.1.0/sc-1.4.2/datatables.min.css"/>
	<!-- Fonts/AdminLTE -->
	<link href="vendor/AdminLTE/fonts/ionicons/ionicons.min.css" rel="stylesheet" type="text/css"/>
	<link href="vendor/AdminLTE/fonts/fontawesome/font-awesome.min.css" rel="stylesheet" type="text/css"/>
	<link rel="stylesheet" href="vendor/AdminLTE/css/AdminLTE.min.css">
	<!-- Custom styles for this template -->
	<link rel="stylesheet" href="vendor/uninett-bootstrap-theme/css/uninett.css">
	<link rel="stylesheet" href="app/css/app.css">
	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<!-- Fixed navbar -->
	<?php include_once 'app/elements/navbar.php'; ?>
	<!-- Alerts -->
	<?php include_once 'app/elements/alerts.php'; ?>
	<!-- Main content -->
	<div class="container">
		<hr>
		<div id="noAccountAlert" class="alert bg-red collapse">
			<h4 class="icon ion-android-warning"> Ingen konto</h4>
			<p>Fant ingen konto i TechSmith Relay med brukernavn <code class="feideUserName"><!--></code></p>
			<p>Dersom ditt lærested har tilgang til tjenesten, kan du <a class="registerURL" href="">opprette en konto her</a>.</p>
		</div>

		<div id="loadingAlert" class="alert bg-aqua-active collapse">
			<h4 class="icon ion-ios-videocam"> Henter innhold</h4>
			<p>Henter innhold knyttet til din konto - vennligst vent.</p>
		</div>

		<!-- Shows when user account is loaded -->
		<div id="content" class="collapse">
			<!-- Views -->
			<?php include_once 'app/elements/userwidget.php'; ?>

			<div id="noContentAlert" class="alert bg-aqua-active collapse">
				<h4 class="icon ion-ios-videocam"> Ingen presentasjoner</h4>
				<p>Finner ikke noe innhold knyttet til din konto.</p>
			</div>

			<?php include_once 'app/elements/presentations.php'; ?>
			<?php include_once 'app/elements/presentations_deleted.php'; ?>
			<?php include_once 'app/elements/modals.php'; ?>
			<?php include_once 'app/elements/footer.php'; ?>
		</div> <!-- // content -->

	</div> <!-- // container -->

	<!-- 3rd party -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/1.5.13/clipboard.min.js"></script>

	<script type="text/javascript" src="https://cdn.datatables.net/v/bs/jszip-2.5.0/pdfmake-0.1.18/dt-1.10.12/b-1.2.2/b-html5-1.2.2/b-print-1.2.2/r-2.1.0/sc-1.4.2/datatables.min.js"></script>	<!--<script type="text/javascript" src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>


	<!-- Local -->
	<script src="app/js/auth/jso.min.js"></script>
	<script src="app/js/auth/dataporten_auth.js"></script>
	<script src="app/js/etc/config.js"></script>
	<script src="app/js/etc/utils.js"></script>
	<script src="app/js/api_consumers/dataporten.js"></script>
	<script src="app/js/api_consumers/relay.js"></script>
	<script src="app/js/api_consumers/user.js"></script>
	<script src="app/js/app.js"></script>
	<script src="app/js/relay_modals.js"></script>
	<script src="app/js/relay_ui.js"></script>



</body>
</html>
