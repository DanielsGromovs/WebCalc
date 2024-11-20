const output = document.getElementById("output");
const historyList = document.getElementById("history-list");
let history = [];

function EqAdd(val) {
    output.value += val;
    output.scrollLeft = output.scrollWidth;
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
