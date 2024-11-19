const output = document.getElementById("output");

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
        output.value = result;
    } catch (e) {
        output.value = "Error";
    }
}

function Back() {
    output.value = output.value.slice(0, -1);
}