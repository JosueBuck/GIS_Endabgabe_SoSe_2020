namespace Eisdiele {

    interface BestellungWerte {
        _id: string;
        vorname: string;
        nachname: string;
        adresse: string;
        nachricht: string;
        extra1: string;
        extra2: string;
        extra3: string;
        extra4: string;
        extra5: string;
    }

    let formData: FormData;
    let buttonSpeichern: HTMLButtonElement;

    if (document.getElementById("senden") != null) {
        buttonSpeichern = <HTMLButtonElement>document.getElementById("senden");
        buttonSpeichern.addEventListener("click", handleSpeichern);
        
    }


    if (document.getElementById("abrufen") != null) {
        let buttonAbrufen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("abrufen");
        buttonAbrufen.addEventListener("click", handleErhalten);
    }


    /* handleSpeichern();

    handleErhalten();
 */



    async function handleSpeichern(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://buckmaster.herokuapp.com";
        
        /* let serverURL: string = "http://localhost:8100"; */
        serverURL += "/speichern";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();


        for (let i: number = 0; i < 5; i++) {
            serverURL += "&" + "extra" + i + "=" + localStorage.getItem("name" + i);      
        }

        allesLöschen2();

        let formular: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
        formular.reset();
        
        await fetch(serverURL);
    }

    async function handleErhalten(): Promise<void> {
        /* let serverURL: string = "http://localhost:8100"; */
        let serverURL: string = "https://buckmaster.herokuapp.com";
        serverURL += "/erhalten";

        let antwort: Response = await fetch(serverURL);
        let responseString: string = await antwort.json();
        let bestellWerte: BestellungWerte[] = await JSON.parse(responseString);

        let serverAntwort: HTMLElement = <HTMLElement>document.getElementById("containerBestellungen");
        for (let i: number = 0; i < bestellWerte.length; i++) {

            let bestellungDiv: HTMLElement = document.createElement("div");
            bestellungDiv.setAttribute("class", "bestellungDiv");

            let vornameDiv: HTMLElement = document.createElement("div");
            vornameDiv.setAttribute("class", "nameDiv");

            let nameDiv: HTMLElement = document.createElement("div");
            nameDiv.setAttribute("class", "nameDiv");

            let adresseDiv: HTMLElement = document.createElement("div");
            adresseDiv.setAttribute("class", "adresseDiv");

            let nachrichtDiv: HTMLElement = document.createElement("div");
            nachrichtDiv.setAttribute("class", "nachrichtDiv");

            let artikelDiv: HTMLElement = document.createElement("div");
            artikelDiv.setAttribute("class", "artikelDiv");

            

            

            if (bestellWerte[i].vorname != null) {
                let vorname: HTMLElement = document.createElement("p");
                vorname.innerHTML = "Vorname: " + bestellWerte[i].vorname;
                vornameDiv.appendChild(vorname);
            }

            bestellungDiv.appendChild(vornameDiv);
            
            if (bestellWerte[i].nachname != null) {
                let nachname: HTMLElement = document.createElement("p");
                nachname.innerHTML = "Nachname: " + bestellWerte[i].nachname;
                nameDiv.appendChild(nachname);
            }

            bestellungDiv.appendChild(nameDiv);
            
            if (bestellWerte[i].adresse != null) {
            let adresse: HTMLElement = document.createElement("p");
            adresse.innerHTML = "Adresse: " + bestellWerte[i].adresse;
            adresseDiv.appendChild(adresse);
            }

            bestellungDiv.appendChild(adresseDiv);

            if (bestellWerte[i].nachricht != null) {
                let nachricht: HTMLElement = document.createElement("p");
                nachricht.innerHTML = "Nachricht: " + bestellWerte[i].nachricht;
                nachrichtDiv.appendChild(nachricht);
            }

            bestellungDiv.appendChild(nachrichtDiv);

            if (bestellWerte[i].extra1 != "null") {
                let extra1: HTMLElement = document.createElement("p");
                extra1.innerHTML = "Extra1: " + bestellWerte[i].extra1;
                artikelDiv.appendChild(extra1);
            }
            
            if (bestellWerte[i].extra2 != "null") {
                let extra2: HTMLElement = document.createElement("p");
                extra2.innerHTML = "Extra2: " + bestellWerte[i].extra2;
                artikelDiv.appendChild(extra2);
            }

            if (bestellWerte[i].extra3 != "null") {
                let extra3: HTMLElement = document.createElement("p");
                extra3.innerHTML = "Extra3: " + bestellWerte[i].extra3;
                artikelDiv.appendChild(extra3);
            }
            
            if (bestellWerte[i].extra4 != "null") {
                let extra4: HTMLElement = document.createElement("p");
                extra4.innerHTML = "Extra4: " + bestellWerte[i].extra4;
                artikelDiv.appendChild(extra4);
            }
            
            if (bestellWerte[i].extra5 != "null") {
                let extra5: HTMLElement = document.createElement("p");
                extra5.innerHTML = "Extra5: " + bestellWerte[i].extra5;
                artikelDiv.appendChild(extra5);
            }

            
            bestellungDiv.appendChild(artikelDiv);

            let bestellungLöschen: HTMLButtonElement = document.createElement("button");
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

    async function handleLöschen(_event: Event): Promise<void> {
        
        let momentanerButton: HTMLElement = <HTMLElement>_event.currentTarget;

        let bestellungDivId: string = String(momentanerButton.getAttribute("id"));
        
        let id: string = bestellungDivId;

        /* let serverURL: string = "http://localhost:8100"; */
        let serverURL: string = "https://buckmaster.herokuapp.com";
        serverURL += "/deleteDocument";
        serverURL += "?" + "id=" + id;

        momentanerButton.parentElement?.remove();

        await fetch(serverURL);
    }


    
}