import { router } from "../index.js";
import { ViewController } from "../models/viewController.js";
import { authenticate } from "../utils/localStorage.js";

export class SignInView extends ViewController {
  /**
   * Represents Sign In page.
   */
  constructor() {
    super()
  }

  async getHTML() {

    return `<div class="form-container">
              <h1>Sign in</h1>
              <form id="login-form">
                <input type="text" id="username-email" name="username-email" placeholder="Username or email" class="form-field" required>
    
                <input type="password" id="password" name="password" placeholder="Password" class="form-field" required>
    
                <button id="login-button" type="submit" class="form-button">SIGN IN</button>
    
                <div id="login-response" class="form-response"></div>
              </form>
            </div>`
  }


  attachEventListeners() {
    const signInForm = document.querySelector("form")

    if (signInForm) {
      signInForm.addEventListener("submit", async (event) => {

        const form = new FormData(event.target);

        event.preventDefault()

        const error = await authenticate(form.get("username-email"), form.get("password"))

        document.querySelector("#login-response").innerHTML = error ? error : ""

        if (error) {
          return
        }

        router.push("/")
      })
    }
  }
}