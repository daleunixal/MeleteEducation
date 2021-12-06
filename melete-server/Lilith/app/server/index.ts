import cors from "cors";
import express from "express";
import bodyParser from 'body-parser';
import { UserRoutes } from './routes/user.routes';
import { MongoDbConnector } from './mongo-connector/mongo-db.connector';

const app = express();
const jsonParser = express.json();
const port = 5000;
const options: cors.CorsOptions = {
    origin: 'http://localhost:4200'
}

app.use(cors(options))
app.use(bodyParser.json())

const mongoClient = new MongoDbConnector();

app.listen(port, ()=>{
    mongoClient.connect().subscribe(
        (value: boolean) => {

        },
    );

    console.log(`[Lilith]: MeletServer running on localhost:${port}`)
})

app.get('/', (request, response) => {
    response.send('MeletEducation: Lilith server ident')
})

app.use(UserRoutes)


app.get('/api/v1/login', (request, response) => {

})
