export const localizeNumber = (number, locale = 'en') => {
    return Number(number).toLocaleString(locale);
};

export const formatNumber = x => {
    try {
        var parts = x.toString().split(".");

        if (x < 1) { parts[1] = parts[1]; }
        else if (x > 1 && x < 100) { parts[1] = parts[1].substr(0, 2); }
        else if (x > 100 && x < 1000) { parts[1] = parts[1].substr(0, 1); }
        else if (x > 1000) { parts[1] = ""; }

        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (x > 1000) { return parts[0]; }
        else { return parts.join("."); }
    }
    catch (err) {
        return x;
    }
};

export const formatBalance = (number, presicion) => {
    var divideby = Math.pow(10, presicion);
    return Number(number / divideby);
};

export const group = (items, n) => items.reduce((acc, x, i) => {
    const idx = Math.floor(i / n);
    acc[idx] = [...(acc[idx] || []), x];
    return acc;
}, []);

export const objectType = (id) => {
    var parts = id.split(".");
    var object_type = "";
    if (parts[0] === "1" && parts[1] === "1")
        object_type = "BASE";
    else if (parts[0] === "1" && parts[1] === "2")
        object_type = "ACCOUNT";
    else if (parts[0] === "1" && parts[1] === "3")
        object_type = "ASSET";
    else if (parts[0] === "1" && parts[1] === "4")
        object_type = "FORCE SETTLEMENT";
    else if (parts[0] === "1" && parts[1] === "5")
        object_type = "COMMITTEE MEMBER";
    else if (parts[0] === "1" && parts[1] === "6")
        object_type = "WITNESS";
    else if (parts[0] === "1" && parts[1] === "7")
        object_type = "LIMIT ORDER";
    else if (parts[0] === "1" && parts[1] === "8")
        object_type = "CALL ORDER";
    else if (parts[0] === "1" && parts[1] === "9")
        object_type = "CUSTOM";
    else if (parts[0] === "1" && parts[1] === "10")
        object_type = "PROPOSAL";
    else if (parts[0] === "1" && parts[1] === "11")
        object_type = "OPERATION HISTORY";
    else if (parts[0] === "1" && parts[1] === "12")
        object_type = "WITHDRAW PERMISSION";
    else if (parts[0] === "1" && parts[1] === "13")
        object_type = "VESTING BALANCE";
    else if (parts[0] === "1" && parts[1] === "14")
        object_type = "WORKER";
    else if (parts[0] === "1" && parts[1] === "15")
        object_type = "BALANCE";
    else if (parts[0] === "1" && parts[1] === "16")
        object_type = "HTLC";
    else if (parts[0] === "2" && parts[1] === "0")
        object_type = "GLOBAL PROPERTY";
    else if (parts[0] === "2" && parts[1] === "1")
        object_type = "DYNAMIC GLOBAL PROPERTY";
    else if (parts[0] === "2" && parts[1] === "3")
        object_type = "ASSET DYNAMIC DATA";
    else if (parts[0] === "2" && parts[1] === "4")
        object_type = "ASSET BITASSET DATA";
    else if (parts[0] === "2" && parts[1] === "5")
        object_type = "ACCOUNT BALANCE";
    else if (parts[0] === "2" && parts[1] === "6")
        object_type = "ACCOUNT STATISTICS";
    else if (parts[0] === "2" && parts[1] === "7")
        object_type = "TRANSACTION";
    else if (parts[0] === "2" && parts[1] === "8")
        object_type = "BLOCK SUMMARY";
    else if (parts[0] === "2" && parts[1] === "9")
        object_type = "ACCOUNT TRANSACTION HISTORY";
    else if (parts[0] === "2" && parts[1] === "10")
        object_type = "BLINDED BALANCE";
    else if (parts[0] === "2" && parts[1] === "11")
        object_type = "CHAIN PROPERTY";
    else if (parts[0] === "2" && parts[1] === "12")
        object_type = "WITNESS SCHEDULE";
    else if (parts[0] === "2" && parts[1] === "13")
        object_type = "BUDGET RECORD";
    else if (parts[0] === "2" && parts[1] === "14")
        object_type = "SPECIAL AUTHORITY";

    return object_type;
};

