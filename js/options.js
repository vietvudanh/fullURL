// map keys code to key
var keyMap = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause/break",
    20: "caps lock",
    27: "escape",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",
    37: "left arrow",
    38: "up arrow",
    39: "right arrow",
    40: "down arrow",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "left window key",
    92: "right window key",
    93: "select key",
    96: "numpad 0",
    97: "numpad 1",
    98: "numpad 2",
    99: "numpad 3",
    100: "numpad 4",
    101: "numpad 5",
    102: "numpad 6",
    103: "numpad 7",
    104: "numpad 8",
    105: "numpad 9",
    106: "multiply",
    107: "add",
    109: "subtract",
    110: "decimal point",
    111: "divide",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "num lock",
    145: "scroll lock",
    186: "semi-colon",
    187: "equal sign",
    188: "comma",
    189: "dash",
    190: "period",
    191: "forward slash",
    192: "grave accent",
    219: "open bracket",
    220: "back slash",
    221: "close braket",
    222: "single quote"
};

// check is current key press down
var isPressDown = false;
var map = {};

// keydown listener
document.addEventListener("keydown", function (evt) {
    // if current keydown
    if (!isPressDown) {
        isPressDown = true;
        map = {};
        clearText();
    }
    if (!(evt.keyCode in map) && evt.keyCode in keyMap) {
        if (map.length > 3) {
            alert("Please use combination <= 3 keys");
        } else {
            map[evt.keyCode] = true;
            setText();
        }
    }
    console.log(map);
});

// keyup listener
document.addEventListener("keyup", function (evt) {
    // if current keydown
    isPressDown = false;
});

// onclick for set btn
document.getElementById("setShortCut").addEventListener("click", function (evt) {
    if (map.lenght == 0) {
        alert('Empty shortcut!');
    } else {
        chrome.storage.sync.set({
            keys: map
        }, function () {
            document.getElementById("message").textContent = 'Shortcut saved';
            setTimeout(function () {
                clearText();
            }, 1000);
        });
    }
});

// set text for input from map
function setText() {
    clearText();
    var keys = [];
    for (key in map) {
        keys.push(keyMap[key]);
    }
    var msg = keys.join(' + ');
    document.getElementById("inputShortCut").textContent = msg;
}

// clear text
function clearText() {
    document.getElementById("message").textContent = '';
}

// restore options
function restoreOption() {
    chrome.storage.sync.get({
        keys: {}
    }, function (data) {
        map = data.keys;
        if ($.isEmptyObject(map)){
            map = {191: true};
        }
        setText();
    });
}

(function () {
    restoreOption();
})();