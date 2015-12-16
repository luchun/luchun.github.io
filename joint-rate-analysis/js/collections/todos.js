
// js/collections/todos.js

var app = app || {};

// Todo Collection
// ---------------

// The collection of todos is backed by *localStorage* instead of a remote
// server.
var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.Todo,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage('rates-backbone'),

    titleList: function () {
        return this.pluck("title");
    },
    findByTitle: function(title) {
        return this.filter(function( todo ) {
            return todo.get('title') === title;
        });
    },

    // Todos are sorted by their original insertion order.
    comparator: function( todo ) {
        return todo.get('rate');
    },
    analysis: function () {
        var jsonthis = this.toJSON();
        var ratelist = _.uniq(this.pluck("rate").reverse());
        var groupBy = _.groupBy( jsonthis, function(d){ return d.rate; });
        var ranking = ['第一名','第二名','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名','第十一名','第十二名','第十三名'];
        var result = '';
        var part = '并列店铺:\n';
        _.each(ratelist, function (d,i) {
            if( groupBy[d].length === 1){
                result = result + ranking[i] + ':'+ groupBy[d][0].source +'\n';
            }else{
                _.map(groupBy[d], function (d) {
                    part += d.source + '\n'
                });
                result = result + ranking[i] + ':'+ part ;
                part = '并列店铺:\n';
            }
        });

        return result;

    }

});

// Create our global collection of **Todos**.
app.Todos = new TodoList();
