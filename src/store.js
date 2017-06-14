import { createStore } from 'redux';
import chart from './ducks/chart'; // step 2 takes us to chart.js to create initial state

export default createStore(chart); 
// step 4 calls the reducer with undefined for the state parameter 
// and @@redux/INIT for the action
// since state is undefined, it defaults to equal the initial state 
// via the reducer in chart.js