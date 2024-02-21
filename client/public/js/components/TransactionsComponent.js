import { graphqlApiController } from "../index.js";
import { ComponentController } from "../models/componentController.js";
import { getLocalstorageValue } from "../utils/localStorage.js";

export class TransactionsComponent extends ComponentController {

    /**
     * Represents transactions
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
                            transactions(where: { type: { _eq: "xp" } path: { _nlike: "%piscine%" } }) {
                                amount
                                createdAt
                            }
                        }
                    }`
            })
        });


        const xpTransactions = response.data.user[0].transactions

        const totalXP = Math.floor((xpTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)) / 1000);

        const transactionsCount = xpTransactions.length


        return `
                <div class="transaction-container">
                    <div class="transaction-header">Total XP</div>
                    <div id="totalXP" class="transaction">${totalXP} kB</div>
                </div>

                <div class="transaction-container">
                    <div class="transaction-header">Transactions</div>
                    <div id="transactions-count" class="transaction">${transactionsCount}</div>
                </div>
               `
    }

    attachEventListeners() {
    }
}