var faktorialis = (n) => {
    let sum = 1;
    for (var i = 0; i < n; i++) {
        sum = sum * (i + 1);

    } return sum;
}
var go = function () {
    let hova = document.getElementById("ide");
    hova.innerHTML = "";
    let parameter = document.getElementById("p").value
    var mellette = 1;

    for (var s = 0; s <= parameter; s++) {

        console.log("fut");
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor)

        for (var o = 0; o <= s; o++) {
            let szám = document.createElement("div")
            szám.classList.add("doboz");
            sor.appendChild(szám)
            szám.innerText = faktorialis(s) / (faktorialis(o) * faktorialis(s - o))
            mellette = szám.innerText;
            szám.style.color = rgb(${ 255 / 10 * s},0,${255 / 10 * s }

        }
    }

}