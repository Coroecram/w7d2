var TodoList = React.createClass({

  getInitialState: function(){
    return {todos: TodoStore.all()};
  },

  componentDidMount: function(){
    TodoStore.addChangeHandler(this.todosChanged);
    StepStore.addChangeHandler(this.stepsChanges);
    TodoStore.fetch();
    debugger;
    // TodoStore.all().forEach(function(todo){
    //   StepStore.fetch(todo.id);
    // });
  },

  componentWillUnmount: function(){
    TodoStore.removeChangeHandler(this.todosChanged);
  },

  todosChanged: function(e){
    this.setState({todos: TodoStore.all()});
  },

  render: function(){
    return(
      <div>{
        this.state.todos.map(function(todoItem){
          return (
                  <TodoListItem key={todoItem.id} item={todoItem} />
                  );
        })
      }
        <TodoForm key="1"/>
      </div>
    );
  }
});

var TodoListItem = React.createClass({

  getInitialState: function(){
    return ({detail: false});
  },

  render: function(){
    var TodoDetailView;

    if (this.state.detail){
      TodoDetailView = (
          <div>
            <div> {this.props.item.body} </div>
            <button onClick={this.handleDestroy}> Delete </button>
            <ol>{ StepStore.all(this.props.item.id).map(function(step){
              <div>
                <li>step.description</li>
                <button onClick={this.handleStepDestroy}> Delete Step</button>
              </div>
            })
          } </ol>
          </div>
      );
    }

    return(
        <div>
          <div onClick={this.toggleDetail}> {this.props.item.title} </div>
          <button onClick={this.toggleDone}>{this.props.item.done ? "Not Done" : "Done"}</button>
          {TodoDetailView}
        </div>
    );
  },

  handleDestroy: function(e){
    TodoStore.destroy(this.props.item.id);
  },

  toggleDone: function(e){
    TodoStore.toggleDone(this.props.item.id);
  },

  toggleDetail: function(e){
    this.setState({detail: !this.state.detail});
  }
});

var TodoForm = React.createClass({

  getInitialState: function(){
    return ({ title: "", body: ""});
  },

  updateTitle: function(e){
    this.setState({title: e.currentTarget.value });
  },

  updateBody: function(e){
    this.setState({body: e.currentTarget.value });
  },

  handleSubmit: function(e){
    e.preventDefault();
    var todo = {title: this.state.title, body: this.state.body, done: false};
    TodoStore.create(todo);
    this.setState({title: "", body: ""});
  },

  render: function(){
    return(
      <form onSubmit={this.handleSubmit}>
        <h4>Title</h4>
          <input onChange={this.updateTitle} type="text" value={this.state.title} />
        <h5>Body</h5>
          <input onChange={this.updateBody} type="text" value={this.state.body} />
          <input type="submit" value="Submit"/>
      </form>
    );
  }
});
