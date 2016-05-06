module.exports = function() {
	
	var data = { tasks: [] }

	for(var i = 1; i <= 10; i++) {

		data.tasks.push({id: i, value: 'Task number ' + i, completed: false})

	}

	return data;

}