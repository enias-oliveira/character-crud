const { getNewPersonagemId } = require('../helper/index.js')

const registerCharactersRoutes = async (app) => {
  const collection = await app.db.collection('personagens')

  app.post('/characters', async (request, response) => {
    const requestedCharacter = { id: await getNewPersonagemId(app.db), ...request.body }

    const mongoResponse = await collection.insertOne(requestedCharacter)
    const newCharacter = mongoResponse.ops[0]
    delete newCharacter._id

    response.status(201).send(newCharacter)
  })

  app.get('/characters', async (request, response) => {
    const allCharacters = await collection.find().sort().toArray()

    const serializedCharacters = allCharacters.map((character) => {
      delete character._id
      return character
    })

    response.send(serializedCharacters)
  })

  app.get('/characters/:id', async (request, response) => {
    const filter = { id: parseInt(request.params.id) }
    const character = await app.db.collection('personagens').findOne(filter)

    if (character) {
      delete character._id
      response.send(character)
    }

    response.status(404).send()
  })

  app.patch('/characters/:id', async (request, response) => {
    const filter = { id: parseInt(request.params.id) }
    const options = { upsert: false }
    const updateDoc = {
      $set: { ...request.body },
    }

    const mongoResponse = await app.db
      .collection('personagens')
      .updateOne(filter, updateDoc, options)

    const updatedCharacter = await app.db.collection('personagens').findOne(filter)

    delete updatedCharacter._id

    response.send(updatedCharacter)
  })

  app.delete('/characters/:id', async (request, response) => {
    const filter = { id: parseInt(request.params.id) }
    await app.db.collection('personagens').deleteOne(filter)

    response.status(204).send()
  })
}

module.exports = registerCharactersRoutes
