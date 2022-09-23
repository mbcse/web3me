'use strict'

import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import dbConstants from './dbConstants.json' assert { type: "json" }
import contract from './contract.json' assert { type: "json" }
import queue from './queue.json' assert { type: "json" }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

export default {

  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  },

  NETWORK: {
    ETH: {
      RPC_API: process.env.RPC_API
    },
    POLYGON: {
      RPC_API: process.env.MATIC_RPC_API,
      CHAINID: 80001,
      NETWORKID: 80001
    }
  },

  DATABASE: {
    MONGO: {
      URI: process.env.MONGO_URI
    }
  },

  LOGGER: {
    LEVEL: process.env.LOG_LEVEL || 'debug'
  },

  API_KEY: process.env.API_KEY,

  QUEUE: {
    CONNECTION_URL: process.env.RMQ_CONN_URL,
    LIST: queue
  },

  DB_CONSTANTS: dbConstants,

  KEY_SECURE_PASSWORD: process.env.KEY_SECURE_PASSWORD || '111234',

  EMAIL: {
  },

  USERNAME: '',

  AWS: {
    ACCESS_KEY_ID: '',
    ACCESS_KEY_SECRET: ''
  },

  OTP: {
    TIMEOUT_WINDOW: 240 // secs
  },

  SESSION_SECRET: 'web3me-cwhjwendew',

  PINATA: {
    URL: 'https://gateway.pinata.cloud/ipfs/',
    API_KEY: '',
    API_SECRET: ''
  },

  CONTRACTS: contract,

  API_KEYS: {
    CRYPTO_COMPARE: ''
  },

  PRIVATE_KEYS: {
    COMMON: process.env.ADMIN_PRIVATE_KEY
  },

  MORALIS: {
    API_KEY: process.env.MORALIS_API_KEY
  }

}
