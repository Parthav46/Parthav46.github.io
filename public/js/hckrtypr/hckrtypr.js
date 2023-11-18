import { code } from './fakecode.js';

let deny_count = 0;
let grant_count = 0;

const modal = document.getElementById("modal");
const accessBox = document.getElementById("access");

function granted() {
    modal.classList.add("visible");
    accessBox.classList.add("granted");
    accessBox.classList.remove("denied");
    accessBox.innerText = "Access Granted";
}

function denied() {
    modal.classList.add("visible");
    accessBox.classList.add("denied");
    accessBox.classList.remove("granted");
    accessBox.innerText = "Access Denied";
}

function clearLabels() {
    modal.classList.remove("visible");
}

function main() {
    window.addEventListener("keydown", (ev) => {
        let c = document.getElementById("console");
        c.focus();
        let k = ev.key;
        console.log(k);
        switch(k) {
            case 'F1':
                ev.preventDefault();
                alert("Press Ctrl 3 Times -> Access Denied\nPress Tab 3 Times -> Access Granted");
                return;
            case 'Control':
                ev.preventDefault();
                deny_count ++;
                grant_count = 0;
                if(deny_count >= 3) {
                    deny_count = 0;
                    denied();
                }
                return;
            case 'Tab':
                ev.preventDefault();
                grant_count ++;
                deny_count = 0;
                if(grant_count >= 3) {
                    grant_count = 0;
                    granted();
                }
                return;
            case 'Escape':
                ev.preventDefault();
                grant_count = 0;
                deny_count = 0;
                clearLabels();
                return
            case 'F5':
            case 'Backspace':
                return;
            default:
                ev.preventDefault();
        }
        c.value = code.substring(0, c.value.length + 4);
        c.scrollTop = c.scrollHeight;
    });
}

main();
