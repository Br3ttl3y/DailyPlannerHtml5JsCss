$(document).ready(function(){
	$('#add-task-form').on('submit', function(e){
		addTask(e);
	});

	$('#edit-task-form').on('submit', function(e){
		updateTask(e);
	});

	$('taskTable').on('click', '#removeTask', function(){
		var id = $(this).data('id');
		removeTask(id);
	});

	$('#clearTasks').on('click', function(){
		clearAllTasks();
	});

	displayTasks();

	function displayTasks(){
		var taskList = JSON.parse(localStorage.getItem('tasks'));

		if(taskList != null){
			taskList = taskList.sort(sortByTime);
		}

		var counter = 0;

		if(localStorage.getItem('tasks') != null) {
			$.each(taskList, function(key, value){
				$('#taskTable').append(
					'<tr id="'+ value.id +'">' +
						'<td>'+ value.task +'</td>'+
						'<td>'+ value.taskPriority +'</td>'+
						'<td>'+ value.date +'</td>'+
						'<td>'+ value.time +'</td>'+
						'<td><a href="edit.html?id='+value.id+'">Edit</a> | <a href="" id="removeTask" data-id="'+value.id+'">Remove</a></td>'+
					'</tr>'
				);
			});
		}
	}

	function sortByTime(a, b){
		var aTime = a.time;
		var bTime = b.time;

		return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
	}

	function addTask(e){
		var newDate = new Date();
		var id = newDate.getTime();

		var task = $('#task').val();
		var taskPriority = $('#priority').val();
		var date = $('#date').val();
		var time = $('#time').val();

		if(task == ''){
			alert('Task is required');
		}
		else if(taskPriority  == ''){
			taskPriority = 'Normal';
			e.preventDefault();
		}
		else if(date == ''){
			alert('Date is required');
		}
		else if(time == ''){
			alert('Time is required');
		}
		else{
			var tasks = JSON.parse(localStorage.getItem('tasks'));

			if(tasks == null){
				tasks = [];
			}

			var newTask = {
				"id" : id,
				"task" : task,
				"taskPriority" : taskPriority,
				"date" : date,
				"time" : time	
			}

			tasks.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(tasks));

			console.log('Task App');
		}
	}

	function updateTask(e){
		var id = $('#taskId').val();
		var task = $('#task').val();
		var taskPriority = $('#priority').val();
		var date = $('#date').val();
		var time = $('#time').val();

		taskList = JSON.parse(localStorage.getItem('tasks'));

		for(var i = 0; i < tasks.length; i++){
			if(tasks[i].id == id){
				tasks.splice(i, 1);
			}

			localStorage.setItem('tasks', JSON.stringify(tasks));
		}

		if(task == ''){
			alert('Task is required');
			e.preventDefault();
		}
		else if(date == ''){
			alert('Date is required');
			e.preventDefault();
		}
		else if(time == ''){
			alert('Time is required');
			e.preventDefault();
		}
		else if(taskPriority  == ''){
			taskPriority = 'Normal';
			e.preventDefault();
		}
		else{
			var tasks = JSON.parse(localStorage.getItem('tasks'));

			if(tasks == null){
				tasks = [];
			}

			var newTask = {
				"id" : id,
				"task" : task,
				"taskPriority" : taskPriority,
				"date" : date,
				"time" : time	
			}

			tasks.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}

	function removeTask(id){
		if(confirm('Are you sure you want to delete this task?')){
			var taskList = JSON.parse(localStorage.getItem('tasks'));

			for(var i = 0; i < tasks.length; i++){
				if(tasks[i].id == id){
					tasks.splice(i, 1);
				}

				localStorage.setItem('tasks', JSON.stringify(tasks));
			}

			location.reload();
		}
	}

	function clearAllTasks(){
		var tasks = localStorage.getItem('tasks');
		if(tasks == null || confirm('Do you want to clear all tasks?') == false){
			return;
		}

		localStorage.clear();

		location.reload();
		
	}
});

function getTask(){
	var $_GET = getQueryParams(document.location.search);
	var id = $_GET['id'];

	var taskList = JSON.parse(localStorage.getItem('tasks'));

	for(var i = 0; i < taskList.length; i++){
		var taskId = taskList[i].id;
		if(taskId == id){
			$('#edit-task-form #task_id').val(taskId);
			$('#edit-task-form #task').val(taskList[i].task);
			$('#edit-task-form #priority').val(taskList[i].taskPriority);
			$('#edit-task-form #date').val(taskList[i].date);
			$('#edit-task-form #time').val(taskList[i].time);
		}
	}
}

function getQueryParams(qs){
	qs = qs.split("+").join(" ");
	var params = {}
		, tokens
		, re = /[?&]?([^=]+)=([^&]*)/g;

	while(tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
	}

	return params;
}