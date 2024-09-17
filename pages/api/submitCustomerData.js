import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {inputName, inputCountry, inputRegion, inputEmail} = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('NFTDatabase'); // Choose a name for your database

      const collection = database.collection('NFTCustomer'); // Choose a name for your collection

      await collection.insertOne({ inputName, inputCountry, inputRegion, inputEmail });

      res.status(201).json({ message: 'Data submitted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}