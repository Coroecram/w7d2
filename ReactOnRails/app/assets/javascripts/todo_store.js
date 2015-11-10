(function(root){
  "use strict";
  var TodoStore = root.TodoStore = {};
  var _todos = [];
  var _callbacks = [];

  TodoStore.changed = function() {
    _callbacks.forEach(function(callback){
      callback();
    });
  };

  TodoStore.addChangeHandler = function(callback) {
    _callbacks.push(callback);
  };

  TodoStore.removeChangeHandler = function(callback){
    var notRemoved = _callbacks.filter(function(item){
      return item !== callback;
    });
    _callbacks = notRemoved;
  };

  TodoStore.all = function(){
    return _todos.slice();
  };

  TodoStore.fetch = function(){
    $.ajax({
      url: '/api/todos',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        _todos = data;
        TodoStore.changed();
      }
    });
  };

  TodoStore.create = function(todo){
    $.ajax({
      url: '/api/todos',
      type: 'POST',
      dataType: 'json',
      data: { todo: todo },
      success: function(data){
        _todos.push(data);
        TodoStore.changed();
      }
    });
  };

  TodoStore.destroy = function(id){
    $.ajax({
      url: '/api/todos/' + id,
      type: 'DELETE',
      dataType: 'json',
      success: function(data){
        var idx = TodoStore.find(data.id);

        if (idx !== -1){
          _todos.splice(idx, 1);
          TodoStore.changed();
        }
      }
    });
  };

  TodoStore.toggleDone = function(id){
    var todo = _todos[TodoStore.find(id)];

    $.ajax({
      url: '/api/todos/' + id,
      type: 'PATCH',
      dataType: 'json',
      data: { todo: {done: !todo.done} },
      success: function(data){
        var idx = TodoStore.find(data.id);
        todo.done = !todo.done;
        TodoStore.changed();
      }
    });
  };

  TodoStore.find = function(id){
    for (var i = 0; i < _todos.length; i++){
      if(_todos[i].id === id){
        return i;
      }
    }
    return -1;
  };


})(this);
