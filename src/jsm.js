import { delay } from "./misc.js";

const isGeoJson = (data) => {
    return data.type && data.coordinates
}

/** output:
 * [
 *      {key: "user.first_name", type: "string"},
 *      {key: "user.last_name", type: "string"},
 *      {key: "user.age", type: "number"},
 *      {key: "id", type: "number"},
 * ]
 **/

/** Outputs the structure of the json */
export const getJsonStructure = (json, output = [], itemkey = "", start = true) => {
    if(start && !Array.isArray(json)) throw new Error("You can't split a non-array");
    if(Array.isArray(json)) {
        for(let i in json) {
            const item = json[i];
            getJsonStructure(item, output, itemkey ? itemkey+"[]" : "", false);
            if(i > 500) {
                break;
            }
        }
    } else if(typeof json === "object") {
        if(isGeoJson(json)) {
            if(!output.find(item => item.key === itemkey)) {
                output.push({key: itemkey, type: `geo (${json.type})`});
            }
        } else {
            Object.keys(json).forEach(key => {
                getJsonStructure(json[key], output, itemkey + (itemkey ? "." : "") + key, false);
            });
        }
    } else {
        if(!output.find(item => item.key === itemkey)) {
            output.push({key: itemkey, type: typeof json});
        }
    }
    return output.sort((a, b) => a.key.localeCompare(b.key));
}

export const splitJson = async (json, [key_factor, key_name], onEachCallback = (item = {key:"",data:[],count:0}, progress=0) => {}) => {
    if(!Array.isArray(json)) throw new Error("You can't split a non-array");
    const output = [];
    for(let i in json) {
        const item = json[i];
        const value = eval(`item.${key_factor}`).trim(); 
        const name = eval(`item.${key_name}`).trim(); 
        let output_item = output.find(item => item.key === value);
        if(!output_item) {
            output_item = {key: value, name, data: [], count: 0};
            output.push(output_item);
        }
        output_item.data.push(item);
        output_item.count++;
        onEachCallback(output_item, i/json.length * 100);
        if(i % 500 === 0) {
            await delay(0);
        }
    }
    return output;
}
