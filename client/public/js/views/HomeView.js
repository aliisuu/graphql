import { ViewController } from "../models/viewController.js";
import { router } from "../index.js";
import { getLocalstorageValue } from "../utils/localStorage.js";
import { HeaderComponent } from "../components/HeaderComponent.js";
import { UsernameComponent } from "../components/UsernameComponent.js";
import { TransactionsComponent } from "../components/TransactionsComponent.js";
import { XpTransactionsGraphComponent } from "../components/XpTransactionsGraphComponent.js";
import { PiscineJsGraphComponent } from "../components/PiscineJsGraphComponent.js";


export class HomeView extends ViewController {

  xpTrancationsGraphComponent

  piscineJsGraphComponent
  /**
   * Represents main page.
   */
  constructor() {
    super()
    this.xpTrancationsGraphComponent = new XpTransactionsGraphComponent()
    this.piscineJsGraphComponent = new PiscineJsGraphComponent()
  }

  async getHTML() {

    if (getLocalstorageValue("JWT") === null) {
      return router.push("/signin")
    }

    const headerHTML = await new HeaderComponent().getHTML();

    const usernameHTML = await new UsernameComponent().getHTML();

    const transactionsHTML = await new TransactionsComponent().getHTML();

    const xpTransactionsGraphHTML = await this.xpTrancationsGraphComponent.getHTML();

    const piscineJsGraphHTML = await this.piscineJsGraphComponent.getHTML();

    return `
            ${headerHTML}

            <div id="body-container">
              <div id="user-transactions-container">
                ${usernameHTML}
                ${transactionsHTML}
              </div>

              <div id="graph-container">
                ${xpTransactionsGraphHTML}
                ${piscineJsGraphHTML}
              </div>
            </div>
            `
  }

  attachEventListeners() {

    new HeaderComponent().attachEventListeners()

    this.xpTrancationsGraphComponent.attachEventListeners()

    this.piscineJsGraphComponent.attachEventListeners()
  }
}