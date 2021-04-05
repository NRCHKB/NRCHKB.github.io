import {Characteristic, SerializedCharacteristic} from "hap-nodejs"
import path from "path"

type CharacteristicIndex = {
  "title": string
}

const characteristicIndexFile = "../data/hap/characteristics.json"

const characteristicMapper = (characteristic: SerializedCharacteristic) => {
  return {
    title: characteristic.displayName
  }
}

const fs = require("fs")

const characteristicData: CharacteristicIndex[] = []

Object.values(Characteristic)
  .filter((characteristic) => characteristic.prototype instanceof Characteristic)
  .forEach((characteristic) => {
    const serialized = Characteristic.serialize(new characteristic())
    characteristicData.push(characteristicMapper(serialized))
  })

fs.writeFile(characteristicIndexFile, JSON.stringify(characteristicData), { flag: "w" }, (err: any) => {
  if (err) {
    if (err.code == "EEXIST") {
    } else {
      throw err
    }
  } else {
    console.log("Characteristics Data generated")
  }
})

export {}
