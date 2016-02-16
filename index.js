var request = require('request');
var Converter = require("csvtojson").Converter;
var converter = new Converter({
	delimiter: ';'
});

var itemdb_url = 'https://csgo.tm/itemdb/';

exports.setup = function(options) {
	this.APIKey = options.APIKey;
}

exports.getItemdb = function(callback) {
	getCsv(function(err, result) {
		if(err) return callback(err);
		request(itemdb_url+result, function(error, response, body) {
    		if(error || response.statusCode !== 200) return callback(error || new Error(response.statusCode));
    		converter.fromString(body, function(err, result) {
    			if(err) return callback(err);
    			return callback(null, result);
    		});		
		});
	});
}

function getCsv(callback) {
	request(itemdb_url+'current_730.json', function(error, response, body) {
    	if(error || response.statusCode !== 200) return callback(error || new Error(response.statusCode));
    	body = JSON.parse(body);
    	return callback(null, body.db);
	});
}