import { NotFoundView } from "../views/NotFoundView.js"
import { SomethingWentWrongView } from "../views/SomethingWentWrongView.js"
import { ViewController } from "./viewController.js"

export class Route {

    path
    view
    title

    /**
     * Represents a custom route for our Router.
     * 
     * @class
     * 
     * @param {string} path 
     * @param {ViewController} view 
     * @param {string} title 
     */
    constructor(path, view, title = "real-time-forum") {
        this.#verifyRoute(path, view, title)

        this.path = path
        this.view = view
        this.title = title

    }

    /**
     * Verifies route constructor parameters.
     * 
     * @private
     * 
     * @param {string} path 
     * @param {ViewController} view 
     * @param {string} title 
     */
    #verifyRoute(path, view, title) {

        if (typeof path !== "string") {
            throw Error(`Invalid route path. Route path must be typeof string, got ${typeof path}`)
        }

        if (path[0] !== "/") {
            throw Error(`Invalid route path. Route path must start with a /, got ${path}`)
        }

        if (!(view instanceof ViewController)) {
            throw Error(`Invalid route view. Route view must be instanceof ViewController`)
        }

        if (typeof title !== "string") {
            throw Error(`Invalid route title. Route title must be typeof string, got ${typeof title}`)
        }
    }
}

export class Router {

    routes
    app
    location

    /**
     * Represents a custom router for SPA routing.
     * 
     * @class
     * 
     * @param {Route[]} routes 
     */
    constructor(routes) {
        this.#verifyRoutes(routes)

        this.routes = routes
    }

    /**
     * Mounts Router to selected element and browser.
     * 
     * @public
     * 
     * @param {string} app - HTML element, class, id name 
     */
    mount(app) {

        const selectedElem = document.querySelector(app)

        if (!selectedElem) {
            throw Error(`Router mount point not found`)
        }

        this.app = selectedElem

        this.#addGlobalListeners()
    }

    /**
     * Handles routing and serves views.
     * 
     * "@function
     * 
     * @param {string} newLocation 
     * @returns 
     */
    async handleRoutes(newLocation) {

        for await (const route of this.routes) {
            if (route.path === location.pathname) {
                try {
                    document.title = route.title
                    this.location = newLocation
                    this.app.innerHTML = await route.view.getHTML() || ""

                    route.view.attachEventListeners()
                    return
                } catch (error) {
                    console.log(error)
                    return this.app.innerHTML = await new SomethingWentWrongView().getHTML()
                }
            }
        }
        this.app.innerHTML = await new NotFoundView().getHTML()
    }

    /**
     * Pushes new entry into browser history stack.
     * 
     * @public
     * 
     * @param {string} path 
     */
    push(path) {

        if (path === this.location) return;

        history.pushState(null, null, path)

        this.handleRoutes(path)
    }


    /**
     * Gracefully refreshes the page without actually toggling location.reload
     * 
     * @public
     * 
     * @param {string} path 
     * 
     */
    gracefulRefresh(path) {
        this.handleRoutes(path)
    }

    /**
     * Adds event listeners to anchor tag, page load and popstate.
     * 
     * @private
     */
    #addGlobalListeners() {

        document.addEventListener("click", (event) => {

            const anchor = event.target.closest("a")

            if (anchor) {
                if (anchor.getAttribute("router-push")) {
                    event.preventDefault()

                    this.push(anchor.getAttribute("router-push"))
                }
            }

        })

        document.addEventListener("DOMContentLoaded", (event) => {
            this.handleRoutes()
        })

        window.addEventListener("popstate", (event) => {
            this.handleRoutes(event.target.location.href)
        })
    }

    /**
     * Verifies routes for Router.
     * 
     * @private
     * 
     * @param {Route[]} routes 
     */
    #verifyRoutes(routes) {

        if (!Array.isArray(routes)) {
            throw Error(`Invalid routes. Routes must be an array, got ${typeof routes}`)
        }

        if (routes.length < 1) {
            throw Error(`Invalid routes. At least one route has to be defined`)
        }

        for (const route of routes) {
            if (!(route instanceof Route)) {
                throw Error(`Invalid routes. Routes must be an instanceof Route, got ${typeof route}`)
            }
        }
    }
}