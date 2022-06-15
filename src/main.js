import events from "./events.js";

const globals = {
    input_file: "",
    have_meta: false,
    input: null,
    param: {
        data_name: "",
        key_factor: "",
        key_name: "",
        meta: "{}"
    },
    output: null,
}

events(globals);

