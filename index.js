require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qdiymxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
 
  try {
    const db = client.db('Donation');
    const donationCollection = db.collection('DonationDB');
    const TestimonialCollection = db.collection('Testimonials');
    const CarouselCollection = db.collection('Carousal');

   

    app.get('/donation', async (req, res) => {
      
      const cursor = donationCollection.find();
      const donation = await cursor.toArray();
      res.send(donation);
    });
    app.get('/testimonials', async (req, res) => {
      
      const cursor =  TestimonialCollection.find();
      const donation = await cursor.toArray();
      res.send(donation);
    });
    app.get('/carousal', async (req, res) => {
      
      const cursor =  CarouselCollection.find();
      const donation = await cursor.toArray();
      res.send(donation);
    });
    app.get('/donation/:id',async(req,res)=>{
      const id=req.params.id;
      const query={id:id}
      const result=await donationCollection.findOne(query)
      res.send(result)
    })
    app.post('/donation', async (req, res) => {
      const donation = req.body;
      const result = await donationCollection.insertOne(donation);
      res.send(result);
    });
    

  } finally {
  }
};

run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
