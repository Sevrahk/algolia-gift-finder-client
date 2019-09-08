import axios from 'axios';
import {cloneDeep} from 'lodash';

function requestHelper(search, page, filters, callback) {
    let searchFilter = cloneDeep(filters);
    Object.keys(searchFilter).map(function(key) {
        if(searchFilter[key] === false || searchFilter[key] === '')
            delete searchFilter[key];

        return null;
    });

    axios({
        method: 'post',
        url: process.env.REACT_APP_SEARCH_URL,
        data: {
            search: search,
            page: page - 1,
            filters: searchFilter,
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    })
    .then(function (response) {;
        callback({
            products: response.data.hits,
            nbProducts: response.data.nbHits,
            spellFix: response.data.spellFix
        });
    })
    .catch(function (error) {
        let errorMessage = error.response ? error.response.data : 'Connection to the server failed';
        console.error(errorMessage);
    });
}

export default requestHelper;
