$(document).ready(function () {
	$.getJSON("/api/todos")
	.then(addTodos)
	.catch(function (err) {
		console.log(err)
	})

	$('#todoInput').keypress(function (event) {
		if (event.which == 13) {
			createTodo();
		}
	})

	$('.list').on('click', 'li', function () {
		updateTodo($(this))
	});

	$('.list').on("click", 'span', function (e) {
		e.stopPropagation();
		removeTodo($(this).parent());
	})
});

function addTodos (todos){
	todos.forEach(function (todo) {
		pushTodo(todo);
	})
}

function createTodo () {
	var userInput = $('#todoInput').val();
	$.post('/api/todos',{name: userInput})
	.then(function(newTodo){
		$('#todoInput').val("");
		pushTodo(newTodo);
	})
	.catch(function (err) {
		console.log("error!")
		console.log(err)
	})
}

function pushTodo (todo) {
	var newTodo = $('<li class="task">'+todo.name +'<span>X</span></li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
	if (todo.completed) {
		newTodo.addClass('done')
	}
	$(".list").append(newTodo);
}

function removeTodo (todo) {
	var clickedId = todo.data('id');
	var urlLi = '/api/todos/' + clickedId;
	$.ajax({
		method: 'DELETE',
		url: urlLi
	})
	.then(function (data) {
		todo.remove();
	})
	.catch(function (err) {
		console.log(err)
	})
}

function updateTodo (todo) {
	var updateUrl = '/api/todos/' + todo.data('id');
	var isDone = !todo.data('completed');
	var updateData = {completed: isDone};
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData
	})
	.then(function () {
		todo.toggleClass('done');
		todo.data('completed', isDone);
	})
}