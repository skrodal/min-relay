
<div id="sectionPresentations" class="">
	<hr>
	<p class="page-header text-muted uppercase label uninett-color-red icon ion-ios-videocam"> Innhold</p>

	<div class="row">
		<div class="col-md-12">
			<div class="box box-danger">
				<div class="box-header with-border">
					<h3 class="box-title text-muted">Dine presentasjoner</h3>
				</div>
				<!-- /.box-header -->
				<div class="box-body">
					<p>Klikk på tittel for mer informasjon (eks. hits, lenker, mm.) samt mulighet for å slette.</p>
					<p>Har du mange opptak er søkefunksjonen veldig nyttig!</p>
					<div class="row">
						<div class="col-lg-12">
							<div id="presentationsTableContainer" class="table-responsive display">
								<table id="presentationsDataTable" class="table table-hover" style="width: 100%">
							        <thead>
							            <tr>
							                <th>Tittel</th>
							                <th>Beskrivelse</th>
							                <th>Varighet</th>
							                <th>Dato</th>
							            </tr>
							        </thead>
							        <tfoot>
							            <tr>
							                <th>Tittel</th>
							                <th>Beskrivelse</th>
							                <th>Varighet</th>
								            <th>Dato</th>
							            </tr>
							        </tfoot>
									<!-- DataTable -->
								</table>
							</div>
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- ./box-body -->

				<div class="box-footer">
					<div class="row">
						<div class="col-sm-3 col-xs-6">
							<div class="description-block border-right">
								<h5 class="description-header"><span class="badge bg-gray xhr accountPresentationCount"><!--></span></h5>
								<span class="description-text uppercase">Totalt</span>
							</div><!-- /.description-block -->
						</div><!-- /.col -->

						<div class="col-sm-3 col-xs-6">
							<div class="description-block border-right">
								<h5 class="description-header"><span class="badge bg-green xhr accountPresentationNotDeletedCount"><!--></span></h5>
								<span class="description-text uppercase">Tilgjengelige</span>
							</div><!-- /.description-block -->
						</div><!-- /.col -->

						<div class="col-sm-3 col-xs-6">
							<div class="description-block border-right">
								<h5 class="description-header"><span class="badge bg-yellow xhr accountPresentationRestorableCount"><!--></span></h5>
								<span class="description-text uppercase">Kan gjenopprettes</span>
							</div><!-- /.description-block -->
						</div><!-- /.col -->

						<div class="col-sm-3 col-xs-6">
							<div class="description-block">
								<h5 class="description-header"><kbd class="uninett-color-white text-dark-gray xhr accountPresentationsNotDeletedDuration"><!--></kbd></h5>
								<span class="description-text uppercase">Varighet</span>
							</div><!-- /.description-block -->
						</div>
					</div><!-- /.row -->
				</div><!-- /.box-footer -->

				<div class="box-footer">
					<h5 href="#presentationInfoContent" class="box-header text-muted collapsed text-light-blue" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="presentationInfoContent"">
						<span id="presentationInfoIcon" class="icon ion-ios-arrow-right"> Info&hellip;</span>
					</h5>
					<div class="panel-collapse collapse" role="tabpanel" id="presentationInfoContent" aria-expanded="false">
						<ul class="list-group">
							<li class="list-group-item">Presentasjoner som er slettet permanent vil ikke dukke opp i oversikten, men er likevel tatt med i totalantall.</li>
							<li class="list-group-item">Varighet = summen av alle tilgjengelige presentasjoner.</li>
							<li class="list-group-item">Historikk for hits (visninger) går tilbake til <span class="hitsFirstRecord xhr"><!--></span>: evt. hits før denne dato er ikke medregnet.</li>
						</ul>
					</div>
				</div>
				<div class="overlay ajax">
					<i class="fa fa-spinner fa-pulse"></i>
				</div>
			</div><!-- /.box -->
		</div>
	</div>
</div>