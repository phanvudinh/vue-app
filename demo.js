https = require('https');

function negotiateProxies(negotiateUrlOptions) {
    var negotiateData = "";

    var negotiateFunction = function (res) {
        res.on('data', function (chunk) {
            negotiateData += chunk;
        });
        res.on('end', function (endRes) {
            try {
                console.log(res)
                if (res.statusCode == 200) {
                    var negotiateObj = JSON.parse(negotiateData);
                    console.log(negotiateObj)
                    onSuccess(negotiateObj);
                } else if (res.statusCode == 401 || res.statusCode == 302) {
                    console.log("Unauthority")
                } else {
                    console.log('Negotiate Unknown', undefined, res.statusCode);
                }
            } catch (e) {
                console.log('Parse Error', e, negotiateData);
            }
        });
        res.on('error', function (e) {
            console.log('HTTP Error', e);
        });
    };
    var negotiateResult = https.get(negotiateUrlOptions, negotiateFunction).on('error', console.log('error'));
}
    