// js/models/todo.js

var app = app || {};

// Todo Model
// ----------
// Our basic **Todo** model has `title` 、 `times`、`count` and `rate` attributes.

app.Todo = Backbone.Model.extend({

    // Default attributes ensure that each todo created  has `title` 、 `times`、`count` and `rate`keys.
    defaults: {
        title: '',
        times:0 ,   //笔数
        count:0 ,   //总商品数
        rate:0,     //连带率
        source:''
    }

});