export const operationType = (_opType) => {
    var name;
    var color;
    var results = [];
    var opType = Number(_opType);
    if (opType === 0) {
        name = "TRANSFER";
        color = "81CA80";
    }
    else if (opType === 1) {
        name = "LIMIT ORDER CREATE";
        color = "6BBCD7";
    }
    else if (opType === 2) {
        name = "LIMIT ORDER CANCEL";
        color = "E9C842";
    }
    else if (opType === 3) {
        name = "CALL ORDER UPDATE";
        color = "E96562";
    }
    else if (opType === 4) {
        name = "FILL ORDER";
        color = "008000";
    }
    else if (opType === 5) {
        name = "ACCOUNT CREATE";
        color = "CCCCCC";
    }
    else if (opType === 6) {
        name = "ACCOUNT UPDATE";
        color = "FF007F";
    }
    else if (opType === 7) {
        name = "ACCOUNT WHITELIST";
        color = "FB8817";
    }
    else if (opType === 8) {
        name = "ACCOUNT UPGRADE";
        color = "552AFF";
    }
    else if (opType === 9) {
        name = "ACCOUNT TRANSFER";
        color = "AA2AFF";
    }
    else if (opType === 10) {
        name = "ASSET CREATE";
        color = "D400FF";
    }
    else if (opType === 11) {
        name = "ASSET UPDATE";
        color = "0000FF";
    }
    else if (opType === 12) {
        name = "ASSET UPDATE BITASSET";
        color = "AA7FFF";
    }
    else if (opType === 13) {
        name = "ASSET UPDATE FEED PRODUCERS";
        color = "2A7FFF";
    }
    else if (opType === 14) {
        name = "ASSET ISSUE";
        color = "7FAAFF";
    }
    else if (opType === 15) {
        name = "ASSET RESERVE";
        color = "55FF7F";
    }
    else if (opType === 16) {
        name = "ASSET FUND FEE POOL";
        color = "55FF7F";
    }
    else if (opType === 17) {
        name = "ASSET SETTLE";
        color = "F1CFBB";
    }
    else if (opType === 18) {
        name = "ASSET GLOBAL SETTLE";
        color = "F1DFCC";
    }
    else if (opType === 19) {
        name = "ASSET PUBLISH FEED";
        color = "FF2A55";
    }
    else if (opType === 20) {
        name = "WITNESS CREATE";
        color = "FFAA7F";
    }
    else if (opType === 21) {
        name = "WITNESS UPDATE";
        color = "F1AA2A";
    }
    else if (opType === 22) {
        name = "PROPOSAL CREATE";
        color = "FFAA55";
    }
    else if (opType === 23) {
        name = "PROPOSAL UPDATE";
        color = "FF7F55";
    }
    else if (opType === 24) {
        name = "PROPOSAL DELETE";
        color = "FF552A";
    }
    else if (opType === 25) {
        name = "WITHDRAW PERMISSION CREATE";
        color = "FF00AA";
    }
    else if (opType === 26) {
        name = "WITHDRAW PERMISSION";
        color = "FF00FF";
    }
    else if (opType === 27) {
        name = "WITHDRAW PERMISSION CLAIM";
        color = "FF0055";
    }
    else if (opType === 28) {
        name = "WITHDRAW PERMISSION DELETE";
        color = "37B68Cc";
    }
    else if (opType === 29) {
        name = "COMMITTEE MEMBER CREATE";
        color = "37B68C";
    }
    else if (opType === 30) {
        name = "COMMITTEE MEMBER UPDATE";
        color = "6712E7";
    }
    else if (opType === 31) {
        name = "COMMITTEE MEMBER UPDATE GLOBAL PARAMETERS";
        color = "B637B6";
    }
    else if (opType === 32) {
        name = "VESTING BALANCE CREATE";
        color = "A5A5A5";
    }
    else if (opType === 33) {
        name = "VESTING BALANCE WITHDRAW";
        color = "696969";
    }
    else if (opType === 34) {
        name = "WORKER CREATE";
        color = "0F0F0F";
    }
    else if (opType === 35) {
        name = "CUSTOM";
        color = "0DB762";
    }
    else if (opType === 36) {
        name = "ASSERT";
        color = "D1EEFF";
    }
    else if (opType === 37) {
        name = "BALANCE CLAIM";
        color = "939314";
    }
    else if (opType === 38) {
        name = "OVERRIDE TRANSFER";
        color = "8D0DB7";
    }
    else if (opType === 39) {
        name = "TRANSFER TO BLIND";
        color = "C4EFC4";
    }
    else if (opType === 40) {
        name = "BLIND TRANSFER";
        color = "F29DF2";
    }
    else if (opType === 41) {
        name = "TRANSFER FROM BLIND";
        color = "9D9DF2";
    }
    else if (opType === 42) {
        name = "ASSET SETTLE CANCEL";
        color = "4ECEF8";
    }
    else if (opType === 43) {
        name = "ASSET CLAIM FEES";
        color = "F8794E";
    }
    else if (opType === 44) {
        name = "FBA DISTRIBUTE";
        color = "8808B2";
    }
    else if (opType === 45) {
        name = "BID COLLATERAL";
        color = "6012B1";
    }
    else if (opType === 46) {
        name = "EXECUTE BID";
        color = "1D04BB";
    }
    else if (opType === 47) {
        name = "ASSET CLAIM POOL";
        color = "AAF654";
    }
    else if (opType === 48) {
        name = "ASSET UPDATE ISSUER";
        color = "AB7781";
    }
    else if (opType === 49) {
        name = "HTLC CREATE";
        color = "11e0dc";
    }
    else if (opType === 50) {
        name = "HTLC REDEEM";
        color = "085957";
    }
    else if (opType === 51) {
        name = "HTLC REDEEMED";
        color = "AB7781";
    }
    else if (opType === 52) {
        name = "HTLC EXTEND";
        color = "093f3e";
    }
    else if (opType === 53) {
        name = "HTLC REFUND";
        color = "369694";
    }
    else if (opType === 54) {
        name = "PROPERTY CREATE";
        color = "169524";
    }
    else if (opType === 55) {
        name = "PROPERTY UPDATE";
        color = "169524";
    }
    else if (opType === 56) {
        name = "PROPERTY APPROVE";
        color = "169524";
    }
    else if (opType === 57) {
        name = "PROPERTY DELETE";
        color = "169524";
    }
    else if (opType === 58) {
        name = "ASSET PRICE PUBLISH";
        color = "FF2A55";
    } else {
        name = "UNKNOWN (" + opType + ")";
        color = "369694";
    }

    results[0] = name;
    results[1] = color;

    return results;
};

