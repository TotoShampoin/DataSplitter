/**
 * 
 * @param {[HTMLImageElement, {}, []]} param0 
 * @returns {Promise<Blob>}
 */
export const zip = async ([output, param]) => {
    const zip = new JSZip();
    output.forEach(item => {
        zip.file(`data/${item.key}.json`, JSON.stringify(item.data));
    });
    zip.file("table.json", JSON.stringify(param));
    const base64 = await zip.generateAsync({ type: "base64" });
    return "data:application/zip;base64," + base64;
}
