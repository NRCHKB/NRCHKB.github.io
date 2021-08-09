"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var hap_nodejs_1 = require("hap-nodejs");
var path_1 = __importDefault(require("path"));
var myArgs = process.argv.slice(2);
var removeOld = false;
switch (myArgs[0]) {
    case 'hard':
        removeOld = true;
        break;
}
var characteristicDataFile = "../data/hap/characteristics.json";
var characteristicFolder = "../content/wiki/characteristic/";
var characteristicTemplate = function (element) {
    var title = element.name;
    var description = element.key;
    var name = element.name;
    var date = new Date().toISOString();
    return "---\ntitle: \"" + title + "\"\ndescription: \"" + description + "\"\nlead: \"\"\ndate: " + date + "\nlastmod: " + date + "\ndraft: false\nimages: []\nmenu:\n  docs:\n    parent: \"characteristic\"\ntoc: true\ncharacteristic:\n  name: \"" + name + "\"\n---\n";
};
var serviceDataFile = "../data/hap/services.json";
var serviceFolder = "../content/wiki/service/";
var serviceTemplate = function (element) {
    var title = element.key;
    var name = element.name;
    var date = new Date().toISOString();
    return "---\ntitle: \"" + title + "\"\ndescription: \"" + title + "\"\nlead: \"\"\ndate: " + date + "\nlastmod: " + date + "\ndraft: false\nimages: []\nmenu:\n  docs:\n    parent: \"service\"\ntoc: true\nservice:\n  name: \"" + name + "\"\n---\n";
};
var fs = require("fs");
var generateInFolderForKeyset = function (setName, folder, set, template) {
    console.log(setName + " Page set generate STARTED");
    set().forEach(function (element) {
        var dirPath = path_1["default"].join(folder, element.key.toLowerCase().replace(/ /g, "-"));
        var filePath = path_1["default"].join(dirPath, "index.md");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFile(filePath, template(element), { flag: "w" + (removeOld ? '' : 'x') }, function (err) {
            if (err) {
                if (err.code == "EEXIST") {
                }
                else {
                    throw err;
                }
            }
            else {
                console.log(setName + " Page generated for " + element.key);
            }
        });
    });
    console.log(setName + " Page set generate FINISHED");
};
generateInFolderForKeyset("Characteristic", characteristicFolder, function () {
    var data = [];
    var pageData = [];
    Object.values(hap_nodejs_1.Characteristic)
        .filter(function (characteristic) { return characteristic.prototype instanceof hap_nodejs_1.Characteristic; })
        .forEach(function (characteristic) {
        var serialized = hap_nodejs_1.Characteristic.serialize(new characteristic());
        serialized.usedBy = Object.values(hap_nodejs_1.Service)
            .filter(function (service) { return service.prototype instanceof hap_nodejs_1.Service; })
            .map(function (service) {
            var newService = hap_nodejs_1.Service.serialize(new service());
            newService.displayName = service.name;
            return newService;
        })
            .filter(function (service) {
            var _a;
            return __spreadArray(__spreadArray([], service.characteristics), ((_a = service.optionalCharacteristics) !== null && _a !== void 0 ? _a : [])).find(function (c) { return c.displayName === serialized.displayName; }) !== undefined;
        })
            .map(function (service) { return service.displayName; })
            .reduce(function (unique, item) { return (unique.includes(item) ? unique : __spreadArray(__spreadArray([], unique), [item])); }, []);
        if (serialized.constructorName) {
            // @ts-ignore
            var knownValues = Object.entries(hap_nodejs_1.Characteristic[serialized.constructorName])
                .filter(function (_a) {
                var key = _a[0];
                return key !== 'UUID';
            })
                .map(function (_a) {
                var key = _a[0], value = _a[1];
                return ({
                    key: key.split('_')
                        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); })
                        .join(' '),
                    value: value
                });
            });
            if (knownValues && knownValues.length > 0) {
                serialized.knownValues = knownValues;
            }
        }
        pageData.push({
            key: serialized.displayName,
            name: serialized.constructorName
        });
        if (!data.find(function (c) { return c.displayName === serialized.displayName; })) {
            data.push(serialized);
        }
    });
    fs.writeFile(characteristicDataFile, JSON.stringify(data), { flag: "w" }, function (err) {
        if (err) {
            if (err.code == "EEXIST") {
            }
            else {
                throw err;
            }
        }
        else {
            console.log("Characteristics Data generated");
        }
    });
    return pageData;
}, characteristicTemplate);
generateInFolderForKeyset("Service", serviceFolder, function () {
    var data = [];
    var pageData = [];
    Object.values(hap_nodejs_1.Service)
        .filter(function (service) { return service.prototype instanceof hap_nodejs_1.Service; })
        .forEach(function (service) {
        var serialized = hap_nodejs_1.Service.serialize(new service());
        serialized.displayName = service.name.replace(/([a-z])([A-Z])/g, "$1 $2");
        serialized.characteristics = serialized.characteristics.map(function (c) {
            return __assign(__assign({}, c), { required: true });
        });
        pageData.push({
            key: serialized.displayName,
            name: serialized.constructorName
        });
        if (!data.find(function (s) { return s.displayName === serialized.displayName; })) {
            data.push(serialized);
        }
    });
    fs.writeFile(serviceDataFile, JSON.stringify(data), { flag: "w" }, function (err) {
        if (err) {
            if (err.code == "EEXIST") {
            }
            else {
                throw err;
            }
        }
        else {
            console.log("Services Data generated");
        }
    });
    return pageData;
}, serviceTemplate);
