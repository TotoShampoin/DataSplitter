export const on = {
    importJson: (file) => {},
    importParam: (file) => {},
    downloadParam: () => {},
    downloadOutput: () => {},
    runSplitting: () => {},
    paramDbNameChange: (input) => {},
    paramKeyFactorChange: (input) => {},
    paramKeyNameChange: (input) => {},
    paramMetaChange: (input) => {},
    paramIncludeMeta: (input) => {},
};

// All are button elements
const $import_json = $("#import-json");
const $import_param = $("#import-param");
const $download_param = $("#download-param");
const $download_output = $("#download-output");
const $run_splitting = $("#run-splitting");
const $param_includemeta = $("#param-includemeta");
const $param_dbname = $("#param-dbname");
const $param_keyfactor = $("#param-keyfactor");
const $param_keyname = $("#param-keyname");
const $param_meta = $("#param-meta");

$import_json.on("click", () => {
    const $file = $("<input type='file' accept='.json'/>");
    $file.on("change", function(e) {
        const file = $file[0].files[0];
        on.importJson(file);
    });
    $file.trigger("click");
});
$import_param.on("click", () => {
    const $file = $("<input type='file' accept='.json'/>");
    $file.on("change", function(e) {
        const file = $file[0].files[0];
        on.importParam(file);
    });
    $file.trigger("click");
});

$download_param.on("click", () => {
    on.downloadParam();
});
$download_output.on("click", () => {
    on.downloadOutput();
});

$run_splitting.on("click", () => {
    on.runSplitting();
});

$param_dbname.on("change", function(e) {
    on.paramDbNameChange(e.target.value);
});
$param_keyfactor.on("change", function(e) {
    on.paramKeyFactorChange(e.target.value);
});
$param_keyname.on("change", function(e) {
    on.paramKeyNameChange(e.target.value);
});
$param_meta.on("change", function(e) {
    on.paramMetaChange(e.target.value);
});
$param_includemeta.on("change", function(e) {
    on.paramIncludeMeta(e.target.checked);
});
