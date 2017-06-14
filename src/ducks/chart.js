const CREATE_CHART = 'CREATE_CHART';
const SET_ACTIVE_CHART_INDEX = 'SET_ACTIVE_CHART_INDEX';
const ADD_DATASET = 'ADD_DATASET';



// step 3 creates the initial state variable & sends us to store.js
var initialState = {
    activeChartIndex: 0,
    charts: [
        {
            labels: [ "Red", "Blue", "Yellow", "Green", "Purple", "Orange" ], 
            name: "Example Chart", 
            datasets: [
                {
                label: "My First dataset", 
                data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                label: "My Second dataset",
                data: [28, 48, 40, 19, 96, 27, 100]
                }
            ] // close datasets
        } // close first object 
    ] // close charts array
} // close initial state


// reducer 
// step 5 fires the switch statement. We now go to index.js
export default function chart(state = initialState, action) {
    switch(action.type) {
        // this case adds the new chart to the beginning of the charts array
        // it does this by adding the chart to the beginning of the active chart index on the sidebar
        // and then it adds the new chart to the beginning of the charts array using the spread operator
        case CREATE_CHART:
            return {
                activeChartIndex: 0,
                charts: [ action.chart, ...state.charts ]
            };
            // this case sets the active chart index 
            // it doesn't make any changes to the charts array
            // it simply updates the active chart index
        case SET_ACTIVE_CHART_INDEX:
            return {
                activeChartIndex: action.index,
                charts: state.charts
            };
            // this case is to add a dataset to a chart
            // first, we destructure the object
            // then adding a new chart is a nightmare
            // we keep the charts in the right order by using slice
            // then we add a new Object that has datasets to modify
            // then we add the rest of the charts to the charts array
            case ADD_DATASET: {
                const { activeChartIndex, charts } = state;
                const activeChart = charts[ activeChartIndex ];
                return {
                    activeChartIndex,
                    charts: [
                    ...charts.slice(0, activeChartIndex), 
                    Object.assign({}, activeChart, {datasets: [...activeChart.datasets, action.dataset]}),
                    ...charts.slice(activeChartIndex + 1, charts.length)
                    ]
                }
                };
        default:
            return state;
    }
}

export function createChart(labels, name) {
    return {
        chart: { labels, name, datasets: [] },
        type: CREATE_CHART
    }
}
export function setActiveChartIndex(index) {
    return {
        index: index,
        type: SET_ACTIVE_CHART_INDEX
    }
}
export function addDataset(dataset) {
    return {
        dataset: dataset,
        type: ADD_DATASET
    }
}


