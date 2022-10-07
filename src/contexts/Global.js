const queryString = require('query-string');

const parsed = queryString.parse(window.location.search);

const host = 'http://localhost/pdv/';
const user_id = parsed.user_id;
const user_session_value = parsed.user_session_value;

const numberFormat = (params) => {
    let options = {
        locale: 'pt-BR',
        minimumFractionDigits: (typeof params.minDecimals == 'undefined' ? 2 : params.minDecimals),
        maximumFractionDigits: (typeof params.maxDecimals == 'undefined' ? 2 : params.maxDecimals)
    };
    if(!!params.style){
        options.style = params.style;
    }
    if(!!params.currency){
        options.currency = params.currency;
    }
    if(params.style == 'percent'){
        params.value = parseFloat(params.value || 0)/100;
    }
    return parseFloat(params.value).toLocaleString((params.locale || 'pt-BR'), options);
}

export {host, user_id, user_session_value, numberFormat}