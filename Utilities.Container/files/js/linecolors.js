// Hiển thị màu tiêu đề trên method của ngôn ngữ C#
(function () {
    var mapGroup = [
        {
            id: 1,
            items: ["public", "private", "protected", "internal"],
            style: "c-access",
            text: word => word + " ",
            name: "method access"
        },
        {
            id: 2,
            items: ["abstract", "async", "const", "event", "extern", "new", "override", "partial", "readonly", "sealed", "static", "unsafe", "virtual", "volatile"],
            style: "c-method-modifier",
            text: word => word + " ",
            name: "method modifier"
        },
        {
            id: 3,
            items: ["params", "ref", "out"],
            style: "c-param-modifier",
            text: word => word + " ",
            name: "param modifier"
        },
        {
            id: 4,
            items: ["void", "bool", "byte", "char", "class", "decimal", "double", "enum", "float", "int", "long", "sbyte", "short", "string", "struct", "uint", "ulong", "ushort"],
            style: "c-type-buildin",
            text: word => word,
            name: "type buildin"
        }
    ]

    var mapCharacter = {
        "<": { id: 10, style: "c-character", text: word => word, name: "open generic" },
        ">": { id: 11, style: "c-character", text: word => word, name: "close generic" },
        "(": { id: 12, style: "c-character", text: word => word, name: "open param" },
        ")": { id: 13, style: "c-character", text: word => word, name: "close param" },
        "[": { id: 14, style: "c-character", text: word => word, name: "open array" },
        "]": { id: 15, style: "c-character", text: word => word, name: "close array" },
        "?": { id: 16, style: "c-character", text: word => word, name: "nullable" },
        ",": { id: 17, style: "c-character", text: word => word + " ", name: "params join" },
        "=": { id: 18, style: "c-character", text: word => " " + word + " ", name: "equal" },
        ":": { id: 19, style: "c-character", text: word => " " + word + " ", name: "colon" },
        " ": { id: 20, style: "c-character", text: word => word, name: "space" }
    }

    var mapSpecial = {
        "where": { id: 30, style: "c-special", text: word => " " + word + " ", name: "where" }
    }

    var mapOther = {
        "prop": { id: 40, style: "", text: word => " " + word, name: "property" },
        "customType": { id: 41, text: word => word, style: "c-type-custom", name: "custom type" },
        "paramName": { id: 42, text: word => " " + word, style: "c-param-name", name: "param name" },
        "methodName": { id: 43, text: word => " " + word, style: "c-method-name", name: "method name" },
    }

    function getWordTypes(line = "") {
        var wordsRgx = /\b[a-zA-Z0-9_]+\b|<|>|\[|\]|\?|\(|\)|[^a-zA-Z0-9_\s]+/g;
        var words = Array.from(line.matchAll(wordsRgx)).map(x => x[0]);
        var wordTypes = words.map(word => {
            // map group
            for (var i = 0; i < mapGroup.length; i++) {
                if (mapGroup[i].items.indexOf(word) >= 0) {
                    return {
                        type: mapGroup[i],
                        word: word
                    }
                }
            }

            // map character
            if (word.length === 1) {
                var characterType = mapCharacter[word];
                if (characterType !== undefined) {
                    return {
                        type: characterType,
                        word: word
                    }
                }
            }

            // map special
            {
                var specialType = mapSpecial[word];
                if (specialType !== undefined) {
                    return {
                        type: specialType,
                        word: word
                    }
                }
            }

            return {
                type: mapOther.customType,
                word: word
            }
        });

        fillOthers(wordTypes);

        return wordTypes;
    }

    function fillOthers(wordTypes = []) {
        for (var i = 0; i < wordTypes.length; i++) {
            switch (wordTypes[i].word) {
                case "(":
                    fillMethodName(wordTypes, i);
                    break;

                case "=":
                    wordTypes[i - 1].type = mapOther.paramName;
                    i = fillParamProp(wordTypes, i + 1);
                    break;

                case ",":
                case ")":
                    if (wordTypes[i - 1].type === mapOther.customType) {
                        wordTypes[i - 1].type = mapOther.paramName;
                    }
                    break;
            }
        }
    }

    function fillMethodName(wordTypes = [], openParamIndex) {
        var genericCount = 0;
        for (var i = openParamIndex - 1; i >= 1; i--) {
            if (genericCount === 0 && wordTypes[i].type === mapOther.customType) {
                wordTypes[i].type = mapOther.methodName;
                return;
            }
            if (wordTypes[i].type === mapCharacter[">"]) genericCount++;
            else if (wordTypes[i].type === mapCharacter["<"]) genericCount--;

            if (genericCount === 0) {
                wordTypes[i - 1].type = mapOther.methodName;
                return;
            }
        }
    }

    function fillParamProp(wordTypes = [], equalIndex) {
        for (var i = equalIndex + 1; i < wordTypes.length; i++) {
            switch (wordTypes[i].word) {
                case ",":
                case ")":
                    wordTypes[i - 1].type = mapOther.prop;
                    return i - 1;
            }
        }
    }

    function createSpan(text, textClass) {
        var span = document.createElement("span");
        span.textContent = text;
        if (textClass.length > 0) {
            span.classList.add(textClass);
        }
        return span;
    }

    function parse(line) {
        var words = getWordTypes(line);
        var elements = words.map(x => createSpan(x.type.text(x.word), x.type.style));
        return elements;
    }

    window.getMethodElements = parse;
})();