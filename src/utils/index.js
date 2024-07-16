import crypto from "crypto";
import { STRINGS } from "./strings";

export const SESSION_ADMIN = "admin";
export const SESSION_LOGGED_COMPANY = "loggedCompany";
export const SESSION_SELECTED_COMPANY = "selectedCompany";
export const SESSION_FILTER = "filter";
export const SESSION_LANG = "lang";
export const SESSION_LOCAION_ERROR = "locationError";

export const ORDERS = () => {
    return [
        {
            id: 0,
            title: STRINGS.relevance,
            icon: "sort-amount-desc",
        },
        {
            id: 1,
            title: `↑ ${STRINGS.revenues}`,
            icon: null,
        },
        {
            id: 2,
            title: `↓ ${STRINGS.revenues}`,
            icon: null,
        },
        {
            id: 3,
            title: `↑ ${STRINGS.employees}`,
            icon: null,
        },
        {
            id: 4,
            title: `↓ ${STRINGS.employees}`,
            icon: null,
        },
        // {
        //     id: 5,
        //     title: `↑ ${STRINGS.nearest}`,
        //     icon: null,
        // },
        // {
        //     id: 6,
        //     title: `↓ ${STRINGS.farthest}`,
        //     icon: null,
        // },
    ];
};

export const COMPANY_TYPES = () => {
    return [
        {
            value: 1,
            label: STRINGS.productProvider,
        },
        {
            value: 2,
            label: STRINGS.serviceProvider,
        },
        {
            value: 3,
            label: STRINGS.productServiceProvider,
        },
    ];
};

export const ISO = [
    {
        value: 1,
        label: "9001: 2015",
    },
    {
        value: 2,
        label: "9001: 2015 – RT21",
    },
    {
        value: 3,
        label: "15358: 2011",
    },
    {
        value: 4,
        label: "45001: 2018",
    },
    {
        value: 5,
        label: "18001: 2007",
    },
    {
        value: 6,
        label: "3834: 2006",
    },
];

export const N_EMPOYEES = () => {
    return [
        {
            value: 1,
            label: "3",
        },
        {
            value: 2,
            label: "8",
        },
        {
            value: 3,
            label: "15",
        },
        {
            value: 4,
            label: "30",
        },
        {
            value: 5,
            label: "50",
        },
        {
            value: 6,
            label: "80",
        },
        {
            value: 7,
            label: "120",
        },
        {
            value: 8,
            label: "200",
        },
        {
            value: 9,
            label: "400",
        },
        {
            value: 10,
            label: "1000",
        },
        {
            value: 11,
            label: "3000",
        },
        {
            value: 12,
            label: "10000",
        },
    ];
};

export const REVENUES = () => {
    return [
        {
            value: 1,
            label: "0",
        },
        {
            value: 2,
            label: `500${STRINGS.k}`,
        },
        {
            value: 3,
            label: `1${STRINGS.m}`,
        },
        {
            value: 4,
            label: `2${STRINGS.m}`,
        },
        {
            value: 5,
            label: `4${STRINGS.m}`,
        },
        {
            value: 6,
            label: `8${STRINGS.m}`,
        },
        {
            value: 7,
            label: `15${STRINGS.m}`,
        },
        {
            value: 8,
            label: `30${STRINGS.m}`,
        },
        {
            value: 9,
            label: `60${STRINGS.m}`,
        },
        {
            value: 10,
            label: `100${STRINGS.m}`,
        },
        {
            value: 11,
            label: `150${STRINGS.m}`,
        },
        {
            value: 12,
            label: `300${STRINGS.m}`,
        },
    ];
};

