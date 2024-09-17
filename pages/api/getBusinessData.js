import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const {inputEmail} = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db('NFTDatabase'); // Choose a name for your database

      const collection = database.collection('NFTBusiness'); // Choose a name for your collection

      const data = await collection.find({}).project({ inputDescription: 0, inputCountry: 0, inputIndustry: 0, inputRegion: 0, inputUtility: 0, _id: 0 }).toArray();
      res.json(data);
      
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    } finally {
      await client.close(1500);
    }
  } else {
    res.status(405).json({ message: 'Method not allowed!' });
  }
}