"use strict";
exports.__esModule = true;
var hap_nodejs_1 = require("hap-nodejs");
var characteristicIndexFile = "../data/hap/characteristicsIndex.json";
var characteristicMapper = function (characteristic) {
    return {
        title: characteristic.displayName
    };
};
var fs = require("fs");
var characteristicData = [];
Object.values(hap_nodejs_1.Characteristic)
    .filter(function (characteristic) { return characteristic.prototype instanceof hap_nodejs_1.Characteristic; })
    .forEach(function (characteristic) {
    var serialized = hap_nodejs_1.Characteristic.serialize(new characteristic());
    characteristicData.push(characteristicMapper(serialized));
});
fs.writeFile(characteristicIndexFile, JSON.stringify(characteristicData), { flag: "w" }, function (err) {
    if (err) {
        if (err.code == "EEXIST") {
        }
        else {
            throw err;
        }
    }
    else {
        console.log("Characteristics Index generated");
    }
});