// export const ATECO_CODES = () => {
//     return [
//         { value: 0, label: STRINGS.otherCode },
//         { value: 1, label: "22.1" },
//         { value: 2, label: "22.2" },
//         { value: 3, label: "24.1" },
//         { value: 4, label: "24.2" },
//         { value: 5, label: "24.31" },
//         { value: 6, label: "24.32" },
//         { value: 7, label: "24.33" },
//         { value: 8, label: "24.34" },
//         { value: 9, label: "24.41" },
//         { value: 10, label: "24.42" },
//         { value: 11, label: "24.43" },
//         { value: 12, label: "24.44" },
//         { value: 13, label: "24.45" },
//         { value: 14, label: "24.51" },
//         { value: 15, label: "24.52" },
//         { value: 16, label: "24.53" },
//         { value: 17, label: "24.54" },
//         { value: 18, label: "25.11" },
//         { value: 19, label: "25.12.1" },
//         { value: 20, label: "25.21" },
//         { value: 21, label: "25.29" },
//         { value: 22, label: "25.3" },
//         { value: 23, label: "25.5" },
//         { value: 24, label: "25.61" },
//         { value: 25, label: "25.62" },
//         { value: 26, label: "25.7" },
//         { value: 27, label: "25.9" },
//         { value: 28, label: "26.12" },
//         { value: 29, label: "26.2" },
//         { value: 30, label: "26.30.1" },
//         { value: 31, label: "26.51.10" },
//         { value: 32, label: "26.52" },
//         { value: 33, label: "26.70.11" },
//         { value: 34, label: "28 (tutti/all)" },
//         { value: 35, label: "29.1" },
//         { value: 36, label: "29.2" },
//         { value: 37, label: "29.3" },
//         { value: 38, label: "33.11" },
//         { value: 39, label: "33.2" },
//         { value: 40, label: "46.61" },
//         { value: 41, label: "46.62" },
//         { value: 42, label: "46.63" },
//         { value: 43, label: "46.64" },
//         { value: 44, label: "46.69.20" },
//         { value: 45, label: "46.69.91" },
//         { value: 46, label: "46.69.94" },
//         { value: 47, label: "46.69.99" },
//     ];
// };

