import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://dwitidibyajyoti:xxxxxxxxxxxxxxx@prise-compare.fpbgqm2.mongodb.net/?retryWrites=true&w=majority&appName=prise-compare";


async function run() {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('prise-compare');          // ← put the real DB name
    const col = db.collection('sale');   // ← put the real collection name
    // const docs = await col.find({}).toArray();

    const pipeline = [
        { $unwind: "$items" },

        {
            $group: {
                _id: "$store",
                month: {
                    // take the first doc’s month in "YYYY‑MM" format
                    $first: { $dateToString: { format: "%Y-%m", date: "$date" } }
                },
                totalRevenue: {
                    $sum: { $multiply: ["$items.quantity", "$items.price"] }
                },
                averagePrice: { $avg: "$items.price" }
            }
        },

        { $sort: { totalRevenue: -1 } }
    ];



    const docs = await col.aggregate(pipeline).toArray();

    console.log(docs);
    await client.close();
}

run().catch(console.error);




