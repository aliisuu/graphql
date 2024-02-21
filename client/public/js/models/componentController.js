/**
 * Blueprint for a component.
 */
export class ComponentController {
    /**
     * Returns a component.
     * 
     * @remark must always return a string
     */
    getHTML() {
        throw Error('getHTML not implemented')
    }

    /**
     * Attaches event listeners.
     * 
     * @remark corresponding component must always be used
     */
    async attachEventListeners() {
        throw Error('attachEventListeners not implemented')
    }
}