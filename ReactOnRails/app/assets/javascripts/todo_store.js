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

  TodoStore.addChangedHandler = function(callback) {
    _callbacks.push(callback);
  };

  TodoStore.removeChangedHandler = function(callback){
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
      url: '/api/todo/' + id,
      type: 'DELETE',
      dataType: 'json',
      data: { id: id },
      success: function(data){
        var idx = _todos.indexOf(data.id);
        _todos.splice(idx, 1);
        TodoStore.changed();
      }
    });
  };


})(this);
