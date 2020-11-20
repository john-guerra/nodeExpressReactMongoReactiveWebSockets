const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

function MyDB() {
  const myDB = {};

  myDB.listenForChanges = async (notifyAll) => {
    console.log("Connecting to the db");
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();
    const database = client.db("posts");
    const collection = database.collection("posts");

    const changestream = collection.watch();

    console.log("Listenning for changes");
    changestream.on("change", (next) => {
      console.log("Something changed in the database", next.fullDocument);

      notifyAll();
    });
  };

  myDB.getPosts = async () => {
    let client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();
      const database = client.db("posts");
      const collection = database.collection("posts");

      return await collection.find({}).sort({ _id: -1 }).limit(10).toArray();
    } finally {
      client.close();
    }
  };

  return myDB;
}

const myDB = MyDB();

module.exports = myDB;
