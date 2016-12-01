<div id="relayModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="title">
	<div class="modal-dialog" role="document"> <!-- modal-lg / modal-sm -->
		<div class="modal-content">
			<div class="modal-header bg-black-gradient">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
				<h4 id="title" class="modal-title uninett-fontColor-white"></h4>
			</div>

			<div class="modal-body">
				<div id="body">

				</div>
			</div>

			<div class="modal-footer bg-black-gradient">
				<button type="button" class="btn btn-default" data-dismiss="modal">Lukk</button>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->



<!-- TEMPLATES -->

	<div id="presentationInfoBody" class="collapse">
		<!-- Hidden by default, shown if description exists -->
		<blockquote id="presentation_info" class="blockquote-reverse" style="font-style: italic;">
			<p id="description"><!--></p>
			<footer>
				<span id="author"><!--></span>, <span id="date"><!--></span>
			</footer>
		</blockquote>

		<div align="center" class="">
		    <video id="presentation_preview" controls class="embed-responsive-item" width="100%">
			    <!-- AJAX -->
		    </video>
			<p class="text-sm text-muted icon ion-android-download"> Høyreklikk på video for å lagre</p>
		</div>
		<div class="meta">
			<code id="presentation_duration" class="text-sm text-gray bg-black-gradient pull-right"></code>
			<p class="text-sm">Opptaket ble gjort på <span id="presentation_platform"><!--></span> med <span id="presentation_resolution"><!--></span> som høyeste tilgjengelige oppløsning.</p>
		</div>
		<hr>
		<!-- FILES TABLE -->
		<div class="box box-solid bg-dark-gray img-rounded">
            <div class="box-header">
	            <span id="presentation_hits_last" class="text-sm text-muted pull-right"><!--></span>
                <h3 class="box-title">Mediafiler &nbsp; <sup id="presentation_hits" class="badge bg-green"><!--></sup></h3>
            </div>

            <div class="box-body table-responsive bg-dark-gray">
	            <p>Lenker som du kan dele med andre.</p>
                <table id="presentation-files-table" class="table table-condensed borderless">
                    <thead>
                        <th style="width: 10%;">Format</th>
                        <th style="width: 10%; text-align: center;">Spill</th>
                        <th style="text-align: right;">Kopier</th>
                    </thead>
                    <tbody>
                        <!-->
                    </tbody>
                </table>
            </div>
		</div>
		<p>
			<small class="text-muted">Historikk for hits siden <span class="hitsFirstRecord xhr"><!--></span>.</small><br>
			<small class="text-muted">Hits for innhold laget med gammelt brukernavn (eks. ved fusjonering) registreres ikke.</small>
		</p>
		<button id="presentation_delete" data-loading-text="Vent..." type="button" class="btn bg-red icon ion-android-delete"> SLETT OPPTAK</button>
	</div>

	<!-- EMBED modal -->

	<div id="myRelayEmbedModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content bg-lighter-gray">
				<!-- HEADER -->
				<div class="modal-header bg-dark-gray">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title icon ion-code-working"> Bygg inn (embed) opptak på web</h4>
				</div>

				<!-- BODY -->
				<div class="modal-body">
					<p>Her er en embedkode du kan bruke for å bygge inn opptaket p&aring; en nettside</p>
					<textarea id="embedcode" name="embedcode" data-url="" style="width: 100%;" rows="5" onclick="this.select();" style="display: block;"></textarea>
					<p class="text-muted">Merk: produsert HTML-kode krever en oppdatert nettleser som støtter HTML5 video, eks. Chrome, Firefox, Internet Explorer, Opera, Safari m.fl.</p>
				</div>

				<div class="modal-footer bg-dark-gray">
					<button type="button" class="btn btn-default" data-dismiss="modal">
						Lukk
					</button>
				</div>
			</div>
		</div>
	</div>




<!-- -->
<div id="clientHistoryTable" class="table-responsive display collapse">
	<p>Historisk oversikt over de ulike enheter du har brukt med Relay Recorder og/eller Fuse (mobil app)</p>
	<table id="clientHistoryDataTable" class="table table-condensed" style="width: 100%">
		<thead>
			<tr>
				<th>Enhet</th>
				<th>Versjon</th>
				<th>Sist brukt</th>
			</tr>
		</thead>

		<tfoot>
            <tr>
				<th>Enhet</th>
				<th>Versjon</th>
				<th>Sist brukt</th>
            </tr>
        </tfoot>
	</table>
</div>
