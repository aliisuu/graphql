import { graphqlApiController } from "../index.js";
import { ComponentController } from "../models/componentController.js";
import { getLocalstorageValue, logOut } from "../utils/localStorage.js";

export class UsernameComponent extends ComponentController {

    /**
     * Represents username
     */
    constructor() {
        super()
    }

    async getHTML() {

        const response = await graphqlApiController.fetch('', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getLocalstorageValue('JWT')} `
            },
            body: JSON.stringify({
                query: `{
                        user {
                            login
                        }
                    }`
            })
        });

        console.log(response)

        const username = response.data.user[0].login

        return `
                <div class="username-container">
                    <div id="username">${username}</div>
                </div>
               `
    }

    attachEventListeners() {
    }
}