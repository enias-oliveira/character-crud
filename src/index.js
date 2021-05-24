const Express = require('express')

const configApp = require('./configuration/index.js')
const { getNewPersonagemId } = require('./helper/index.js')

const app = Express()

configApp(app)

app.post('/characters', async (request, response) => {
  const character = { id: await getNewPersonagemId(app.db), ...request.body }

  const mongoResponse = await app.db.collection('personagens').insertOne(character)
  const newCharacter = mongoResponse.ops[0]
  delete newCharacter._id

  response.status(201).send(newCharacter)
})

app.get('/characters', async (request, response) => {
  const allCharacters = await app.db.collection('personagens').find().sort().toArray()
  const serializedCharacters = allCharacters.map((character) => {
    delete character._id
    return character
  })

  response.send(serializedCharacters)
})

app.get('/characters/:id', async (request, response) => {
  const character = await app.db
    .collection('personagens')
    .findOne({ id: parseInt(request.params.id) })

  delete character._id

  response.send(character)
})

app.listen(3000, () => {
  console.log('Express app listening at http://localhost:3000/')
})
