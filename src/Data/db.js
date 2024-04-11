import Dexie from "dexie";

export const  db = new Dexie("db");
db.version(1).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    rinnovi: "++id, titolo, descrizione, isImprev",
    ingaggi: "++id, titolo, descrizione, isImprev",
    mercato: "++id, titolo, descrizione, isImprev",
    speciali: "++id, titolo, descrizione, isImprev, eliminaDopoEstrazione",
})