/** 
 * Returns formatted to local timestamp from UTC timestamp string
 * 
 * @param {string} timestamp
 * 
 * @return local timestamp format
 * 
*/
export function getCurrentTimezoneFormat(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleString();
}