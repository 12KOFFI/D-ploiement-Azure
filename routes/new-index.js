require('dotenv').config(); // ← ajoute ça

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// utilise les variables d'environnement
const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;

router.get('/', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const dbo = client.db(dbName);
    const data = await dbo.collection(collectionName).find({}).toArray();

    console.log("Mongo data coming in hot:");
    console.log(data);

    res.json(data);
    client.close();
  } catch (err) {
    console.error("Erreur MongoDB :", err.message);
    res.status(500).json({ error: "Erreur lors de la récupération des données" });
  }
});

module.exports = router;
