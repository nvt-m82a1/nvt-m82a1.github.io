(function () {
    var map = {
        "KeyH": {
            run: hotkey_ctrlh,
            "KeyH": {
                run: hotkey_ctrlh_h
            },
            "KeyG": {
                run: hotkey_ctrlh_g
            },
            "KeyV": {
                run: hotkey_ctrlh_v
            }
        },
        "KeyM": {
            run: hotkey_ctrlm,
            "ArrowUp": {
                run: hotkey_ctrlm_arrowup,
                skip: true,
            },
            "ArrowDown": {
                run: hotkey_ctrm_arrowdown,
                skip: true,
            },
            "Enter": {
                run: hotkey_ctrm_enter,
                skip: true,
            }
        },
        "KeyP": {
            run: hotkey_ctrlp,
            "ArrowUp": {
                run: hotkey_ctrlp_arrowup,
                skip: true,
            },
            "ArrowDown": {
                run: hotkey_ctrp_arrowdown,
                skip: true,
            },
            "Enter": {
                run: hotkey_ctrp_enter,
                skip: true,
            }
        },
        "KeyF": {
            run: hotkey_ctrlf,
            "KeyM": {
                run: hotkey_ctrlf_m
            }
        },
        "KeyK": {
            run: hotkey_ctrlm,
            "KeyM": {
                run: hotkey_ctrlf_m
            }
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
    var apphotkey_nextReset;

    function setAppHotkey(text, nextReset = true) {
        apphotkey.textContent = text;
        apphotkey_nextReset = nextReset;
    }

    function addAppHotkey(hotkey) {
        var text = apphotkey.textContent;
        apphotkey.textContent = (apphotkey_nextReset || text.length === 0) ? hotkey : text + " + " + hotkey;
        apphotkey_nextReset = false;
    }
    // end app hotkey

    function doc_OnKeydown(e) {
        if (e.ctrlKey && targetKey[e.code] !== undefined) {
            if (targetKey[e.code].skip === true) {
                targetKey[e.code].run();
            }
            else {
                addAppHotkey("Ctrl+" + e.code);
                targetKey = targetKey[e.code];
                targetKey.run();
            }
            e.preventDefault();
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
                        if (targetKey[e.code].skip === true) {
                            targetKey[e.code].run();
                        }
                        else {
                            addAppHotkey(e.code);
                            targetKey = targetKey[e.code];
                            targetKey.run();
                        }
                        e.preventDefault();
                    }
                    break;
            }
        }
    }

    // ctrl h
    function hotkey_ctrlh() {
        setAppHotkey("Focus header");
        document.getElementById("header").focus();
    }

    function hotkey_ctrlh_h() {
        setAppHotkey("Open homepage");
        document.getElementById("app_name").click();
        resetHotkey();
    }

    function hotkey_ctrlh_g() {
        setAppHotkey("Open git");
        document.getElementById("app_git").click();
        resetHotkey();
    }

    function hotkey_ctrlh_v() {
        setAppHotkey("Open version");
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
        setAppHotkey("");
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

    function hotkey_ctrlk_m() {
    }
    // end ctrl k

    document.addEventListener('keydown', doc_OnKeydown, false);
})()