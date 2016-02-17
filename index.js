var request = require('request');
var Converter = require("csvtojson").Converter;
var converter = new Converter({
	delimiter: ';'
});

var url = 'https://csgo.tm';

exports.setup = function(options) {
	this.APIKey = options.APIKey;
}

exports.getItemdb = function(callback) {
	getCsv(function(err, result) {
		if(err) return callback(err);
		request(itemdb_url+'/itemdb/'+result, function(error, response, body) {
    		if(error || response.statusCode !== 200) return callback(error || new Error(response.statusCode));
    		converter.fromString(body, function(err, result) {
    			if(err) return callback(err);
    			return callback(null, result);
    		});		
		});
	});
}

exports.getHistory = function(callback) {
	request(url+'/history/json/', function(error, response, body) {
		if(error || response.statusCode !== 200) return callback(error || new Error(response.statusCode));
		body = JSON.parse(body);
		return callback(null, body);
	});
}

exports.getItemInfo = function(data, callback) {
	if(!data.classid_instanceid || !data.l || !this.APIKey) return callback('no data');
	request(url+'/api/ItemInfo/'+data.classid_instanceid+'/'+data.l+'/?key='+this.APIKey, function(error, response, body) {
		if(error || response.statusCode !== 200) return callback(error || new Error(response.statusCode));
		body = JSON.parse(body);
		return callback(null, body);
	});
}

function getCsv(callback) {
	request(url+'/itemdb/current_730.json', function(error, response, body) {
    	if(error || response.statusCode !== 200) return callback(error || new Error(response.statusCode));
    	body = JSON.parse(body);
    	return callback(null, body.db);
	});
}