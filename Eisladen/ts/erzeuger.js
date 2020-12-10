"use strict";
var Eisdiele;
(function (Eisdiele) {
    //div für gesamten Behälterinhalt anlegen
    let containerBehaelter = document.createElement("div");
    //dem erzeugten div die Klasse "flexContainer zugewiesen"
    containerBehaelter.setAttribute("class", "flexContainerBehälter");
    //div für gesamten Behälterinhalt anlegen
    let containerEissorten = document.createElement("div");
    //dem erzeugten div die Klasse "flexContainer zugewiesen"
    containerEissorten.setAttribute("class", "flexContainerEissorten");
    //div für gesamten Behälterinhalt anlegen
    let containerTopping = document.createElement("div");
    //dem erzeugten div die Klasse "flexContainer zugewiesen"
    containerTopping.setAttribute("class", "flexContainerTopping");
    //div für gesamten Auswahlinhalt anlegen
    let containerAuswahlGesamt = document.createElement("div");
    //dem erzeugten div die Klasse "flexContainer zugewiesen"
    containerAuswahlGesamt.setAttribute("class", "flexContainerAuswahl");
    function allesErzeugen() {
        for (let i = 0; i < Eisdiele.list.length; i++) {
            //div für eine Auswahl anlegen
            let containerAuswahl = document.createElement("div");
            containerAuswahl.setAttribute("class", "auswahlContainer");
            containerAuswahl.addEventListener("click", handleClick);
            //div für bild anlgegn
            let containerBild = document.createElement("div");
            containerBild.setAttribute("class", "bildContainer");
            containerAuswahl.appendChild(containerBild);
            //Name p erstellt und als child von div containerBild gesetzt
            let auswahlName = document.createElement("p");
            auswahlName.innerHTML = Eisdiele.list[i].name;
            containerBild.appendChild(auswahlName);
            //Preis p erstellt und dem
            let auswahlPreis = document.createElement("p");
            containerAuswahl.appendChild(auswahlPreis);
            auswahlPreis.innerHTML = Eisdiele.list[i].preis.toLocaleString() + " Euro";
            // wenn das objekt aus der Liste die kategorie Behälter hat, wird alles dem ContainerBehälter zugewiesen
            if (Eisdiele.list[i].kategorie == "Behälter") {
                containerBehaelter.appendChild(containerAuswahl);
            }
            // wenn kategorie Eissorten, dann alles dem containerEissorten yuweisen
            if (Eisdiele.list[i].kategorie == "Eissorten") {
                containerEissorten.appendChild(containerAuswahl);
            }
            // wenn kategorie
            if (Eisdiele.list[i].kategorie == "Topping") {
                containerTopping.appendChild(containerAuswahl);
            }
        }
        document.getElementById("behälterContainer")?.appendChild(containerBehaelter);
        document.getElementById("behälterEissorten")?.appendChild(containerEissorten);
        document.getElementById("behälterTopping")?.appendChild(containerTopping);
    }
    Eisdiele.allesErzeugen = allesErzeugen;
    //FUnktion die aufgerufen wird, wenn auf das bild geklickt wird
    //a: Produktanzahl die momentan angezeigt wird->
    let eisAnzahl = 0;
    if (Number(localStorage.getItem("anzahl")) != 0 && localStorage.getItem("anzahl") != null) {
        eisAnzahl = Number(localStorage.getItem("anzahl"));
    }
    //Gesamtpreis
    let preisAusgabe = 0;
    if (localStorage.getItem("gesamtPreis") != null) {
        preisAusgabe = Number(localStorage.getItem("gesamtPreis"));
    }
    let anzeige = document.createElement("h4");
    if (eisAnzahl > 0) {
        anzeige.innerHTML = "Anzahl: " + eisAnzahl + " | " + "Kosten: " + preisAusgabe + " Euro";
    }
    document.getElementById("anzahl")?.appendChild(anzeige);
    for (let i = 0; i < 5; i++) {
        if (localStorage.getItem("name" + i) != null) {
            let preis = String(localStorage.getItem("preisBeimReload" + i));
            //div für bild anlgegn
            let containerBildAuwahl = document.createElement("div");
            containerBildAuwahl.setAttribute("class", "bildContainer");
            containerBildAuwahl.id = "div" + i;
            containerBildAuwahl.setAttribute("reihenfolgeNummer", "" + i);
            containerBildAuwahl.setAttribute("produktPreis", preis);
            containerBildAuwahl.addEventListener("click", entfernen);
            containerAuswahlGesamt.appendChild(containerBildAuwahl);
            //Name p erstellt und als child von div containerBild gesetzt
            let auswahlNameAuswahl = document.createElement("p");
            auswahlNameAuswahl.innerHTML = localStorage.getItem("name" + i);
            containerBildAuwahl.appendChild(auswahlNameAuswahl);
        }
    }
    function handleClick(_event) {
        let momentanesProdukt = _event.currentTarget;
        if (eisAnzahl < 5) {
            eisAnzahl++;
            let preisElement = momentanesProdukt.lastElementChild?.firstChild;
            //Damit wir bei 1 Euro das Euro wegbekommen
            let preisProdukt = preisElement.nodeValue;
            preisProdukt = preisProdukt.replace("Euro", "");
            if (localStorage.getItem("gesamtPreis") != "null") {
                preisAusgabe = Number(localStorage.getItem("gesamtPreis"));
            }
            preisAusgabe += Number(parseFloat(preisProdukt)); //für den Fall das centbeträge am eingeführt werden
            localStorage.setItem("gesamtPreis", preisAusgabe + "");
            anzeige.innerHTML = "Anzahl: " + eisAnzahl + " | " + "Kosten: " + preisAusgabe + " Euro";
            localStorage.setItem("anzahl", eisAnzahl + "");
            let platzüberprüfung = 0;
            let suche = true;
            while (platzüberprüfung < eisAnzahl && suche == true) {
                if (localStorage.getItem("name" + platzüberprüfung) != null) {
                    platzüberprüfung++;
                }
                else {
                    //div für bild anlgegn
                    let containerBildAuwahl = document.createElement("div");
                    containerBildAuwahl.setAttribute("class", "bildContainer");
                    containerBildAuwahl.id = "div" + platzüberprüfung;
                    containerBildAuwahl.setAttribute("reihenfolgeNummer", "" + platzüberprüfung);
                    containerBildAuwahl.setAttribute("produktPreis", preisProdukt + "");
                    containerAuswahlGesamt.appendChild(containerBildAuwahl);
                    containerBildAuwahl.addEventListener("click", entfernen);
                    /* localStorage.setItem("reihenfolgeNummer", "" + a); */
                    localStorage.setItem("preisBeimReload" + platzüberprüfung, preisProdukt);
                    localStorage.setItem("name" + platzüberprüfung, momentanesProdukt.firstElementChild?.firstChild?.textContent);
                    //Name p erstellt und als child von div containerBild gesetzt
                    let auswahlNameAuswahl = document.createElement("p");
                    auswahlNameAuswahl.innerHTML = localStorage.getItem("name" + platzüberprüfung);
                    containerBildAuwahl.appendChild(auswahlNameAuswahl);
                    suche = false;
                }
            }
            document.getElementById("behälterAuswahl")?.appendChild(containerAuswahlGesamt);
        }
    }
    document.getElementById("behälterAuswahl")?.appendChild(containerAuswahlGesamt);
    function entfernen(_event) {
        let löschendesProdukt = _event.currentTarget;
        let produktPreis = Number(löschendesProdukt.getAttribute("produktPreis"));
        let gesamtPreis = Number(localStorage.getItem("gesamtPreis")) - produktPreis;
        localStorage.setItem("gesamtPreis", gesamtPreis + "");
        /* let momentanerContainer: HTMLElement = <HTMLElement>_event.currentTarget; */
        let momentaneNummer = löschendesProdukt.getAttribute("reihenfolgeNummer");
        localStorage.removeItem("name" + momentaneNummer);
        localStorage.removeItem("div" + momentaneNummer);
        eisAnzahl--;
        /* console.log("Pries local storage ausgabe: " + localStorage.getItem("gesamtPreis")); */
        if (eisAnzahl > 0) {
            anzeige.innerHTML = "Anzahl: " + eisAnzahl + " | " + "Kosten: " + localStorage.getItem("gesamtPreis") + " Euro";
        }
        else {
            anzeige.innerHTML = "";
        }
        /* anzeige.innerHTML = a + ""; */
        localStorage.removeItem("anzahl");
        localStorage.setItem("anzahl", eisAnzahl + "");
        _event.currentTarget.remove();
    }
    let löschen = document.getElementById("löschen");
    löschen.addEventListener("click", allesLöschen);
    function allesLöschen(_event) {
        for (let i = 0; i <= eisAnzahl + 1; i++) {
            /* let produktLöschen: HTMLElement = <HTMLElement>_event.currentTarget; */
            let produktLöschen = document.getElementById("div" + i);
            if (produktLöschen != null) {
                produktLöschen.remove();
            }
        }
        localStorage.clear();
        eisAnzahl = 0;
        localStorage.removeItem("anzahl");
        localStorage.setItem("anzahl", eisAnzahl + "");
        anzeige.innerHTML = "";
    }
    function allesLöschen2() {
        for (let i = 0; i <= eisAnzahl + 1; i++) {
            /* let produktLöschen: HTMLElement = <HTMLElement>_event.currentTarget; */
            let produktLöschen = document.getElementById("div" + i);
            if (produktLöschen != null) {
                produktLöschen.remove();
            }
        }
        localStorage.clear();
        eisAnzahl = 0;
        localStorage.removeItem("anzahl");
        localStorage.setItem("anzahl", eisAnzahl + "");
        anzeige.innerHTML = "";
    }
    Eisdiele.allesLöschen2 = allesLöschen2;
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=erzeuger.js.map