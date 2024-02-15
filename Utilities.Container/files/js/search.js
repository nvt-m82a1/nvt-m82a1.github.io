(function () {
    var search = document.getElementById("app_search");
    search.addEventListener('keydown', search_OnKeyDown);

    var pattern = /([^\s]*)\s?(.+)?/;
    var displaySaved = {}

    function search_OnKeyDown(e) {
        switch (e.code) {
            case "Enter":
                var [, key, value] = pattern.exec(search.value);

                switch (key) {
                    case "hide":
                        var item = document.getElementById(value);
                        if (item !== undefined) {
                            displaySaved[value] = item.style.display;
                            item.style.display = "none";
                            search.value = "";
                        }
                        break;

                    case "show":
                        if (displaySaved[value] !== undefined) {
                            var item = document.getElementById(value);
                            item.style.display = displaySaved[value];
                            search.value = "";
                        }
                        break;

                    default:
                        break;
                }
                break;
        }
        e.preventDefault();
    }
})()