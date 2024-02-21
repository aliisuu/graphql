import { Route, Router } from "./models/router.js"
import { SignInView } from "./views/SignInView.js"
import { HomeView } from "./views/HomeView.js"
import { DataController } from "./models/dataController.js"


// All routes
const routes = [new Route("/", new HomeView(), "Home"), new Route("/signin", new SignInView(), "Sign In")]

// Router
export const router = new Router(routes)

export const authApiController = new DataController(`https://01.kood.tech/api/auth/signin`)
export const graphqlApiController = new DataController(`https://01.kood.tech/api/graphql-engine/v1/graphql`)

// Mounting router to #app
router.mount("#app")