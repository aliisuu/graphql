import { graphqlApiController } from "../index.js";
import { ComponentController } from "../models/componentController.js";
import { getLocalstorageValue } from "../utils/localStorage.js";


export class XpTransactionsGraphComponent extends ComponentController {

    data
    /**
     * Represents a graph
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
                        transaction(where: { type: { _eq: "xp" } path: { _nlike: "%piscine%" } }) {
                            amount
                            createdAt
                        }
                    }`
            })
        });

        this.data = response.data.transaction.map(entry => ([
            new Date(entry.createdAt).toISOString().split('T')[0],
            entry.amount
        ]));


        this.data.sort((a, b) => new Date(a[0]) - new Date(b[0]));

        this.data.forEach((elem, index) => {
            if (index != 0) {
                this.data[index][1] = this.data[index - 1][1] + elem[1]
            }
        })

        this.data = this.data.map((elem, index) => {
            if (index !== 0) {
                elem[1] += this.data[index - 1][1];
            }
            elem[0] = new Date(elem[0]).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
            return elem;
        });


        return `
                <div id="xp-graph-container"></div>
               `
    }

    attachEventListeners() {

        const xpTransactionsChart = anychart.line();

        let series = xpTransactionsChart.line(this.data);

        xpTransactionsChart.background().fill('#000');

        xpTransactionsChart.title().text('XP Progression Over Time');
        xpTransactionsChart.title().enabled(true);
        xpTransactionsChart.title().fontFamily('Anta, sans-serif');
        xpTransactionsChart.title().fontColor('#00BFFF');

        xpTransactionsChart.xAxis().title('Timeline');
        xpTransactionsChart.xAxis().title().fontFamily('Anta, sans-serif');
        xpTransactionsChart.xAxis().title().fontColor('#00BFFF');
        xpTransactionsChart.xAxis().labels().fontFamily('Anta, sans-serif').fontColor('#eee');
        xpTransactionsChart.xAxis().stroke('#eee');

        xpTransactionsChart.yAxis().title('XP Amount');
        xpTransactionsChart.yAxis().title().fontFamily('Anta, sans-serif');
        xpTransactionsChart.yAxis().title().fontColor('#00BFFF');
        xpTransactionsChart.yAxis().labels().fontFamily('Anta, sans-serif').fontColor('#eee');
        xpTransactionsChart.yAxis().stroke('#eee');

        series.stroke('#ff9900');

        xpTransactionsChart.container('xp-graph-container');
        xpTransactionsChart.draw();
    }
}