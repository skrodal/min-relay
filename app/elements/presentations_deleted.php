<div id="sectionPresentationsDeleted" class="collapse">
	<hr>
	<p class="page-header text-muted uppercase label bg-orange icon ion-trash-b"> Slettet</p>

	<div class="row">
		<div class="col-md-12">
			<div class="box box-warning">
				<div class="box-header with-border">
					<h3 class="box-title text-muted">...men kan gjenopprettes</h3>
				</div>
				<!-- /.box-header -->
				<div class="box-body">
					<div class="row">
						<div class="col-lg-12">
							<div id="presentationsDeletedContainer" class="table-responsive display">
								<p>Slettet innhold er ikke tilgjengelig på nett, men kan gjenopprettes ved å klikke "angre". Etter <span class="badge bg-orange daysToKeepBeforeDelete"><!-- CONFIG --></span> dager slettes innholdet <strong>permanent</strong>.</p>
								<p class="text-muted">Det tar inntil 5 minutter før nylig slettet innhold blir gjort utilgjengelig.</p>
								<table id="presentationsDeletedDataTable" class="table table-striped table-hover table-condensed text-muted" style="width: 100%">
							        <thead>
							            <tr>
							                <th>Tittel</th>
							                <th>Varighet</th>
							                <th>Dato</th>
							                <th>Status</th>
							                <th>Handling</th>
							            </tr>
							        </thead>
							        <tfoot>
							            <tr>
							                <th>Tittel</th>
							                <th>Varighet</th>
							                <th>Dato</th>
							                <th>Status</th>
							                <th>Handling</th>
							            </tr>
							        </tfoot>
									<!-- DataTable -->
								</table>
							</div>
						</div><!-- /.col -->
					</div><!-- /.row -->
				</div><!-- ./box-body -->


				<div class="box-footer">
					<button id="btnUpdatePresentationTables" type="button" class="btn btn-success">Oppdater tabell</button>
				</div>

				<div class="overlay ajax">
					<i class="fa fa-spinner fa-pulse"></i>
				</div>
			</div><!-- /.box -->
		</div>
	</div>
</div>