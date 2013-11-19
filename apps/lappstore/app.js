lbs.apploader.register('lappstore', function () {
    var self = this;
    //config
    self.config = {
        dataSources: [

        ],
        resources: {
            scripts: [],
            styles: [],
            libs: []
        }
    },

    //initialize
    self.initialize = function (node,appData) {
            var me = this;

            

           
            $.getJSON("http://limebootstrap-appstore.herokuapp.com", function(data) { 
                    me.appData = data
                });
          

            return me.appData;
    }

});

