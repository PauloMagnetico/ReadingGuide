import { model } from "mongoose";

//Rules for classification
const aviRules: string = `Hieronder vind je een overzicht van de kenmerken van de AVI-niveaus zoals die in Nederlandse kinderboeken voorkomen.
AVI Start:
- Tekst bestaat uit korte woorden die je precies zo schrijft zoals je ze uitspreekt. Voorbeelden hiervan zijn maan, bos, man, roos.
- De zinnen zijn kort.Elke zin begint op een nieuwe regel.
- Er komen geen hoofdletters voor.
M3:
- Tekst bestaat uit korte woorden als zon, koe en uit, waarbij ook woorden mogen voorkomen met sch - en - ng.
- Enkele bekende woorden waarin twee medeklinkers na elkaar voorkomen als spin en rent mogen voorkomen.
- De zinnen zijn kort.Elke zin begint op een nieuwe regel.
- Er komen geen hoofdletters voor.
E3:
- Tekst bestaat uit een - en tweelettergrepige woorden zonder leesmoeilijkheden.
- De zinnen zijn kort.Elke zin begint op een nieuwe regel.
- Er worden ook hoofdletters gebruikt.
M4:
- Tekst bestaat uit één - en tweelettergrepige woorden.De gebruikte woorden mogen wat minder bekend zijn.Makkelijke drielettergrepige woorden komen ook voor, zoals sinterklaas.
- De zinnen worden langer, maar zijn nog eenvoudig van opbouw.
E4:
- Tekst bestaat voornamelijk uit één - twee - en drielettergrepige woorden.In drielettergrepige woorden mogen een beperkt aantal leesmoeilijkheden voorkomen, zoals makkelijk(-lijk spreek je uit als –luk).
- Minder bekende woorden mogen gebruikt worden.
- Elke nieuwe zin begint op een nieuwe regel, maar de zinnen worden langer.
M5:
- Geen beperking in lengte woorden.Elke nieuwe zin begint op een nieuwe regel.Maar de zinnen mogen over de volgende regel doorlopen.
- Eenvoudige leesmoeilijkheden van leenwoorden komen voor: i en y uitgesproken als ie; c uitgesproken als k of als s.
E5:
- Zinnen worden langer.De zinnen kunnen bestaan uit een hoofdzin met een bijzin.
- Meer gebruik van lastig te lezen leenwoorden: Bureau, horloge, chauffeur.
- Zinnen beginnen niet meer op een nieuwe regel.
M6:
- Langere zinnen, ook samengestelde zinnen.
- Zinnen beginnen niet meer op een nieuwe regel.
- Lastig te lezen leenwoorden en leestekens komen meer voor, zoals gamen, ideeën, ruïne.
- Steeds minder wit op een pagina.
E6:
- Langere zinnen, ook samengestelde zinnen.
- Zinnen beginnen niet meer op een nieuwe regel.
- Lastig te lezen leenwoorden(gamen), onbekendere woorden(ov - pas, ornament) en leestekens(ideeën, ruïne).komen meer voor.
- Steeds minder wit op een pagina.Steeds minder illustraties in een boek.
M7/E7/Avi Plus:
Geen beperkingen meer in lengte zinnen, opbouw zinnen en soorten woorden.
Lange woorden komen relatief veel voor.
Steeds minder wit op een pagina.Steeds minder illustraties in een boek.
Hoofdstuklengte is over het algemeen nog beperkt.
Hoe hoger het niveau, hoe dikker de boeken.Weinig of geen illustraties.`

//system prompt that is used in queries.
export const querySystemPrompt = `Dit is een chatbot die het AVI-leesniveau van teksten evalueert. De gebruiker zal een tekst verstrekken, en de chatbot zal reageren met een AVI-leesniveau uit de volgende lijst: ['AviStart', 'M3', 'E3', 'M4', 'E4', 'M5', 'E5', 'M6', 'E6', 'M7', 'E7', 'AviPlus']`;

//extended prompt that includes the rules for classification. Used for finetuning
export const systemPrompt = `${querySystemPrompt} De regels voor classificatie: ${aviRules}`

const baseModel = "gpt-3.5-turbo";
const fineTunedModel = "ft:gpt-3.5-turbo-0125:personal::9YW4PilP"

//parameters for the classification
export const gptConfig = {
    model: fineTunedModel,
    temperature: 0,
    max_tokens: 5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
}
