const _ = require("lodash");
const fs = require("fs");

const pickRandomArtist = (artistList, currentArtist, outputArray) => {
    let artistPool = _.filter(artistList, artist => {
        return artist !== currentArtist && !_.includes(_.values(_.fromPairs(outputArray)), artist);
    });

    return _.shuffle(artistPool)[0];
}

let file = fs.readFileSync("./names.txt").toString("utf-8");

const artists = _.map(_.split(file, "\n"), entry => _.trim(entry));

const outputArray = [];

_.forEach(artists, artist => {
    outputArray.push([artist, pickRandomArtist(artists, artist, outputArray)]);
});

const output = _.fromPairs(outputArray);

console.table(output)