const fs = require('fs');
const Papa = require('papaparse');
const _ = require('lodash');

const csvFilePath = './data.csv';
const outputFilePath = 'output.json';

const file = fs.createReadStream(csvFilePath);

Papa.parse(file, {
  header: true,
  complete: function (results) {
    // console.log(results);

    const r = []
    _.forEach(results.data, d => {
        // console.log('ddd', d["﻿FundName"], d);
        r.push({
            name: d["﻿FundName"],
            website: d['FundWebsite'],
            linkedIn: d['FundLinkedIn'],
            structure: d['FundStructure'],
            country: d['Country'],
            industries: (d['FocusIndustries'] || '').split(','),
            raw: d
        })
        // console.log(r)
    })

    // console.log(r);

    fs.writeFileSync(outputFilePath, JSON.stringify(r, null, 2));
    // console.log('CSV file successfully converted to JSON');
  },
});
