import express  from 'express'
import {join} from 'path'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve public files to /public - CSS, Images, Fonts
app.use('/public', express.static(join(__dirname, 'public')))


// Always serve index.html since it is a SPA application
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(8080, () => {
    console.log(`Example app listening on port ${8080}`)
})