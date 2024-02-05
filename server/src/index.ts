import express from 'express'
import 'dotenv/config'
import unknownGetAsNumber from './shared/unknownGetAsNumber'

const app = express()
const port = unknownGetAsNumber(process.env.PORT)

app.get('*', (request, response) => {
  response.status(404).send('Not found')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
