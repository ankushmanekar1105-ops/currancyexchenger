const URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropedown select")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")

const butt = document.querySelector('form button')
const result = document.querySelector(".msg")

for (let select of dropdowns) {
    for (const currcode in countryList) {
        let addoption = document.createElement('Option')
        addoption.innerHTML = currcode;
        addoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            addoption.selected = "selected"
        }
        else if (select.name === "to" && currcode === "INR") {
            addoption.selected = "selected"
        }
        select.append(addoption)
    }
    select.addEventListener("change", (e) => {
        upflage(e.target);
    })
};

const convertcurr = async () => {
    const input = document.querySelector(".amount input")
    const intval = input.value
    if (intval === "" || intval < 0) {
        intval = 1
        input.value = "1";
    }
    const from = fromcurr.value.toLowerCase();
    const to = tocurr.value.toLowerCase();
    // const input = amountInput.value;

    const res = await fetch(`${URL}/${from}.json`);
    const data = await res.json();

    const rate = data[from][to];


    let finalexchange = rate * intval
    result.textContent = `${intval} ${fromcurr.value} = ${finalexchange} ${tocurr.value}`

}


butt.addEventListener("click", (e) => {
    e.preventDefault()
    convertcurr()
})

const upflage = (element) => {
    let curcode = element.value
    let countrycode = countryList[curcode]
    let upsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let newi = element.parentElement.querySelector("img");
    newi.src = upsrc
}