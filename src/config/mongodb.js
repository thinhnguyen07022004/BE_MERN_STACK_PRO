import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment.js'

let trelloDatabaseInstance = null

const mongoClient = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true
    }
})

export const CONNECT_DB = async () => {
    await mongoClient.connect()
    trelloDatabaseInstance = mongoClient.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect to database first!')
    return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
    await trelloDatabaseInstance.close()
}