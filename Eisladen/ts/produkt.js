"use strict";
var Eisdiele;
(function (Eisdiele) {
    articelJson("../ts/data.json");
    async function articelJson(_url) {
        let response = await fetch(_url);
        let responseJson = await response.json();
        Eisdiele.list = await JSON.parse(JSON.stringify(responseJson));
        Eisdiele.allesErzeugen();
    }
    /* let a1: Auswahl = {kategorie: "Behälter", name: "Waffel", preis: 0};
    let a2: Auswahl = {kategorie: "Behälter", name: "Becher", preis: 0};

    let a3: Auswahl = {kategorie: "Eissorten", name: "Schoko", preis: 1};
    let a4: Auswahl = {kategorie: "Eissorten", name: "Vanille", preis: 1};
    let a5: Auswahl = {kategorie: "Eissorten", name: "Erdbeere", preis: 1};
    let a6: Auswahl = {kategorie: "Eissorten", name: "Nuss", preis: 1};
    let a7: Auswahl = {kategorie: "Eissorten", name: "Kirsche", preis: 1};
    let a8: Auswahl = {kategorie: "Eissorten", name: "Mango", preis: 1};
    let a9: Auswahl = {kategorie: "Eissorten", name: "Cookie", preis: 1};
    let a10: Auswahl = {kategorie: "Eissorten", name: "Melone", preis: 1};

    let a11: Auswahl = {kategorie: "Topping", name: "Streusel", preis: 1};
    let a12: Auswahl = {kategorie: "Topping", name: "Sahne", preis: 1};
    let a13: Auswahl = {kategorie: "Topping", name: "Suprise", preis: 1};

    export let list: Auswahl[] = [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13]; */
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=produkt.js.map