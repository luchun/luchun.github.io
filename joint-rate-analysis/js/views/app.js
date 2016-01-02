// js/views/app.js

var app = app || {};

// The Application
// ---------------

// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#todoapp',

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template( $('#stats-template').html() ),

    // New
    // Delegated events for creating new items, and clearing completed ones.
    events: {
        'click #new-item': 'createOne',   // 创建一条
        'click #clear-all': 'clearAll',        // 全部清除
        'click #analysis': 'analysis',          // 开始分析
        'click #backToTable':'backToTable'   //返回
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
        //this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-item-input');
        this.$header = this.$('#header');
        this.$footer = this.$('#footer');
        this.$analysis = this.$('#analysis');
        this.$main = this.$('#main');
        this.$analysisResult = this.$('#analysisResult');
        this.$sectionTable  = this.$('#sectionTable');
        this.$sectionResult = this.$('#sectionResult');
        this.$backToTable = this.$('#backToTable');
        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);
        this.listenTo(app.Todos, 'add remove', this.toggleHeader);
        // New
       // this.listenTo(app.Todos, 'change:completed', this.filterOne);
      //  this.listenTo(app.Todos,'filter', this.filterAll);
        this.listenTo(app.Todos, 'all', this.render);

        app.Todos.fetch();
    },

    // New
    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
        if ( app.Todos.length ) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                total: app.Todos.length
            }));
        } else {
            this.$main.hide();
            this.$footer.hide();
        }
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( todo ) {
        console.log('views\app.js  addOne');
        var view = new app.TodoView({ model: todo });
        $('#todo-list').append( view.render().el );
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
        this.$('#todo-list').html('');
        app.Todos.each(this.addOne, this);
    },

    // New
    // Generate the attributes for a new Todo item.
    newAttributes: function() {

        var regExp = /(\(|\（)([^)）]+)(\)|\）)/g;
        var titleReg = /(^[A-Za-z]+)/;
        var txt = this.$input.val().trim();
        var title =  txt.match(titleReg);
        var matchs = _.each(txt.match(regExp), function (d,i,a) {
            a[i] = d.substring(1, d.length - 1);

        });
        console.log(title);

        return {
            title : title[0],
            times :matchs[2].trim() ,   //笔数
            count :matchs[1].trim() ,   //总商品数
            rate  :  parseFloat( matchs[3].trim()).toFixed(2),      //连带率
            source :txt
        };
    },

    // New
    // If you hit return in the main input field, create new Todo model,
    // persisting it to localStorage.
    createOne: function( event ) {
        event.preventDefault();
        if ( !this.$input.val().trim() ) {
            return;
        }
        var newAttrs =  this.newAttributes();
        var titleList = app.Todos.titleList();
        if(! newAttrs.title){return false}
        if(titleList.indexOf(newAttrs.title) > -1){
            this.updateOne(newAttrs);
        }else{
            app.Todos.create( newAttrs );
        }
        this.$input.val('');
    },
    updateOne: function ( newAttrs) {
        var model = app.Todos.findByTitle(newAttrs.title)[0];
        model.save(newAttrs);
        console.log(model.save);
        return this;
    },
    // New
    // Clear all completed todo items, destroying their models.
    clearAll: function () {
        //app..reset();
        var model;

        while (model = app.Todos.first()) {
            model.destroy();
        }
        return false;
    },
    toggleHeader: function () {
        this.$header.toggle(app.Todos.titleList().length < 13);
    },

    analysis: function () {
       var result = app.Todos.analysis();
        this.$analysisResult.val(result);
        this.$sectionResult.show();
        this.$sectionTable.hide();
    },
    backToTable: function (e) {
        e.preventDefault()
        this.$sectionResult.hide();
        this.$sectionTable.show();
    }
});
