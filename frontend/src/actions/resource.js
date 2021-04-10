// Functions to help with user actions.

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

// A function to send a GET request to get all users
export const getAllResourcePacks = (setAllResourcePacks) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/api/resource`, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(allResourcePacks => {
            setAllResourcePacks(allResourcePacks)
        })
        .catch(error => {
            console.log(error);
        });
};