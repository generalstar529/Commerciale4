export const requestAPI = async (path, method, data) => {
    return await fetch(`/.netlify/functions/api${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const geocodeByAddress = async (address) => {
    return await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        .then((res) => res.json())
        .then((data) => data.results)
        .then((results) => {
            if (results && results.length) {
                return results[0].geometry.location;
            }
        })
        .catch((err) => {
            return null;
        });
};
