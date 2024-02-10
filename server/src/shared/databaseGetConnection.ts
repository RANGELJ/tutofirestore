import knex, { type Knex } from 'knex'
import unknownGetAsNumber from './unknownGetAsNumber'

let cachedConnection: Knex | undefined

const databaseGetConnection = () => {
    if (cachedConnection) {
        return cachedConnection
    }
    cachedConnection = knex({
        client: process.env.DATABASE_CLIENT,
        connection: {
            host: process.env.DATABASE_HOST,
            port: unknownGetAsNumber(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
    })
    return cachedConnection
}

export default databaseGetConnection
