import {Characteristic, SerializedCharacteristic, SerializedService, Service} from "hap-nodejs"
import path from "path"

const myArgs = process.argv.slice(2);
let removeOld = false

switch (myArgs[0]) {
  case 'hard':
    removeOld = true
    break;
}

const characteristicDataFile = "../data/hap/characteristics.json"
const characteristicFolder = "../content/wiki/characteristic/"

const characteristicTemplate = (element: PageData) => {

  const title = element.name
  const description = element.key
  const name = element.name
  const date = new Date().toISOString()

  return `---
title: "${title}"
description: "${description}"
lead: ""
date: ${date}
lastmod: ${date}
draft: false
images: []
menu:
  docs:
    parent: "characteristic"
toc: true
characteristic:
  name: "${name}"
---
`
}

const serviceDataFile = "../data/hap/services.json"
const serviceFolder = "../content/wiki/service/"

const serviceTemplate = (element: PageData) => {

  const title = element.key
  const name = element.name
  const date = new Date().toISOString()

  return `---
title: "${title}"
description: "${title}"
lead: ""
date: ${date}
lastmod: ${date}
draft: false
images: []
menu:
  docs:
    parent: "service"
toc: true
service:
  name: "${name}"
---
`
}

const fs = require("fs")

type PageData = {
  key: string
  name?: string
}

const generateInFolderForKeyset = (
  setName: string,
  folder: string,
  set: () => PageData[],
  template: (element: PageData) => string
) => {
  console.log(setName + " Page set generate STARTED")

  set().forEach((element) => {
    const dirPath = path.join(folder, element.key.toLowerCase().replace(/ /g, "-"))
    const filePath = path.join(dirPath, "index.md")

    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath);
    }

    fs.writeFile(filePath, template(element), { flag: "w" + (removeOld ? '' : 'x') }, (err: any) => {
      if (err) {
        if (err.code == "EEXIST") {
        } else {
          throw err
        }
      } else {
        console.log(setName + " Page generated for " + element.key)
      }
    })
  })

  console.log(setName + " Page set generate FINISHED")
}

type ExtraSerializedCharacteristic = SerializedCharacteristic & {usedBy?: string[], knownValues?: {key:string, value:unknown}[]}

generateInFolderForKeyset(
  "Characteristic",
  characteristicFolder,
  () => {
    const data: ExtraSerializedCharacteristic[] = []
    const pageData: PageData[] = []

    Object.values(Characteristic)
      .filter((characteristic) => characteristic.prototype instanceof Characteristic)
      .forEach((characteristic) => {
        const serialized: ExtraSerializedCharacteristic = Characteristic.serialize(new characteristic())

        serialized.usedBy = Object.values(Service)
          .filter((service) => service.prototype instanceof Service)
          .map((service) => {
            const newService = Service.serialize(new service())
            newService.displayName = service.name
            return newService
          })
          .filter(
            (service) =>
              [...service.characteristics, ...(service.optionalCharacteristics ?? [])].find(
                (c) => c.displayName === serialized.displayName
              ) !== undefined
          )
          .map(service => service.displayName)
          .reduce<string[]>(
            (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
            [],
          );

        if (serialized.constructorName) {
          // @ts-ignore
          const knownValues = Object.entries(Characteristic[serialized.constructorName])
            .filter(([key]) => key !== 'UUID')
            .map(([key, value]) => ({
              key: key.split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                      .join(' '),
              value
            }))

          if (knownValues && knownValues.length > 0) {
            serialized.knownValues = knownValues
          }
        }

        pageData.push({
          key: serialized.displayName,
          name: serialized.constructorName
        })

        if (!data.find(c => c.displayName === serialized.displayName)) {
          data.push(serialized)
        }
      })

    fs.writeFile(characteristicDataFile, JSON.stringify(data), { flag: "w" }, (err: any) => {
      if (err) {
        if (err.code == "EEXIST") {
        } else {
          throw err
        }
      } else {
        console.log("Characteristics Data generated")
      }
    })

    return pageData
  },
  characteristicTemplate
)

generateInFolderForKeyset(
  "Service",
  serviceFolder,
  () => {
    let data: SerializedService[] = []
    const pageData: PageData[] = []

    Object.values(Service)
      .filter((service) => service.prototype instanceof Service)
      .forEach((service) => {
        const serialized = Service.serialize(new service())
        serialized.displayName = service.name.replace(/([a-z])([A-Z])/g, "$1 $2")
        serialized.characteristics = serialized.characteristics.map(c => {
          return {...c, required: true}
        })

        pageData.push({
            key: serialized.displayName,
            name: serialized.constructorName
        })

        if (!data.find(s => s.displayName === serialized.displayName)) {
          data.push(serialized)
        }
      })


    fs.writeFile(serviceDataFile, JSON.stringify(data), { flag: "w" }, (err: any) => {
      if (err) {
        if (err.code == "EEXIST") {
        } else {
          throw err
        }
      } else {
        console.log("Services Data generated")
      }
    })

    return pageData
  },
  serviceTemplate
)

export {}
