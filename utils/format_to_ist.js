function format_to_ist(result) {
    const resultArray = Array.isArray(result) ? result : [result];

    return resultArray.map(r => {
        const formattedResult = {
            ...r,
            created_at: new Date(r.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            updated_at: new Date(r.updated_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        };

        // Format DOJ if it exists
        if (r.DOJ) {
            formattedResult.DOJ = new Date(r.DOJ).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        }

        // Format DOB if it exists
        if (r.DOB) {
            formattedResult.DOB = new Date(r.DOB).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        }

        return formattedResult;
    });
}

module.exports = {
    format_to_ist
};
