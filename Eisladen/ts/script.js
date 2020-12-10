"use strict";
var Eisdiele;
(function (Eisdiele) {
    let formData;
    let buttonSpeichern;
    if (document.getElementById("senden") != null) {
        buttonSpeichern = document.getElementById("senden");
        buttonSpeichern.addEventListener("click", handleSpeichern);
    }
    if (document.getElementById("abrufen") != null) {
        let buttonAbrufen = document.getElementById("abrufen");
        buttonAbrufen.addEventListener("click", handleErhalten);
    }
    /* handleSpeichern();

    handleErhalten();
 */
    async function handleSpeichern() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://buckmaster.herokuapp.com";
        /* let serverURL: string = "http://localhost:8100"; */
        serverURL += "/speichern";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        for (let i = 0; i < 5; i++) {
            serverURL += "&" + "extra" + i + "=" + localStorage.getItem("name" + i);
        }
        Eisdiele.allesLöschen2();
        let formular = document.getElementById("form");
        formular.reset();
        await fetch(serverURL);
    }
    async function handleErhalten() {
        /* let serverURL: string = "http://localhost:8100"; */
        let serverURL = "https://buckmaster.herokuapp.com";
        serverURL += "/erhalten";
        let antwort = await fetch(serverURL);
        let responseString = await antwort.json();
        let bestellWerte = await JSON.parse(responseString);
        let serverAntwort = document.getElementById("containerBestellungen");
        for (let i = 0; i < bestellWerte.length; i++) {
            let bestellungDiv = document.createElement("div");
            bestellungDiv.setAttribute("class", "bestellungDiv");
            let vornameDiv = document.createElement("div");
            vornameDiv.setAttribute("class", "nameDiv");
            let nameDiv = document.createElement("div");
            nameDiv.setAttribute("class", "nameDiv");
            let adresseDiv = document.createElement("div");
            adresseDiv.setAttribute("class", "adresseDiv");
            let nachrichtDiv = document.createElement("div");
            nachrichtDiv.setAttribute("class", "nachrichtDiv");
            let artikelDiv = document.createElement("div");
            artikelDiv.setAttribute("class", "artikelDiv");
            if (bestellWerte[i].vorname != null) {
                let vorname = document.createElement("p");
                vorname.innerHTML = "Vorname: " + bestellWerte[i].vorname;
                vornameDiv.appendChild(vorname);
            }
            bestellungDiv.appendChild(vornameDiv);
            if (bestellWerte[i].nachname != null) {
                let nachname = document.createElement("p");
                nachname.innerHTML = "Nachname: " + bestellWerte[i].nachname;
                nameDiv.appendChild(nachname);
            }
            bestellungDiv.appendChild(nameDiv);
            if (bestellWerte[i].adresse != null) {
                let adresse = document.createElement("p");
                adresse.innerHTML = "Adresse: " + bestellWerte[i].adresse;
                adresseDiv.appendChild(adresse);
            }
            bestellungDiv.appendChild(adresseDiv);
            if (bestellWerte[i].nachricht != null) {
                let nachricht = document.createElement("p");
                nachricht.innerHTML = "Nachricht: " + bestellWerte[i].nachricht;
                nachrichtDiv.appendChild(nachricht);
            }
            bestellungDiv.appendChild(nachrichtDiv);
            if (bestellWerte[i].extra1 != "null") {
                let extra1 = document.createElement("p");
                extra1.innerHTML = "Extra1: " + bestellWerte[i].extra1;
                artikelDiv.appendChild(extra1);
            }
            if (bestellWerte[i].extra2 != "null") {
                let extra2 = document.createElement("p");
                extra2.innerHTML = "Extra2: " + bestellWerte[i].extra2;
                artikelDiv.appendChild(extra2);
            }
            if (bestellWerte[i].extra3 != "null") {
                let extra3 = document.createElement("p");
                extra3.innerHTML = "Extra3: " + bestellWerte[i].extra3;
                artikelDiv.appendChild(extra3);
            }
            if (bestellWerte[i].extra4 != "null") {
                let extra4 = document.createElement("p");
                extra4.innerHTML = "Extra4: " + bestellWerte[i].extra4;
                artikelDiv.appendChild(extra4);
            }
            if (bestellWerte[i].extra5 != "null") {
                let extra5 = document.createElement("p");
                extra5.innerHTML = "Extra5: " + bestellWerte[i].extra5;
                artikelDiv.appendChild(extra5);
            }
            bestellungDiv.appendChild(artikelDiv);
            let bestellungLöschen = document.createElement("button");
            bestellungLöschen.setAttribute("class", "generellButton");
            bestellungLöschen.innerHTML = "Bestellung löschen!";
            bestellungLöschen.addEventListener("click", handleLöschen);
            if (bestellWerte[i]._id != null) {
                bestellungLöschen.setAttribute("id", "" + bestellWerte[i]._id);
            }
            bestellungDiv.appendChild(bestellungLöschen);
            serverAntwort.appendChild(bestellungDiv);
        }
        /* serverAntwort.innerHTML = responseText; */
        //console.log(responseText);
    }
    async function handleLöschen(_event) {
        let momentanerButton = _event.currentTarget;
        let bestellungDivId = String(momentanerButton.getAttribute("id"));
        let id = bestellungDivId;
        /* let serverURL: string = "http://localhost:8100"; */
        let serverURL = "https://buckmaster.herokuapp.com";
        serverURL += "/deleteDocument";
        serverURL += "?" + "id=" + id;
        momentanerButton.parentElement?.remove();
        await fetch(serverURL);
    }
})(Eisdiele || (Eisdiele = {}));
//# sourceMappingURL=script.js.map