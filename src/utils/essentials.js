/**
 * Turns time into string form
 * @param {Number} time Time in seconds
 * @param {Object} [options] Optional settings
 * @param {Boolean} [options.stringifiedTime] Displays time like a digital clock (ex. 23:20)
 * @returns {String} Formatted time
 */
function formatTime (time = 0, { stringifiedTime } = { stringifiedTime: false }) {

    let output = "",
        min = 0,
        hr = 0,
        d = 0,
        w = 0,
        m = 0;

    // Months
    if (time >= 2592000) {
        m = Math.floor(time / 2592000);
        time -= m * 2592000;
    }

    // Weeks
    if (time >= 604800) {
        w = Math.floor(time / 604800);
        time -= w * 604800;
    }

    // Days
    if (time >= 86400) {
        d = Math.floor(time / 86400);
        time -= d * 86400;
    }

    // Hours
    if (time >= 3600) {
        hr = Math.floor(time / 3600);
        time -= hr * 3600;
    }

    // Minutes
    if (time >= 60) {
        min = Math.floor(time / 60);
        time -= min * 60;
    }

    // Append months
    if (m > 0) output += `${m} month${ m > 1 && "s" || "" } `;

    // Append weeks
    if (w > 0) output += `${w} week${ w > 1 && "s" || "" } `;

    // Append days
    if (d > 0) output += `${d} day${ d > 1 && "s" || "" } `;

    if (w === 0) {
        if (stringifiedTime) {

            // Append hours
            if (hr > 0) output += `${hr} hour${hr > 1 && "s" || "" } `;

            // Append minutes
            if (min > 0) output += `${min} minute${min > 1 && "s" || "" } `;

            // Append seconds
            if (time > 0 && d === 0) output += `${time} second${time > 1 && "s" || "" } `;
        
        } else {

            // Append hours
            if (hr > 0) output += `${hr}:`;

            // Append minutes
            if (min > 0) {
                output += `${
                    hr > 0 || min < 10
                        ? "0"
                        : ""
                }${min}:`;
            } else {
                output += "00:";
            }

            // Append seconds
            output += `${
                time < 10
                    ? "0"
                    : ""
            }${Math.floor(time)}`;

        }
    }

    return output.trim();
}

export {
    formatTime
};