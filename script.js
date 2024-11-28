const output = document.getElementById("output");
const historyList = document.getElementById("history-list");
let history = [];

const keyMap = {
    "Backspace": "back", "Delete": "clear", "c": "clear", "C": "clear", 
    "Enter": "=", "=": "="
};


function EqAdd(val) {
    const operators = "+-*/.^";
    const lastChar = output.value.charAt(output.value.length - 1);
    if (!(operators.includes(lastChar) && operators.includes(val))) {
        output.value += val;
        output.scrollLeft = output.scrollWidth;
    }
}


function Clear() {
    output.value = '';
}

function Solve() {
    try {
        let expression = output.value
            .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)')
            .replace(/\^/g, '**');
        const result = eval(expression);
        const historyEntry = `${output.value} = ${result}`;
        history.push(historyEntry);
        output.value = result;
        updateHistory();
    } catch (e) {
        output.value = "Error";
    }
}

function Back() {
    output.value = output.value.slice(0, -1);
}

function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    history = [];
    updateHistory();
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || "+-*/.^".includes(key)) {
        EqAdd(key); // Directly add numeric and operator keys
    } else if (key in keyMap) {
        const action = keyMap[key];
        if (action === "clear") {
            Clear();
        } else if (action === "back") {
            Back();
        } else if (action === "=") {
            Solve();
        }
    }
});
