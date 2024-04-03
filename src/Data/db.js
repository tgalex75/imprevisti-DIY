import Dexie from "dexie";

export const  db = new Dexie("db");
db.version(1).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    speciali: "++id, titolo, descrizione, isImprev",
})