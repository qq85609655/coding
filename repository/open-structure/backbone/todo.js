$(function() {
	var Todo = Backbone.Model.extend({
		defaults: function() {
			return {
				title: "empty todo ...",
				order: Todos.nextOrder(),
				done: false
			};
		},
		toggle: function() {

		},
		url:"/a"
	});

	var TodoList = Backbone.Collection.extend({
		done: function() {
			return this.where({
				done: true
			});
		},
		nextOrder: function() {
			if (!this.length) {
				return 1;
			}
			return this.last().get("order") + 1;
		},
		model: Todo
	});

	var Todos = new TodoList;
	var TodoView = Backbone.View.extend({
		tagName: "li",
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			// this.$el.toggleClass("done",this.model.get("done"));
			// this.input=this.$(".edit");
			return this;
		},
		template: _.template($("#item-template").html()) 
	});
	var AppView = Backbone.View.extend({
		el: $("#todoapp"),
		statesTemplate: _.template($("#state-template").html()),
		events: {
			"keypress #new-todo": "createOnEnter"
		},
		initialize: function() {
			this.input = this.$("#new-todo");
			this.allCheckbox = this.$("#toggle-all")[0];
			this.listenTo(Todos, "add", this.addOne);
			// this.listenTo(Todos,"reset",this.addAll);
			// this.listenTo(Todos,"all",this.render);
			// this.footer=this.$("footer");
			// this.main=this.$("#main");
		},
		addOne: function(todo) {
			var view = new TodoView({
				model: todo
			});
			this.$("#todo-list").append(view.render().el);
		},
		addAll: function() {
			Todos.each(this.addOne, this);
		},
		render: function() {
			var done = Todos.done().length;
			var remaining = Todos.remaining().length;
			if (Todos.length) {
				this.main.show();
				this.footer.html(this.stateTemplate({
					done: done,
					remaining: remaining
				}));
			} else {
				this.main.hide();
				this.footer.hide();
			}
			this.allCheckbox.checked = !remaining;
		},
		createOnEnter: function(e) {
			if (e.keyCode !== 13) return;
			if (!this.input.val()) return;
			Todos.create({
				title: this.input.val()
			})
			this.input.val("");
		}
	});
	var appview = new AppView;

});