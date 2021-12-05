const _ = require("lodash");
const fs = require("fs");

const pickRandomEntry = (entryList, currentEntry, outputArray) => {
    let entryPool = _.filter(entryList, entry => {
        return entry !== currentEntry && !_.includes(_.values(_.fromPairs(outputArray)), entry);
    });

    return _.shuffle(entryPool)[0];
}

let file = fs.readFileSync("./names.txt").toString("utf-8");

const entries = _.map(_.split(file, "\n"), entry => _.trim(entry));

const outputArray = [];

_.forEach(entries, entry => {
    outputArray.push([entry, pickRandomEntry(entries, entry, outputArray)]);
});

const output = _.fromPairs(outputArray);

console.table(output)