export const REGIONS = [
    {
        value: 1,
        label: "Abruzzo",
        cities: ["AQ", "CH", "PE", "TE"],
    },
    {
        value: 2,
        label: "Basilicata",
        cities: ["MT", "PZ"],
    },
    {
        value: 3,
        label: "Calabria",
        cities: ["CZ", "CS", "KR", "RC", "VV"],
    },
    {
        value: 4,
        label: "Campania",
        cities: ["AV", "BN", "CE", "NA", "SA"],
    },
    {
        value: 5,
        label: "Emilia Romagna",
        cities: ["BO", "FE", "FC", "MO", "PR", "RE", "RN"],
    },
    {
        value: 6,
        label: "Friuli-Venezia Giulia",
        cities: ["GO", "PN", "TS", "UD"],
    },
    {
        value: 7,
        label: "Lazio",
        cities: ["FR", "LT", "RI", "Roma", "VT"],
    },
    {
        value: 8,
        label: "Liguria",
        cities: ["GE", "IM", "SP", "SV"],
    },
    {
        value: 9,
        label: "Lombardia",
        cities: ["BG", "BS", "CO", "CR", "LC", "LO", "MN", "MI", "MB", "PV", "SO", "VA"],
    },
    {
        value: 10,
        label: "Marche",
        cities: ["AN", "AP", "FM", "MC", "PU"],
    },
    {
        value: 11,
        label: "Molise",
        cities: ["CB", "IS"],
    },
    {
        value: 12,
        label: "Piemonte",
        cities: ["AL", "AT", "BI", "CN", "NO", "TO", "VB", "VC"],
    },
    {
        value: 13,
        label: "Puglia",
        cities: ["BA", "BT", "BR", "FG", "LE", "TA"],
    },
    {
        value: 14,
        label: "Sardegna",
        cities: ["CA", "CI", "VS", "NU", "OG", "OT", "OR", "SS"],
    },
    {
        value: 15,
        label: "Sicilia",
        cities: ["AG", "CL", "CT", "EN", "ME", "PA", "RG", "SR", "TP", "TP"],
    },
    {
        value: 16,
        label: "Toscana",
        cities: ["AR", "FI", "GR", "LI", "LU", "MS", "PI", "PT", "PO", "SI"],
    },
    {
        value: 17,
        label: "Trentino-Alto Adige",
        cities: ["BZ", "TN"],
    },
    {
        value: 18,
        label: "Umbria",
        cities: ["PG", "TR"],
    },
    {
        value: 19,
        label: "Valle d'Aosta",
        cities: ["AO"],
    },
    {
        value: 20,
        label: "Veneto",
        cities: ["BL", "PD", "RO", "TV", "VE", "VR", "VI"],
    },
];
// export const REGIONS = [
//     { value: 1, label: "Abruzzo", cities: ["(AQ)", "(CH)", "(PE)", "(TE)"] },
//     { value: 2, label: "Basilicata", cities: ["(MT)", "(PZ)"] },
//     { value: 3, label: "Calabria", cities: ["(CZ)", "(CS)", "(KR)", "(RC)", "(VV)"] },
//     { value: 4, label: "Campania", cities: ["(AV)", "(BN)", "(CE)", "(NA)", "(SA)"] },
//     { value: 5, label: "Emilia Romagna", cities: ["(BO)", "(FE)", "(FC)", "(MO)", "(PR)", "(RE)", "(RN)"] },
//     { value: 6, label: "Friuli-Venezia Giulia", cities: ["(GO)", "(PN)", "(TS)", "(UD)"] },
//     { value: 7, label: "Lazio", cities: ["(FR)", "(LT)", "(RI)", "(Roma)", "(VT)"] },
//     { value: 8, label: "Liguria", cities: ["(GE)", "(IM)", "(SP)", "(SV)"] },
//     { value: 9, label: "Lombardia", cities: ["(BG)", "(BS)", "(CO)", "(CR)", "(LC)", "(LO)", "(MN)", "(MI)", "(MB)", "(PV)", "(SO)", "(VA)"] },
//     { value: 10, label: "Marche", cities: ["(AN)", "(AP)", "(FM)", "(MC)", "(PU)"] },
//     { value: 11, label: "Molise", cities: ["(CB)", "(IS)"] },
//     { value: 12, label: "Piemonte", cities: ["(AL)", "(AT)", "(BI)", "(CN)", "(NO)", "(TO)", "(VB)", "(VC)"] },
//     { value: 13, label: "Puglia", cities: ["(BA)", "(BT)", "(BR)", "(FG)", "(LE)", "(TA)"] },
//     { value: 14, label: "Sardegna", cities: ["(CA)", "(CI)", "(VS)", "(NU)", "(OG)", "(OT)", "(OR)", "(SS)"] },
//     { value: 15, label: "Sicilia", cities: ["(AG)", "(CL)", "(CT)", "(EN)", "(ME)", "(PA)", "(RG)", "(SR)", "(TP)", "(TP)"] },
//     { value: 16, label: "Toscana", cities: ["(AR)", "(FI)", "(GR)", "(LI)", "(LU)", "(MS)", "(PI)", "(PT)", "(PO)", "(SI)"] },
//     { value: 17, label: "Trentino-Alto Adige", cities: ["(BZ)", "(TN)"] },
//     { value: 18, label: "Umbria", cities: ["(PG)", "(TR)"] },
//     { value: 19, label: "Valle d'Aosta", cities: ["(AO)"] },
//     { value: 20, label: "Veneto", cities: ["(BL)", "(PD)", "(RO)", "(TV)", "(VE)", "(VR)", "(VI)"] },
// ];

