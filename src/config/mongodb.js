import { MongoClient, ServerApiVersion } from 'mongodb'

const url = 'mongodb+srv://hoidanit:QLbENgTphP0qvTNF@cluster0.ww7jj.mongodb.net/myDatabase?retryWrites=true&w=majority'
const dbName = 'trello-mern-stack-pro'
let trelloDatabaseInstance = null

const mongoClient = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true
    }
})

export const CONNECT_DB = async () => {
    await mongoClient.connect()
    trelloDatabaseInstance = mongoClient.db(dbName)
}

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to database first!')
    return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
    await trelloDatabaseInstance.close()
}