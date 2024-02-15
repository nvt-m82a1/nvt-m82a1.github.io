(function () {
    var map = {
        "KeyH": {
            name: "Focus header",
            run: hotkey_ctrlh,
            "KeyH": {
                name: "Open homepage",
                run: hotkey_ctrlh_h,
                reset: true
            },
            "KeyG": {
                name: "Open git",
                run: hotkey_ctrlh_g,
                reset: true
            },
            "KeyV": {
                name: "Open version",
                run: hotkey_ctrlh_v,
                reset: true
            }
        },
        "KeyM": {
            name: "Focus menu",
            run: hotkey_ctrlm,
            "ArrowUp": {
                name: "Move up",
                run: hotkey_ctrlm_arrowup,
                skip: true,
            },
            "ArrowDown": {
                name: "Move down",
                run: hotkey_ctrm_arrowdown,
                skip: true,
            },
            "Enter": {
                name: "Select menu",
                run: hotkey_ctrm_enter,
                skip: true,
                reset: true
            }
        },
        "KeyP": {
            name: "Focus page",
            run: hotkey_ctrlp,
            "ArrowUp": {
                name: "Move up",
                run: hotkey_ctrlp_arrowup,
                skip: true,
            },
            "ArrowDown": {
                name: "Move down",
                run: hotkey_ctrlp_arrowdown,
                skip: true,
            },
            "Enter": {
                name: "Select item",
                run: hotkey_ctrlp_enter,
                skip: true,
                reset: true
            }
        },
        "KeyF": {
            name: "Focus footer",
            run: hotkey_ctrlf,
            "KeyM": {
                name: "Open mail",
                run: hotkey_ctrlf_m,
                reset: true
            }
        },
        "KeyK": {
            name: "Open textbox",
            run: hotkey_ctrlk
        }
    }

    var defaultKey = {
        reset: "Escape"
    }

    var targetKey = map;

    function resetHotkey() {
        targetKey = map;
        setAppHotkey("");
        document.activeElement.blur();
    }

    // app hotkey
    var apphotkey = document.getElementById("app_hotkey");

    function setAppHotkey(text) {
        apphotkey.textContent = text;
    }
    // end app hotkey
    document.addEventListener('keydown', doc_OnKeydown, false);
    
    function doc_OnKeydown(e) {
        if (e.ctrlKey && targetKey[e.code] !== undefined) {
            defaultOnKeydown(e);
        }

        if (!e.ctrlKey && !e.shiftKey) {
            switch (e.code) {
                case defaultKey.reset:
                    resetHotkey();
                    e.preventDefault();
                    break;

                default:
                    if (targetKey !== undefined && targetKey[e.code] !== undefined) {
                        defaultOnKeydown(e);
                    }
                    break;
            }
        }

        function defaultOnKeydown(e) {
            if (targetKey[e.code].skip === true) {
                targetKey[e.code].run();
                if (targetKey[e.code].reset === true) {
                    resetHotkey();
                }
            }
            else {
                targetKey = targetKey[e.code];
                setAppHotkey(targetKey.name);
                targetKey.run();
                if (targetKey.reset === true) {
                    resetHotkey();
                }
            }
            e.preventDefault();
        }

    }

    // ctrl h
    function hotkey_ctrlh() {
        document.getElementById("header").focus();
    }

    function hotkey_ctrlh_h() {
        document.getElementById("app_name").click();
    }

    function hotkey_ctrlh_g() {
        document.getElementById("app_git").click();
    }

    function hotkey_ctrlh_v() {
        document.getElementById("app_version").click();
    }
    // end ctrl h

    // ctrl m
    var menuItemFocus = undefined;

    function hotkey_ctrlm() {
        var menu = document.getElementById("menu");

        if (menuItemFocus === undefined) {
            menuItemFocus = menu.firstChild;
            menuItemFocus.classList.add("menu-select")
            menuItemFocus.focus();
        }
    }

    function hotkey_ctrlm_arrowup() {
        var menuItem = menuItemFocus.previousElementSibling;
        if (menuItem === null) {
            var menu = document.getElementById("menu");
            menuItem = menu.lastChild;
        }

        menuItemFocus.classList.remove("menu-select")
        menuItemFocus = menuItem;
        menuItemFocus.classList.add("menu-select")
    }

    function hotkey_ctrm_arrowdown() {
        var menuItem = menuItemFocus.nextElementSibling;
        if (menuItem === null) {
            var menu = document.getElementById("menu");
            menuItem = menu.firstChild;
        }

        menuItemFocus.classList.remove("menu-select")
        menuItemFocus = menuItem;
        menuItemFocus.classList.add("menu-select")
    }

    function hotkey_ctrm_enter() {
        menuItemFocus.click();
        menuItemFocus.classList.remove("menu-select")
    }
    // end ctrl m

    // ctrl p
    function hotkey_ctrlp() {
    }

    function hotkey_ctrlp_arrowup() {
    }

    function hotkey_ctrlp_arrowdown() {
    }

    function hotkey_ctrlp_enter() {
    }
    // end ctrl p

    // ctrl f
    function hotkey_ctrlf() {
    }

    function hotkey_ctrlf_m() {
    }
    // end ctrl f

    // ctrl k
    function hotkey_ctrlk() {
        document.getElementById("app_search").focus();
    }
    // end ctrl k
})()