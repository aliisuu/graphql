import { graphqlApiController } from "../index.js";
import { ComponentController } from "../models/componentController.js";
import { getLocalstorageValue } from "../utils/localStorage.js";


export class PiscineJsGraphComponent extends ComponentController {

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
                    result(where: { 
                      _and: [
                        { path: { _like: "%piscine-js/%" } },
                        { path: { _nlike: "%crossword%" } },
                        { path: { _nlike: "%sortable%" } }
                      ]
                    }) {
                      path
                      grade
                      updatedAt
                    }
                  }`
            })
        });

        const processDataForChart = (responseData) => {
            const uniquePaths = new Set();
            let oneAttemptCount = 0;
            let moreAttemptsCount = 0;

            responseData.forEach((item) => {
                const taskKey = item.path;

                if (!uniquePaths.has(taskKey)) {
                    uniquePaths.add(taskKey);

                    if (item.grade === 1) {
                        oneAttemptCount += 1;
                    } else {
                        moreAttemptsCount += 1;
                    }
                }
            });

            return [
                { x: "One Attempt", value: oneAttemptCount },
                { x: "More than One Attempt", value: moreAttemptsCount },
            ];
        };

        this.data = response.data.result

        this.data = processDataForChart(this.data);

        return `
                <div id="piscine-js-graph-container"></div>
               `
    }

    attachEventListeners() {

        const chart = anychart.pie(this.data);

        chart.background().fill('#000');

        chart.title().text('Piscine JS Exercise Completion Efficiency');
        chart.title().enabled(true);
        chart.title().fontFamily('Anta, sans-serif');
        chart.title().fontColor('#00BFFF');

        chart.labels().fontFamily('Anta, sans-serif').fontColor('#eee');

        const legend = chart.legend();
        legend.enabled(true);
        legend.fontFamily('Anta, sans-serif');
        legend.fontColor('#eee');
        legend.position('right');
        legend.itemsLayout('vertical');

        chart.fill(function () {
            return anychart.color.lighten('#ff9900', this.index * 0.2);
        });

        chart.radius('100%');

        chart.container("piscine-js-graph-container");

        chart.draw();
    }
}