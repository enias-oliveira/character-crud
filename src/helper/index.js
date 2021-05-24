const isCharacterIdTaken = async (id, db) => {
  return !!(await db.collection('personagens').findOne({ id }))
}

const getNewCharacterId = async (db) => {
  let newId = (await db.collection('personagens').find().count()) + 1

  while (await isCharacterIdTaken(newId, db)) {
    newId += 1
  }

  return newId
}

module.exports = getNewCharacterId
