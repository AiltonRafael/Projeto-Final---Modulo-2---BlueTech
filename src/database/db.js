import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const connection = new Sequelize(
    "postgres://pokemon_82jv_user:DEZQDhcVKeM4mCf6WDhAQGlES1HufziQ@dpg-c9nu0ec41ls5dvtp19b0-a.oregon-postgres.render.com/pokemon_82jv",
    {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
    }
)

// export const connection = new Sequelize(
//     process.env.DB_BASE,
//     process.env.DB_USER,
//     process.env.DB_PASS, {
//         host: process.env.DB_HOST,
//         port: 5432,
//         dialect: 'postgres'
//     }
// )