export const CITIES = [
    {
        value: 1,
        label: "L'Aquila",
        short: "AQ",
        region: 1,
    },
    {
        value: 2,
        label: "Chieti",
        short: "CH",
        region: 1,
    },
    {
        value: 3,
        label: "Pescara",
        short: "PE",
        region: 1,
    },
    {
        value: 4,
        label: "Teramo",
        short: "TE",
        region: 1,
    },
    {
        value: 5,
        label: "Matera",
        short: "MT",
        region: 2,
    },
    {
        value: 6,
        label: "Potenza",
        short: "PZ",
        region: 2,
    },
    {
        value: 7,
        label: "Catanzaro",
        short: "CZ",
        region: 3,
    },
    {
        value: 8,
        label: "Cosenza",
        short: "CS",
        region: 3,
    },
    {
        value: 9,
        label: "Crotone",
        short: "KR",
        region: 3,
    },
    {
        value: 10,
        label: "Reggio-Calabria",
        short: "RC",
        region: 3,
    },
    {
        value: 11,
        label: "Vibo-Valentia",
        short: "VV",
        region: 3,
    },
    {
        value: 12,
        label: "Avellino",
        short: "AV",
        region: 4,
    },
    {
        value: 13,
        label: "Benevento",
        short: "BN",
        region: 4,
    },
    {
        value: 14,
        label: "Caserta",
        short: "CE",
        region: 4,
    },
    {
        value: 15,
        label: "Napoli",
        short: "NA",
        region: 4,
    },
    {
        value: 16,
        label: "Salerno",
        short: "SA",
        region: 4,
    },
    {
        value: 17,
        label: "Bologna",
        short: "BO",
        region: 5,
    },
    {
        value: 18,
        label: "Ferrara",
        short: "FE",
        region: 5,
    },
    {
        value: 19,
        label: "Forli-Cesena",
        short: "FC",
        region: 5,
    },
    {
        value: 20,
        label: "Modena",
        short: "MO",
        region: 5,
    },
    {
        value: 21,
        label: "Parma",
        short: "PR",
        region: 5,
    },
    {
        value: 22,
        label: "Piacenza",
        short: "PC",
        region: 5,
    },
    {
        value: 23,
        label: "Ravenna",
        short: "RA",
        region: 5,
    },
    {
        value: 24,
        label: "Reggio-Emilia",
        short: "RE",
        region: 5,
    },
    {
        value: 25,
        label: "Rimini",
        short: "RN",
        region: 5,
    },
    {
        value: 26,
        label: "Gorizia",
        short: "GO",
        region: 6,
    },
    {
        value: 27,
        label: "Pordenone",
        short: "PN",
        region: 6,
    },
    {
        value: 28,
        label: "Trieste",
        short: "TS",
        region: 6,
    },
    {
        value: 29,
        label: "Udine",
        short: "UD",
        region: 6,
    },
    {
        value: 30,
        label: "Frosinone",
        short: "FR",
        region: 7,
    },
    {
        value: 31,
        label: "Latina",
        short: "LT",
        region: 7,
    },
    {
        value: 32,
        label: "Rieti",
        short: "RI",
        region: 7,
    },
    {
        value: 33,
        label: "Roma",
        short: "Roma",
        region: 7,
    },
    {
        value: 34,
        label: "Viterbo",
        short: "VT",
        region: 7,
    },
    {
        value: 35,
        label: "Genova",
        short: "GE",
        region: 8,
    },
    {
        value: 36,
        label: "Imperia",
        short: "IM",
        region: 8,
    },
    {
        value: 37,
        label: "La-Spezia",
        short: "SP",
        region: 8,
    },
    {
        value: 38,
        label: "Savona",
        short: "SV",
        region: 8,
    },
    {
        value: 39,
        label: "Bergamo",
        short: "BG",
        region: 9,
    },
    {
        value: 40,
        label: "Brescia",
        short: "BS",
        region: 9,
    },
    {
        value: 41,
        label: "Como",
        short: "CO",
        region: 9,
    },
    {
        value: 42,
        label: "Cremona",
        short: "CR",
        region: 9,
    },
    {
        value: 43,
        label: "Lecco",
        short: "LC",
        region: 9,
    },
    {
        value: 44,
        label: "Lodi",
        short: "LO",
        region: 9,
    },
    {
        value: 45,
        label: "Mantova",
        short: "MN",
        region: 9,
    },
    {
        value: 46,
        label: "Milano",
        short: "MI",
        region: 9,
    },
    {
        value: 47,
        label: "Monza-Brianza",
        short: "MB",
        region: 9,
    },
    {
        value: 48,
        label: "Pavia",
        short: "PV",
        region: 9,
    },
    {
        value: 49,
        label: "Sondrio",
        short: "SO",
        region: 9,
    },
    {
        value: 50,
        label: "Varese",
        short: "VA",
        region: 9,
    },
    {
        value: 51,
        label: "Ancona",
        short: "AN",
        region: 10,
    },
    {
        value: 52,
        label: "Ascoli-Piceno",
        short: "AP",
        region: 10,
    },
    {
        value: 53,
        label: "Fermo",
        short: "FM",
        region: 10,
    },
    {
        value: 54,
        label: "Macerata",
        short: "MC",
        region: 10,
    },
    {
        value: 55,
        label: "Pesaro-Urbino",
        short: "PU",
        region: 10,
    },
    {
        value: 56,
        label: "Campobasso",
        short: "CB",
        region: 11,
    },
    {
        value: 57,
        label: "Isernia",
        short: "IS",
        region: 11,
    },
    {
        value: 58,
        label: "Alessandria",
        short: "AL",
        region: 12,
    },
    {
        value: 59,
        label: "Asti",
        short: "AT",
        region: 12,
    },
    {
        value: 60,
        label: "Biella",
        short: "BI",
        region: 12,
    },
    {
        value: 61,
        label: "Cuneo",
        short: "CN",
        region: 12,
    },
    {
        value: 62,
        label: "Novara",
        short: "NO",
        region: 12,
    },
    {
        value: 63,
        label: "Torino",
        short: "TO",
        region: 12,
    },
    {
        value: 64,
        label: "Verbania",
        short: "VB",
        region: 12,
    },
    {
        value: 65,
        label: "Vercelli",
        short: "VC",
        region: 12,
    },
    {
        value: 66,
        label: "Bari",
        short: "BA",
        region: 13,
    },
    {
        value: 67,
        label: "Barletta-Andria-Trani",
        short: "BT",
        region: 13,
    },
    {
        value: 68,
        label: "Brindisi",
        short: "BR",
        region: 13,
    },
    {
        value: 69,
        label: "Foggia",
        short: "FG",
        region: 13,
    },
    {
        value: 70,
        label: "Lecce",
        short: "LE",
        region: 13,
    },
    {
        value: 71,
        label: "Taranto",
        short: "TA",
        region: 13,
    },
    {
        value: 72,
        label: "Cagliari",
        short: "CA",
        region: 14,
    },
    {
        value: 73,
        label: "Carbonia Iglesias",
        short: "CI",
        region: 14,
    },
    {
        value: 74,
        label: "Medio Campidano",
        short: "VS",
        region: 14,
    },
    {
        value: 75,
        label: "Nuoro",
        short: "NU",
        region: 14,
    },
    {
        value: 76,
        label: "Ogliastra",
        short: "OG",
        region: 14,
    },
    {
        value: 77,
        label: "Olbia Tempio",
        short: "OT",
        region: 14,
    },
    {
        value: 78,
        label: "Oristano",
        short: "OR",
        region: 14,
    },
    {
        value: 79,
        label: "Sassari",
        short: "SS",
        region: 14,
    },
    {
        value: 80,
        label: "Agrigento",
        short: "AG",
        region: 15,
    },
    {
        value: 81,
        label: "Caltanissetta",
        short: "CL",
        region: 15,
    },
    {
        value: 82,
        label: "Catania",
        short: "CT",
        region: 15,
    },
    {
        value: 83,
        label: "Enna",
        short: "EN",
        region: 15,
    },
    {
        value: 84,
        label: "Messina",
        short: "ME",
        region: 15,
    },
    {
        value: 85,
        label: "Palermo",
        short: "PA",
        region: 15,
    },
    {
        value: 86,
        label: "Ragusa",
        short: "RG",
        region: 15,
    },
    {
        value: 87,
        label: "Siracusa",
        short: "SR",
        region: 15,
    },
    {
        value: 88,
        label: "Trapani",
        short: "TP",
        region: 15,
    },
    {
        value: 89,
        label: "Arezzo",
        short: "AR",
        region: 16,
    },
    {
        value: 90,
        label: "Firenze",
        short: "FI",
        region: 16,
    },
    {
        value: 91,
        label: "Grosseto",
        short: "GR",
        region: 16,
    },
    {
        value: 92,
        label: "Livorno",
        short: "LI",
        region: 16,
    },
    {
        value: 93,
        label: "Lucca",
        short: "LU",
        region: 16,
    },
    {
        value: 94,
        label: "Massa-Carrara",
        short: "MS",
        region: 16,
    },
    {
        value: 95,
        label: "Pisa",
        short: "PI",
        region: 16,
    },
    {
        value: 96,
        label: "Pistoia",
        short: "PT",
        region: 16,
    },
    {
        value: 97,
        label: "Prato",
        short: "PO",
        region: 16,
    },
    {
        value: 98,
        label: "Siena",
        short: "SI",
        region: 16,
    },
    {
        value: 99,
        label: "Bolzano",
        short: "BZ",
        region: 17,
    },
    {
        value: 100,
        label: "Trento",
        short: "TN",
        region: 17,
    },
    {
        value: 101,
        label: "Perugia",
        short: "PG",
        region: 18,
    },
    {
        value: 102,
        label: "Terni",
        short: "TR",
        region: 18,
    },
    {
        value: 103,
        label: "Aosta",
        short: "AO",
        region: 19,
    },
    {
        value: 104,
        label: "Belluno",
        short: "BL",
        region: 20,
    },
    {
        value: 105,
        label: "Padova",
        short: "PD",
        region: 20,
    },
    {
        value: 106,
        label: "Rovigo",
        short: "RO",
        region: 20,
    },
    {
        value: 107,
        label: "Treviso",
        short: "TV",
        region: 20,
    },
    {
        value: 108,
        label: "Venezia",
        short: "VE",
        region: 20,
    },
    {
        value: 109,
        label: "Verona",
        short: "VR",
        region: 20,
    },
    {
        value: 110,
        label: "Vicenza",
        short: "VI",
        region: 20,
    },
];

