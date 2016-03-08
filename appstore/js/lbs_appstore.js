appFactory = require("./appmodel.js");
personModel = require("./personmodel.js");
cookieController = require("./cookie_controller.js");
var URL_API_SERVER = "http://localhost:5000/";

var lbsappstore = {
    init: function () {
        $.getJSON(URL_API_SERVER + 'apps?page=1', function (data) {
            var cc = new cookieController();
            var pm = new personModel(cc);
            var vm = new viewModel(pm);
            vm.populateFromRawData(data);
            vm.pages = ko.observableArray();
            for (i = data._self._current_page; i <= data._self._total_pages; i++) {
                vm.pages.push(new vm.pageFactory(i));
                vm.loadMoreData(i);
            }
            vm.setActiveApp();
            vm.setInitalFilter();
            ko.applyBindings(vm);
            $('pre code').each(function (i, e) { hljs.highlightBlock(e) });
        });
    }
};

/**
ViewModel for whole application
*/
var viewModel = function (personModel) {
    var self = this;
    self.personModel = personModel;
    self.apps = ko.observableArray();
    self.expandedApp = ko.observable();
    self.activeFilter = ko.observable();
    self.searchvalue = ko.observable();
    self.mergeMenu = ko.observable(false);
    self.activepage = ko.observable(1);
    self.loadedpages = [1];
    // self.hitcounter = ko.observable();

    self.runsinlime = ko.observable(false);

    if (window.external && window.external.database) {
        self.runsinlime(true);
    }

    self.loadMoreData = function(pagenumber){
        if (self.loadedpages.indexOf(pagenumber) == -1){
            //$.getJSON(URL_API_SERVER + pagenumber, function (data) {
            //    self.populateFromRawData(data);
            //});            
                $.ajax({
                    url: URL_API_SERVER + 'apps?page=' + pagenumber,
                    type: 'get',
                    dataType: 'json',
                    cache: true,
                    async: false,
                    success: function(data){
                        self.populateFromRawData(data)
                    },
                    error: function () {
                        console.log("något sket sig");
                    }
                    
                });            
            self.loadedpages.push(pagenumber);    
        }
        
    }
    // utility for converting to grid
    self.listToMatrix = function (list, elementsPerSubArray) {
        var matrix = [], i, k;
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }
            matrix[k].push(list[i]);
        }
        return matrix;
    }

    // populate VM from JSON data
    self.populateFromRawData = function (rawData) {        
        var currentpage = rawData._self._current_page; 
        
        $(rawData.apps).each(function (index, app) {
            if (app.name) {
                self.apps.push(new appFactory(app, currentpage, personModel))
            }
        });
    }

    self.pageFactory = function(pagenumber){
        var page = this;
        page.pagenumber = pagenumber;
        page.nextpage = function(){
            self.activepage(this.pagenumber);
        }
        return page;
    }

    // post processing
    self.postProcessingLogic = function (elements) {
        $(elements).find("#expanded-" + self.expandedApp()).modal('show');
    };

    // computed grid view with filters
    self.appsGrid = ko.computed(function () {
        //filter apps in the correct status
        var apps = ko.utils.arrayFilter(this.apps(), function (item) {
            if (self.searchvalue()) {
                var scrollTop = $(window).scrollTop();
                if (scrollTop >= 200) {
                    $(window).scrollTop(0);
                    $('#navbar-search').focus();
                }
                if ((item.appName().toLowerCase().indexOf(self.searchvalue().toLowerCase()) >= 0)) {
                    return item;
                }
            }
            else {
                if (self.activeFilter()) {
                    if (self.activeFilter().text === 'All') {
                        return item.currentpage == self.activepage();
                    }
                    else if (self.activeFilter().text === 'New') {
                        if (Object.prototype.toString.call(item.info.versions()[0]) !== '[object Undefined]') {
                            return moment(item.info.versions()[0].date()).format('YYYY-MM-DD') > moment().subtract(90, 'days').format('YYYY-MM-DD') && (item.info.status() === 'Release' || item.info.status() === 'Beta');
                        }
                    }
                    else {
                        return item.info.status() == (self.activeFilter() ? self.activeFilter().text : '');
                    }
                }
            }
            
        });

        // sort
        apps.sort(function (l, r) { return l.name() > r.name() ? 1 : -1 });

        if (self.searchvalue()) {

        }

        // transform into grid
        return self.listToMatrix(apps, 3);
    }, this);

    // set active app
    self.setActiveApp = function () {
        // App show be shown from start

        var activeApp = ko.utils.arrayFirst(self.apps(), function (item) {
            return "#" + item.name() == location.hash;
        });

        if (activeApp) {
            activeApp.expandedApp(true);
            self.expandedApp(activeApp.name())
        }
    }

    // set initial filter
    self.setInitalFilter = function () {
        var filter = ko.utils.arrayFirst(self.avaliableStatuses(), function (item) {
            return item.text == 'All';
        });
        self.selectStatusFilter(filter);
    }

    // computed view of avaliable statuses
    self.avaliableStatuses = ko.computed(function () {
        // get the statuses
        var values = ko.utils.arrayMap(self.apps(), function (item) {
            return item.info.status();
        });
        values.push('All');
        values.push('New');
        // make them unique
        values = ko.utils.arrayGetDistinctValues(values).sort();
        // assign new meta data
        values = ko.utils.arrayMap(values, function (item) {
            var text = item;
            var style;
            var selected = false;
            switch (item) {
                case 'Release':
                    style = "btn-success"
                    break;
                case 'Beta':
                    style = "btn-warning"
                    break;
                case 'Development':
                    style = "btn-danger"
                    break;
            }

            // return an object with properties
            return {
                text: text,
                style: style,
                default_style: 'btn-default',
                selected: ko.observable(selected)
            }
        });

        return values;
    });

    // assign a status filter
    self.selectStatusFilter = function (item) {
        // disable old filter
        if (self.activeFilter()) {
            self.activeFilter().selected(false);
            $('.nav-appstore').find('a').removeClass('active-appstore');
            $('#' + item.text).addClass('active-appstore');
        }
        // set new filter
        self.activeFilter(item);

        // enable filter
        self.activeFilter().selected(true);
    }

    // assign a status filter
    self.showStartFilter = function (item) {
        self.activeFilter(item);
        self.activeFilter().selected(true);
    }
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= 200) {
            self.mergeMenu(true);
        }
        else {
            self.mergeMenu(false);
        }
    });
}

/**
Lets get this party on the road
*/
$(function () {
    $(document).ready(function () {
        lbsappstore.init();
        if ($(location.hash).length > 0) {
            $("#expanded-checklist").modal('show');
        }
    });
});

ko.bindingHandlers.icon = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var content = "<i class='glyphicon " + ko.unwrap(valueAccessor()) + "'></i>"
        if (
            $(element).text() !== '' && $(element).text().substring(0, content.length) != content) {
            $(element).prepend(content);
            element = $(element).get(0);
        }
    }
};
