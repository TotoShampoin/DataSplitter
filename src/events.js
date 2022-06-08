import { zip } from "./exporter.js";
import { on } from "./io.js";
import { getJsonStructure, splitJson } from "./jsm.js";
import * as UI from "./ui.js";

export default globals => {
    
on.importJson = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        globals.input = json;
        globals.input_file = file.name;
        UI.setFileName(file.name);
        UI.fillStructList(getJsonStructure(json));
    }
    reader.readAsText(file);
}
on.importParam = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const param = JSON.parse(e.target.result);
        globals.param = param;
        UI.fillParam(param);
    }
    reader.readAsText(file);
}
on.downloadParam = () => {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(globals.param));
    UI.download(data, "param.json");
}

on.downloadOutput = async () => {
    UI.switchProgress(true, "#download-output");
    const data = await zip([
        globals.output.map(({key, data}) => ({key, data})),
        {
            name: globals.param.data_name,
            table: globals.output.map(({key, name, count}) => ({key, name, count})),
            meta: JSON.parse(globals.param.meta),
        }
    ], (item, progress) => {
        UI.setProgress(progress);
    });
    UI.download(data, "output.zip");
    UI.switchProgress(false);
}

on.runSplitting = async () => {
    const struct = globals.input;
    const param = globals.param;
    UI.switchProgress(true);
    const result = await splitJson(struct, [param.key_factor, param.key_name], (item, progress) => {
        UI.addOrUpdateToOutputList(item);
        UI.setProgress(progress);
    });
    globals.output = result;
    UI.switchProgress(false);
    console.log(result);
    return result;
}

on.paramDbNameChange = (name) => {
    globals.param.data_name = name;
}
on.paramKeyFactorChange = (key) => {
    globals.param.key_factor = key;
    UI.setKeyName(key);
}
on.paramKeyNameChange = (key) => {
    globals.param.key_name = key;
}
on.paramMetaChange = (meta) => {
    globals.param.meta = meta;
}

}
