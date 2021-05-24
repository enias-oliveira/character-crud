const getNewPersonagemId = async (db) => {
  let personagensCount = (await db.collection('personagens').find().count()) + 1

  while (!db.collection('personagens').find({ id: personagensCount })) {
    personagensCount += 1
  }

  return personagensCount
}

module.exports = { getNewPersonagemId }
