/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb'
import { env } from '~/config/environment.js'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try {
    console
    await CONNECT_DB()
    console.log('1. Connecting to MongoDB Cloud Atlas...!')
    START_SERVER()
    console.log('2. Connected to MongoDB Cloud Atlas!')
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => {
//     console.log('Connected to database successfully!')
//   })
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })
