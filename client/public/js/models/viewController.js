/**
 * Blueprint for a view.
 */
export class ViewController {
    /**
     * Returns a view.
     * 
     * @remarks must always return a string
     */
    async getHTML() {
        throw Error('getHTML not implemented')
    }

    /**
     * Attaches event listeners.
     * 
     * @remark corresponding component must always be used
     */
    attachEventListeners() {
        throw Error('attachEventListeners not implemented')
    }
}