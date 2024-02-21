import { authApiController, router } from "../index.js";

export async function authenticate(username, password) {

    const credentials = btoa(`${username}:${password}`)

    const response = await authApiController.fetch("", {
        method: "POST",
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    })

    if (response.error) {
        return "Incorrect username/email or password"
    }

    localStorage.setItem("JWT", response)
}

export function getLocalstorageValue(key) {
    return localStorage.getItem(key);
}

export function logOut() {
    localStorage.removeItem("JWT")

    router.push("/signin")
}