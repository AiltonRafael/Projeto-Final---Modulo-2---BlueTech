import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const connection = new Sequelize(
    // process.env.DATABASE_URL,
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