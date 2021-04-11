// Functions to help with skin actions.
import ENV from './../config.js';
const API_HOST = ENV.api_host;

export const createSkin = (skin) => {
    const request = new Request(`${API_HOST}/api/newskin`, {
        method: "post",
        body: JSON.stringify(skin),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
}

export const updateSkin = (skin) => {
    const request = new Request( `${API_HOST}/api/skin/${skin._id}`, {
        method: "PATCH",
        body: JSON.stringify(skin),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
}
export const getSkins = async (user=null) => {
    let url = `${API_HOST}/api/skins`
    if(user){
        url += `?user_id=${user._id}`;
    }

    return fetch(url)
        .then(res => {
            if (res.status === 200){
                return res.json()
            }
        })
        .catch(error => {
            console.log(error);
            return new Promise((resolve => {resolve({skins: []})}))
        });
}

export const getSkin = (image_id) => {
    let url = `${API_HOST}/api/skins?image_id=${image_id}`
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
            return new Promise((resolve => {resolve({skins: []})}))
        });
}