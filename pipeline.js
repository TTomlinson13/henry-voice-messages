$(document).on('click', '#editPipeline', function (event) {
    event.preventDefault();
    const pipelineId = $(this).attr('data-pipelineid');

    ShowLoader("Retrieving Pipeline details, please wait.....");

    $.ajax({
        timeout: 10000,
        type: "POST",
        url: "functions/pipelineFunctions.php",
        dataType: "json",
        data: { retrievePipelineEdit: pipelineId },
        success: function (data) {
            HideLoader();

            if (data && data.status === "Got Data" && data.pipeline) {
                openPipelineEditDialog(data.pipeline);
            } else {
                alert(data && data.message ? data.message : "Unable to load pipeline details.");
            }
        },
        error: function () {
            HideLoader();
            alert("Error retrieving pipeline details.");
        }
    });
});

function openPipelineEditDialog(pipeline) {
    $.ajax({
        url: "functions/functions.php",
        type: "POST",
        dataType: "json",
        data: {
            moduleId: pipeline.ModuleId,
            create_pipeline: 1
        },
        success: function (res) {
            if (!res || !res.data) {
                alert('Unable to load pipeline form.');
                return;
            }
            $('#pipelineModal .modal-body').html(res.data);
            launchOffCanvasPanel(res.data, 'Edit Pipeline');
            populatePipelineFormForEdit(pipeline);
        },
        error: function () {
            alert('Error loading pipeline form.');
        }
    });
}


function populatePipelineFormForEdit(pipeline) {
    const $form = $('#new_pipeline_form');
    if (!$form.length) {
        console.error('new_pipeline_form not found.');
        return;
    }

    // Hidden fields for edit mode
    if (!$form.find('#pipeline_id').length) {
        $form.append(
            '<input type="hidden" name="pipeline_id" id="pipeline_id" value="' +
            escapeHtml(pipeline.PipelineId) + '">'
        );
    }
    if (!$form.find('input[name="pipeline_mode"]').length) {
        $form.append('<input type="hidden" name="pipeline_mode" value="edit">');
    }

    // Change submit button text
    $('.createPipeline').text('Update Pipeline');

    // Basic pipeline fields
    $('#pipeline_name').val(pipeline.PipelineName);

    const layoutVal = normalizeLayoutForSelect(pipeline.laneLayout);
    if (layoutVal) {
        $('#pipeline_layout').val(layoutVal);
    }

    const hasLanes = !!pipeline.hasLanes;
    const lanes = pipeline.lanes || [];
    const stages = pipeline.stages || [];

    if (hasLanes && lanes.length > 0) {
        // ---------- PIPELINE WITH LANES ----------
        lanes.sort(function (a, b) {
            const oa = a.LaneOrder || 0;
            const ob = b.LaneOrder || 0;
            if (oa === ob) return (a.LaneId || 0) - (b.LaneId || 0);
            return oa - ob;
        });

        const laneCount = lanes.length;
        // Build lane rows via your existing #numberOflanes handler
        $('#numberOflanes').val(laneCount).trigger('change');

        lanes.forEach(function (lane, idx) {
            const i = idx + 1;

            $('#pipelineLaneName' + i).val(lane.LaneName);
            $('#pipelineLaneColor' + i).val(lane.laneBGColor || '#ffffff');
            $('#pipelineLaneOrder' + i).val(lane.LaneOrder || i);

            const $stageSelect = $('#pipelineLaneStages' + i);
            if ($stageSelect.length) {
                $stageSelect
                    .empty()
                    .append("<option value=''>Type Stage Name and Press Enter</option>");

                const laneStages = (lane.stages || []).slice().sort(function (a, b) {
                    const oa = a.StageOrder || 0;
                    const ob = b.StageOrder || 0;
                    return oa - ob;
                });

                laneStages.forEach(function (st) {
                    const name = st.StageName || '';
                    if (!name) return;
                    const opt = new Option(name, name, true, true);
                    $stageSelect.append(opt);
                });

                $stageSelect.trigger('change');
            }
        });

    } else {
        // ---------- PIPELINE WITHOUT LANES ----------
        // Show stages only; do NOT create lanes.
        $('#numberOflanes').val(''); // leave empty
        const $laneRowDiv = $('#laneRowDiv');
        $laneRowDiv.empty();

        const orderedStages = (stages || []).slice().sort(function (a, b) {
            const oa = a.StageOrder || 0;
            const ob = b.StageOrder || 0;
            return oa - ob;
        });

        let html = `
            <div class="col-md-12 mb-2">
                <label class="form-label">Stages</label>
                <small class="text-muted d-block">
                    This pipeline has no lanes. You can edit the stage names and order below.
                </small>
            </div>
        `;

        if (orderedStages.length === 0) {
            // No stages at all — still allow adding
            html += `
                <div class="col-md-12 mb-1 text-muted">
                    No stages defined yet.
                </div>
            `;
        }

        orderedStages.forEach(function (st, idx) {
            const name = escapeHtml(st.StageName || '');
            const order = st.StageOrder || (idx + 1);

            html += `
                <div class="row mb-2 global-stage-row">
                    <div class="col-md-8">
                        <input type="text"
                               class="form-control"
                               name="globalStages[]"
                               value="${name}"
                               placeholder="Stage name">
                    </div>
                    <div class="col-md-2">
                        <input type="number"
                               class="form-control"
                               name="globalStageOrder[]"
                               value="${order}"
                               placeholder="#"
                               min="1">
                    </div>
                    <div class="col-md-2 d-flex align-items-center">
                        <button type="button"
                                class="btn btn-outline-danger btn-sm remove-global-stage">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        // Add button
        html += `
            <div class="col-md-12 mt-2">
                <button type="button"
                        class="btn btn-outline-secondary btn-sm"
                        id="addGlobalStage">
                    + Add Stage
                </button>
            </div>
        `;

        $laneRowDiv.html(html);
    }
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normalizeLayoutForSelect(layout) {
    if (!layout) return '';
    layout = String(layout).toLowerCase();
    if (layout === 'horizontal') return 'Horizontal';
    if (layout === 'vertical') return 'Vertical';
    return layout;
}
