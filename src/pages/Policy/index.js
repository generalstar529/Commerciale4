import React, { Component } from "react";
import "./index.css";
import { STRINGS } from "../../utils/strings";

export default class PrivacyPolicy extends Component {
    render() {
        return (
            <div className="policy container">
                <h2 className="text-uppercase">{STRINGS.policy}</h2>
                <br />
                <p>DATI RELATIVI A AZIENDE ACQUISITI IN MODO AUTOMATICO DAL SITO </p>

                <p>
                    Il primario obiettivo del Sito è quello di fornire ai Membri uno prezioso strumento di informazione e di scambio di opinioni sulle qualità
                    dei servizi forniti dalle Aziende che si iscrivono al sito. A tal fine Commerciale4.0 raccoglie e indicizza in modo automatico alcuni dati
                    (numero di telefono; fotografie; città; codice Ateco; Indirizzi email; etc.) pubblicati sul web, consapevolmente e volontariamente, dalle
                    Aziende e già indicizzati dai principali motori di ricerca (es. Google). Si tratta dunque di dati resi manifestamente pubblici dalle Aziende
                    interessate e che, al momento della relativa raccolta e memorizzazione sul server Commerciale4.0, non riconducono a interessati
                    identificati. Tuttavia, i dati di cui sopra, per loro stessa natura, possono, attraverso elaborazioni ed associazioni con dati detenuti da
                    terzi, permettere di identificare la Azienda interessata.
                </p>

                <p>DATI FORNITI VOLONTARIAMENTE DALLE AZIENDE</p>

                <p>
                    Se una Azienda decide di registrarsi al Sito, le verrà richiesto di inserire nell’apposito form di registrazione i seguenti dati personali:
                    - nome (che sarà visibile sul Sito);
                    <br />
                    - Codice Ateco;
                    <br />
                    - Partita IVA;
                    <br />
                    - Indirizzo PEC;
                    <br />
                    - Provincia;
                    <br />
                    - indirizzo e-mail;
                    <br />
                    - password.
                    <br />
                    Se una Azienda deciderà di completare l’iscrizione al sito (inserendo tutte le informazioni richieste nel profilo), la stessa dovrà fornire
                    gli ulteriori dati personali richiesti nel form di iscrizione, quali: Logo aziendale; Foto; Descrizione della propria attività; Numero
                    dipendenti; Fatturato; Parole chiave (destianate alla ricerca della stessa); Prodotti & servizi offerti; - l’URL del proprio sito web. I
                    dati personali così raccolti saranno trattati da Commerciale4.0 per le finalità di seguito indicate.
                </p>
            </div>
        );
    }
}
