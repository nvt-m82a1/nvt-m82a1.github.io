(function () {
    var appstage = {}
    load();

    function load() {
        var data = localStorage.getItem("appstage");
        if (data !== null) {
            appstage = JSON.parse(data);
        }
    }

    function save() {
        localStorage.setItem("appstage", JSON.stringify(appstage));
    }

    function set(name, key, value) {
        if (appstage[name] === undefined) appstage[name] = {}
        appstage[name][key] = value;
        save();
    }

    function get(name) {
        return appstage[name];
    }

    function getValue(name, key) {
        return appstage[name][key];
    }

    window.setAppstage = set;
    window.getAppstage = get;
    window.getAppstageValue = getValue;
})()