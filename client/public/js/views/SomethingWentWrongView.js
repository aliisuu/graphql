import { ViewController } from "../models/viewController.js";
import { HeaderComponent } from "../components/HeaderComponent.js";

export class SomethingWentWrongView extends ViewController {
    /**
     * Represents a 500 page.
     */
    constructor() {
        super()
    }

    async getHTML() {
        return `${(() => {
            return new HeaderComponent().getHTML()
        })()}
                <div class="went-wrong">
                    <div> Something went wrong 505</div>
                </div>
                `
    }

    attachEventListeners() {
        new HeaderComponent().attachEventListeners()
    }
}