export const getAtecoStringWithCode = (code) => {
    let atecoList = STRINGS.atecoList;
    let matchedArray = atecoList.filter((ateco) => ateco.value === code);
    if (!matchedArray || !matchedArray.length) {
        return "";
    }
    return matchedArray[0].label;
};

// export const citiesInRegion = (regionId) => {
//     let cities = CITIES.map(city => city.region === regionId)
//     let cities = [];
//     console.log(regionId)
//     for (let i in CITIES) {
//         if (regionId === CITIES[i].region) {
//             cities.push(CITIES[i]);
//         }
//     }
//     return cities;
// };

export const citiesByAsc = () => {
    return CITIES.sort((a, b) => {
        return a.label.localeCompare(b.label);
    });
};

export const regionsByAsc = () => {
    return REGIONS.sort((a, b) => {
        return a.label.localeCompare(b.label);
    });
};

export const maxsFromMin = (minId, items) => {
    return items.filter((item) => item.value > minId);
};

export const minsFromMax = (maxId, items) => {
    if (maxId === 0) {
        return items;
    }

    return items.filter((item) => item.value < maxId);
};

export const distanceFromCoords = (lat1, lon1, lat2, lon2, unit = "K") => {
    if (lat1 === lat2 && lon1 === lon2) {
        return 0;
    } else {
        let radlat1 = (Math.PI * lat1) / 180;
        let radlat2 = (Math.PI * lat2) / 180;
        let theta = lon1 - lon2;
        let radtheta = (Math.PI * theta) / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") {
            dist = dist * 1.609344;
        }
        if (unit === "N") {
            dist = dist * 0.8684;
        }
        return dist;
    }
};

