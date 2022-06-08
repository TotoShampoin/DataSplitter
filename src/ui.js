import { data_item, data_item_counted, option } from "./templates.js";

const $file_name = $("#file-name");
const $struct_list = $("#struct-list");
const $param_dbname = $("#param-dbname");
const $param_keyfactor = $("#param-keyfactor");
const $param_keyname = $("#param-keyname");
const $param_meta = $("#param-meta");
const $output_list = $("#output-list");
const $loading = $("#loading");

export const setFileName = (name) => {
    $file_name.text(name);
}

export const fillStructList = (structs) => {
    const empty_choice = $(option("-- Choose --", ""))
                            .attr("selected", "selected")
                            .attr("disabled", "disabled");
    $struct_list.empty();
    $param_keyfactor.empty();
    $param_keyname.empty();
    $param_keyfactor.append(empty_choice.clone());
    $param_keyname.append(empty_choice.clone());
    structs.forEach(struct => {
        $struct_list.append(data_item(struct.key, struct.type));
        $param_keyfactor.append(option(struct.key, struct.key));
        $param_keyname.append(option(struct.key, struct.key));
    });
}

export const addOrUpdateToOutputList = (item) => {
    const $item = $output_list.find(`[data-key="${item.key}"]`);
    if($item.length) {
        $item.find(".data__count").text(item.count);
    } else {
        const $data = $(data_item_counted(item.name, item.key, item.count))
                        .attr("data-key", item.key);
        $output_list.append($data);
    }
}

export const switchProgress = (bool, goTo = "#run") => {
    $loading.appendTo(goTo);
    if(bool) {
        $loading.removeClass("hidden");
        $("input, button, select, textarea").attr("disabled", "disabled");
    } else {
        $loading.addClass("hidden");
        $("input, button, select, textarea").removeAttr("disabled");
    }
}

export const setProgress = (progress) => {
    $loading.css("--prc", progress);
}

export const setKeyName = (key) => {
    $param_keyname.val(key);
    $param_keyname.trigger("change");
}

export const download = (data, name) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = name;
    a.click();
}

export const fillParam = (param) => {
    $param_dbname.val(param.data_name);
    $param_keyfactor.val(param.key_factor);
    $param_keyname.val(param.key_name);
    $param_meta.val(param.meta);
}