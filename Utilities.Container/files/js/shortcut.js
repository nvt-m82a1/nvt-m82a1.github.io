(function () {
    var map = {
        "KeyH": {
            name: "Focus header",
            run: hotkey_ctrlh,
            "KeyH": {
                name: "Open homepage",
                run: hotkey_ctrlh_h
            },
            "KeyG": {
                name: "Open git",
                run: hotkey_ctrlh_g
            },
            "KeyV": {
                name: "Open version",
                run: hotkey_ctrlh_v
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
                run: hotkey_ctrp_arrowdown,
                skip: true,
            },
            "Enter": {
                name: "Select item",
                run: hotkey_ctrp_enter,
                skip: true,
            }
        },
        "KeyF": {
            name: "Focus footer",
            run: hotkey_ctrlf,
            "KeyM": {
                name: "Open mail",
                run: hotkey_ctrlf_m
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
    }

    // app hotkey
    var apphotkey = document.getElementById("app_hotkey");

    function setAppHotkey(text) {
        apphotkey.textContent = text;
    }
    // end app hotkey

    function doc_OnKeydown(e) {
        if (e.ctrlKey && targetKey[e.code] !== undefined) {
            defaultOnKeydown(e);
        }

        if (!e.ctrlKey && !e.shiftKey) {
            switch (e.code) {
                case defaultKey.reset:
                    setAppHotkey("");
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
            }
            else {
                targetKey = targetKey[e.code];
                setAppHotkey(targetKey.name);
                targetKey.run();
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
        resetHotkey();
    }

    function hotkey_ctrlh_g() {
        document.getElementById("app_git").click();
        resetHotkey();
    }

    function hotkey_ctrlh_v() {
        document.getElementById("app_version").click();
        resetHotkey();
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
        var previous = menuItemFocus.previousElementSibling;
        if (previous !== null) {
            menuItemFocus.classList.remove("menu-select")
            menuItemFocus = previous;
            menuItemFocus.classList.add("menu-select")
        }
    }

    function hotkey_ctrm_arrowdown() {
        var next = menuItemFocus.nextElementSibling;
        if (next !== null) {
            menuItemFocus.classList.remove("menu-select")
            menuItemFocus = next;
            menuItemFocus.classList.add("menu-select")
        }
    }

    function hotkey_ctrm_enter() {
        menuItemFocus.click();
        menuItemFocus.classList.remove("menu-select")
        resetHotkey();
    }
    // end ctrl m

    // ctrl p
    function hotkey_ctrlp() {
    }

    function hotkey_ctrlp_arrowup() {
    }

    function hotkey_ctrp_arrowdown() {
    }

    function hotkey_ctrp_enter() {
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
    }
    // end ctrl k

    document.addEventListener('keydown', doc_OnKeydown, false);
})()