export const numberFromStringWithUnit = (str) => {
    if (typeof str === "number") {
        return str;
    }

    if (!str || !str.length) {
        return 0;
    }

    let index = str.search(STRINGS.k);
    if (index !== -1) {
        return parseInt(str.substr(0, index)) * 1000;
    }

    index = str.search(STRINGS.m);
    if (index !== -1) {
        return parseInt(str.substr(0, index)) * 1000000;
    }

    index = str.search(STRINGS.b);
    if (index !== -1) {
        return parseInt(str.substr(0, index)) * 1000000000;
    }

    return parseInt(str);
};

export const stringWithUnitFromNumber = (numberStr) => {
    let number = parseInt(numberStr);

    if (!number) {
        return 0;
    }

    if (number >= 1000000000) {
        return getStringWithUnit(number, 1000000000) + " " + STRINGS.b;
    }

    if (number >= 1000000) {
        return getStringWithUnit(number, 1000000) + " " + STRINGS.m;
    }

    if (number >= 1000) {
        return getStringWithUnit(number, 1000) + " " + STRINGS.k;
    }

    return number;
};

const getStringWithUnit = (number, unit) => {
    if (number % unit > 0) {
        if (+(number / unit).toFixed(2).toString().slice(-1) === 0) {
            return (number / unit).toFixed(1);
        } else {
            return (number / unit).toFixed(2);
        }
    } else {
        return number / unit;
    }
};

