import { graphqlApiController } from "../index.js";
import { ComponentController } from "../models/componentController.js";
import { getLocalstorageValue, logOut } from "../utils/localStorage.js";

export class HeaderComponent extends ComponentController {

    /**
     * Represents the whole header
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
                                attrs
                            }
                        }`
            })
        });

        if (response.errors) {
            return logOut()
        }

        const firstname = response.data.user[0].attrs.firstName
        const lastname = response.data.user[0].attrs.lastName


        return `
                <header>
                    <div class="header">
                        <div id="greeting">Hello, ${firstname} ${lastname}!</div>
                        <button id="logout-button">LOG OUT</button>
                    </div>
                </header>
               `
    }

    attachEventListeners() {
        const logoutButton = document.getElementById("logout-button")

        if (logoutButton) {
            logoutButton.addEventListener("click", (event) => {

                event.preventDefault()

                logOut()
            })
        }
    }
}