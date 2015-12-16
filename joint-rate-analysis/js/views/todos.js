// js/views/todos.js

var app = app || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
app.TodoView = Backbone.View.extend({

    //... is a list tag.
    tagName: 'li',
    //className: "pure-g",
    // Cache the template function for a single item.
    template: _.template( $('#item-template').html() ),

    // The DOM events specific to an item.
    events:{
        'blur .item-times': 'updateTimesOnEnter',//当失去焦点时修改总交易笔数
        'blur .item-count': 'updateCountOnEnter',//当失去焦点时修改总交易商品总数
        'blur .item-rate' : 'updateRateOnEnter',//当失去焦点时修改连带率
        'click .destroy': 'clear'           // 删除一行
    },
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);        // NEW
    },

    // Re-render the titles of the todo item.
    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        this.$timesinput = this.$('.item-times');
        this.$countinput = this.$('.item-count');
        this.$rateinput = this.$('.item-rate');

        return this;
    },
    updateTimesOnEnter: function () {
        var timesValue = this.$timesinput.val().trim();
        this.model.save({ times: timesValue });
        this.reCalRate();
    },
    updateCountOnEnter: function () {
        var countValue = this.$countinput.val().trim();
        this.model.save({ count: countValue });
        this.reCalRate();
    },
    updateRateOnEnter: function () {
        var rateValue = this.$rateinput.val().trim();
        this.model.save({ rate: rateValue });
    },
    reCalRate: function () {
        var countValue = this.model.get('count');
        var timesValue = this.model.get('times');
        var newrate = 0;

        if(countValue<=0 || timesValue<=0 ){
            this.model.save({ rate: 0 });
        }else{
            newrate = parseFloat(Math.round(countValue / timesValue * 100) / 100).toFixed(2);
            //from http://stackoverflow.com/questions/6134039/format-number-to-always-show-2-decimal-places
            this.model.save({ rate:  newrate });
            this.$rateinput.val(newrate)
        }
    },
    // NEW - Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function() {
        this.model.destroy();
    }
});
