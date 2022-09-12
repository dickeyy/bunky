const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require("dotenv");

dotenv.config();

const connectDb = () => {
    try {
        const mClient = new MongoClient(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        mClient.connect().then(() => {
            console.log();
        })
        const db = mClient.db("main");

        return db;
    } catch (err) {
        console.log(err.stack);
    }
};

exports.connectDb = connectDb;