(function(root){
  "use strict";
  var StepStore = root.StepStore = {};
  var _steps = {};
  var _callbacks = [];

  StepStore.changed = function() {
    _callbacks.forEach(function(callback){
      callback();
    });
  };

  StepStore.addChangeHandler = function(callback) {
    _callbacks.push(callback);
  };

  StepStore.removeChangeHandler = function(callback){
    var notRemoved = _callbacks.filter(function(item){
      return item !== callback;
    });
    _callbacks = notRemoved;
  };

  StepStore.all = function(id){
    debugger;
    if (_steps.id === undefined){
      return [];
    }
      return _steps.id;
  };

  StepStore.fetch = function(id){
    $.ajax({
      url: '/api/todos/' + id + '/steps',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        _steps[id] = data;
        StepStore.changed();
      }
    });
  };

  StepStore.create = function(step){
    $.ajax({
      url: '/api/todos/' + step.todo_id + "/steps",
      type: 'POST',
      dataType: 'json',
      data: { step: step },
      success: function(data){
        _steps[id] = data;
        StepStore.changed();
      }
    });
  };

    StepStore.destroy = function(id){
      $.ajax({
        url: '/api/steps/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function(data){
          _steps[id] = data;
          StepStore.changed();
        }
      });
  };

    StepStore.toggleDone = function(id){
      var step = _steps[StepStore.find(id)];
      $.ajax({
        url: '/api/steps/' + id,
        type: 'PATCH',
        dataType: 'json',
        data: { step: {done: !step.done} },
        success: function(data){
          var idx = StepStore.find(data.id);
          step.done = !step.done;
          StepStore.changed();
        }
      });
    };

    StepStore.find = function(id){
      for (var i = 0; i < _steps.length; i++){
        if(_steps[i].id === id){
          return i;
        }
      }
      return -1;
    };


})(this);
