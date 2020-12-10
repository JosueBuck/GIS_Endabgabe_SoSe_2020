//Navigation

    /* let navigation: HTMLElement = document.getElementById("navigation"); */

    let aListe: string[] = ["about.html", "news.html", "../index.html", "iceMixer.html", "kontakt.html", "bestellungen.html", "indexMitarbeiter.html"];
    let aInhaltListe: string[] = ["About Us", "News", "Ice|Ice|Baby", "Ice Mixer", "Kontakt", "Bestellungen"];

    let docTitle: string = document.title;
    let kundenAnsicht: string = "kunde";
    /* localStorage.setItem("headerAnzeige", kundenAnsicht + ""); */
    /* console.log(localStorage.getItem("headerAnzeige"));

    console.log("vor erseter if " + localStorage.getItem("headerAnzeige")); */

    if (docTitle == "HOME" || docTitle == "IceMixer") {
        kundenAnsicht = "kunde";
        console.log("true gestzt");
        localStorage.removeItem("headerAnzeige");
    } else if (docTitle == "HOME Mitarbeiter" || docTitle == "Bestellungen") {
        kundenAnsicht = "mitarbeiter";
        localStorage.setItem("headerAnzeige", kundenAnsicht + "");
        console.log("false gesetzt");

    } else {
        console.log("lul");
    }

    if (localStorage.getItem("headerAnzeige") != null) {
        kundenAnsicht = String(localStorage.getItem("headerAnzeige"));
        console.log("lel" + localStorage.getItem("headerAnzeige"));
    }

    /* if (kundenAnsicht == localStorage.getItem("headerAnzeige")) {
        console.log("fuuuuck");
    } */

    
    console.log(docTitle);


    let unsortedList: HTMLElement = document.createElement("ul");

    for (let i: number = 0; i < 5; i++) {
        let listItem: HTMLElement = document.createElement("li");
        if (kundenAnsicht == "kunde") {
            let anker: HTMLElement = document.createElement("a");
            anker.setAttribute("class", "a" + i);
            if (i == 2) {
                listItem.setAttribute("id", "liEntfernen");
            }
            anker.setAttribute("href", aListe[i]);
            anker.innerHTML = aInhaltListe[i];
            listItem.appendChild(anker);
            console.log("is true");
        }
        else {
            let anker: HTMLElement = document.createElement("a");
            anker.setAttribute("class", "a" + i);
            if (i == 2) {
                anker.setAttribute("href", aListe[i + 4]);
                anker.innerHTML = aInhaltListe[i];
                listItem.setAttribute("id", "liEntfernen");
            }
            else if (i == 3) {
                anker.setAttribute("href", aListe[i + 2]);
                anker.innerHTML = aInhaltListe[i + 2];
            }
            else {
                anker.setAttribute("href", aListe[i]);
                anker.innerHTML = aInhaltListe[i];
            }


            listItem.appendChild(anker);
        }


        unsortedList.appendChild(listItem);
    }

    document.getElementById("navigation")?.appendChild(unsortedList);