export const orderTags = (srcTags, searchTags) => {
    if (!srcTags) {
        return null;
    }

    if (!searchTags || !searchTags.length) {
        return srcTags;
    }
    let matchedTags = [];
    for (let i in searchTags) {
        let searchTag = searchTags[i].name;
        for (let j in srcTags) {
            let tag = srcTags[j];
            if (tag.toLowerCase().search(searchTag.toLowerCase()) !== -1) {
                matchedTags.push(tag);
                srcTags.splice(j, 1);
                break;
            }
        }
    }

    let tags = matchedTags.slice(0);
    srcTags.forEach((tag) => {
        tags.push(tag);
    });

    return tags;
};

export const getCompanyTypeText = (value) => {
    let types = COMPANY_TYPES();
    let text = "";
    types.forEach((type) => {
        if (type.value === value) {
            text = type.label;
        }
    });

    return text;
};

export const getTotalCompanies = async (registeredCompanies) => {
    // return registeredCompanies;

    let result = await fetch("/init-data.json");
    if (result.status !== 200) {
        return {
            status: result.status,
            message: "An error occured due to pull initial companies! ",
        };
    }
    let unregisteredCompanies = await result.json();
    // console.log(unregisteredCompanies.length);

    let companies = registeredCompanies.slice(0);
    unregisteredCompanies.forEach((unregisteredCompany) => {
        let found = false;
        registeredCompanies.forEach((registeredCompany) => {
            if (unregisteredCompany.vat === registeredCompany.vat) {
                found = true;
            }
        });
        if (!found) {
            companies.push(unregisteredCompany);
        }
    });

    return {
        status: 1,
        data: companies,
    };
};

export const encrypt = (data) => {
    let mykey = crypto.createCipher("aes-128-cbc", data);
    return mykey.update("abc", "utf8", "hex") + mykey.final("hex");
};

export const getHttpUrl = (url) => {
    if (!url || !url.length) return "#";
    if (url.substr(0, 7) === "http://" || url.substr(0, 8) === "https://") {
        return url;
    }
    return "http://" + url;
};
