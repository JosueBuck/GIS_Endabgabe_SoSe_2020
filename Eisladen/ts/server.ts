import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";



export namespace Eisdiele {
    let datenbankDaten: Mongo.Collection;

    let datenbankUrl: string;
    datenbankUrl = "mongodb+srv://derLarry:derLarry99@buckmaster.gy6sw.mongodb.net/Eisdiele?retryWrites=true&w=majority";

    connectToDatabase(datenbankUrl);

    let port: number = Number(process.env.PORT);
    if (!port) {
        port = 8100;
    }

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.listen(port);


    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        datenbankDaten = mongoClient.db("Eisdiele").collection("Bestellungen");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

        _response.setHeader("Access-Control-Allow-Origin", "*");  //man kann von überall darauf zugreifen
        _response.setHeader("content-type", "text/html; charset=utf-8");   //das der text html ist

        if (_request.url) {   //wenn mit der request etwas mitgeschickt wurde
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);  //man holt aus der url das raus, was man braucht
            let path: string | null = url.pathname;
            //wenn im url erhalten angehängt wurde
            let resultString: string = "";
            if (path == "/erhalten") {
                datenbankDaten.find({}).toArray(function (err: Mongo.MongoError, result: string[]): void {  //man nimmt die collection und suche alles was da drin ist und gib mir das und mach alles zu einem string array, man bindet direkt funktoin an, dann erreor, wenn man einen error haben sollte, alles iewrd im result gepeichert als array
                    if (err)
                        throw err;

                    resultString += "[";
                    for (let i: number = 0; i < result.length; i++) {
                        //i ist ein kompletter eintrag von mongo db in der kollektion
                        resultString += JSON.stringify(result[i]);  // strinigiy macht javascipt zu json form
                        if (i != result.length - 1)
                            resultString += ",";
                    }

                    resultString += "]";
                    _response.write(JSON.stringify(resultString));
                    _response.end();
                });
            }
            // wenn im url /speichern angehängt wurde:
            else if (path == "/speichern") {
                datenbankDaten.insertOne({
                    vorname: url.query.vorname, nachname: url.query.nachname, adresse: url.query.adresse, nachricht: url.query.nachricht,
                    extra1: url.query.extra0, extra2: url.query.extra1, extra3: url.query.extra2, extra4: url.query.extra3, extra5: url.query.extra4
                });
                _response.end();
            }
            // wenn im url /deleteDocument angehängt wurde
            else if (path == "/deleteDocument") {
                datenbankDaten.deleteOne({"_id": new Mongo.ObjectID(<string>url.query.id)});
                _response.end();
            }
        }

    }

}