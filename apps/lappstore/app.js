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

            

            $.ajax({
              dataType: "json",
              url: "http://limebootstrap-appstore.herokuapp.com",
              async:false,
              success: function(result){
                    me.appData = result
                    alert(result);

              }
            });
          

            return me.appData;
    }

});

