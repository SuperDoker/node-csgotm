var csgotm = require('../'); // change to 'node-csgotm' if not running from the examples subdirectory

csgotm.setup({
	APIKey: 'W1C87aG8G48Gs5D18k5ObIc8ZmL4qnK'
});

csgotm.getItemInfo({classid_instanceid:'1293510722_143865972', l:'ru'}, function(err, result) {
	console.log(err, result);
});