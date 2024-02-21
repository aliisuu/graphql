import { ViewController } from "../models/viewController.js";
import { HeaderComponent } from "../components/HeaderComponent.js";


export class NotFoundView extends ViewController {
    /**
     * Represents a 404 page.
     */
    constructor() {
        super()
    }

    async getHTML() {
        return `${(() => {
                    return new HeaderComponent().getHTML()
                })()}
                <div class="not-found">
                    <div> Not found 404</div>
                </div>
                `
    }

    attachEventListeners() {
        new HeaderComponent().attachEventListeners()
    }
}