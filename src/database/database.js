import mongodb from 'mongodb';

const uri = 'mongodb+srv://hyocee:0000@hy-mail.xvsre.mongodb.net/hymail?retryWrites=true&w=majority';

const client = new mongodb.MongoClient(uri);
await client.connect();

export async function findUser(user) {
    const finder = await client.db("maildb").collection("users").findOne(user);
    return finder
}

export async function createUser(user) {
    const result = await client.db("maildb").collection("users").insertOne(user);
    console.log('user created' + user + result)
}