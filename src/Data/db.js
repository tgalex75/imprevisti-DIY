import Dexie from "dexie";

export const  db = new Dexie("db");
db.version(2).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    rinnovi: "++id, titolo, descrizione, isImprev",
    ingaggi: "++id, titolo, descrizione, isImprev",
    mercato: "++id, titolo, descrizione, isImprev",
    speciali: "++id, titolo, descrizione, isImprev, eliminaDopoEstrazione",
    sezioniAttive: "id, nomeSezione, isVisible"
})
db.version(1).stores({
    prepartita: "++id, titolo, descrizione, isImprev, ultEstrazione",
    settimana: "++id, titolo, descrizione, isImprev",
    serienegativa: "++id, titolo, descrizione, isImprev, ultEstrazione",
    speciali: "++id, titolo, descrizione, isImprev",
})

const sezioniAttiveDefault = async () => {
  await db.sezioniAttive.bulkAdd([
    {id: 100, nomeSezione: "Prepartita", isVisible: 1},
    {id: 200, nomeSezione: "Settimana", isVisible: 1},
    {id: 300, nomeSezione: "Serie Negativa", isVisible: 1},
    {id: 400, nomeSezione: "Rinnovi", isVisible: 1},
    {id: 500, nomeSezione: "Ingaggi", isVisible: 1},
    {id: 600, nomeSezione: "Mercato", isVisible: 1},
  ])
}

sezioniAttiveDefault()