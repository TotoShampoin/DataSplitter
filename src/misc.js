/** @param {number} ms @returns {Promise<void>} */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

