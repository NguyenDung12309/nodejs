import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import { collectionName } from '@/constants/common';
import { User } from '@/schemas/userSchema';

const uri = `mongodb+srv://${process.env.DEV_USERNAME}:${process.env.DEV_PASSWORD}@twitter.gxwqmbq.mongodb.net/?retryWrites=true&w=majority`;

class DatabaseService {
  private client: MongoClient;
  private db: Db;
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.db = this.client.db(`${process.env.DEV_DATABASE_NAME}`);
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } catch (error) {
      console.log(error);
    }
  }

  get users(): Collection<User> {
    return this.db.collection(collectionName.users);
  }
}

export const databaseService = new DatabaseService();
