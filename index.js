import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { routes } from './src/routes/router.js'

dotenv.config()

let __dirname = path.resolve(path.dirname(''))

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})