const isInteger = (value) => {
    return /^\d+$/.test(value);
}

export const buildCustomKVTableDto = (data, headerM) => {
    let rows = data
        ? headerM.map((item) => {
            let key = Object.keys(item)[0];
            let tmp = item[key].split('.');
            let val_data = tmp.length !== 1 ? data[tmp[0]][tmp[1]] : data[tmp[0]];
            let formattedVal = isInteger(val_data) ? localizeNumber(parseInt(val_data)) : val_data;
            return {
                Key: [key + ':', 'plainText'],
                Value: [
                    item.type === 'html' ? `<a href='${item.link}'>${formattedVal}</a>` : formattedVal, // in case of html, build <a> tag html code
                    item.type
                ],
            };
        })
        : [];

    return rows;
}

// added total field as last feild (total = sum of first value in each element)
export const addTotalFieldToJsonArry = (arry) => {
    if (Object.keys(arry[0]).includes('total')) return arry;
    let total = 0;
    return arry.map(ele => {
        let keys = Object.keys(ele);
        total += Number(ele[keys[0]]);
        ele['total'] = total;
        return ele;
    });
}

// 
export const parseGroupOrdersBook = (data, quote_precision, base_precision) => {
    return data.map(value => {
        let total_for_sale = value.total_for_sale;
        const max_base_amount = parseInt(value.max_price.base.amount);
        const max_quote_amount = parseInt(value.max_price.quote.amount);
        const min_base_amount = parseInt(value.min_price.base.amount);
        const min_quote_amount = parseInt(value.min_price.quote.amount);

        const base_id = value.max_price.base.asset_id;
        const quote_id = value.max_price.quote.asset_id;

        const base_array = base_id.split(".");
        const quote_array = quote_id.split(".");
        let divide = 0;

        if (base_array[2] > quote_array[2]) {
            divide = 1;
        }
        const qp = Math.pow(10, parseInt(quote_precision));
        const bp = Math.pow(10, parseInt(base_precision));

        let max_price;
        let min_price;
        let min;
        let max;
        if (divide) {
            max = (max_quote_amount / qp) / (max_base_amount / bp);
            max_price = 1 / max;
            min = (min_quote_amount / qp) / (min_base_amount / bp);
            min_price = 1 / min;
        }
        else {
            max_price = parseFloat(max_base_amount / bp) / parseFloat(max_quote_amount / qp);
            min_price = parseFloat(min_base_amount / bp) / parseFloat(min_quote_amount / qp);
        }
        total_for_sale = Number(total_for_sale / bp);

        return {
            max_price: max_price,
            min_price: min_price,
            total_for_sale: total_for_sale,
            base_precision: base_precision,
            quote_precision: quote_precision
        };
    });
}