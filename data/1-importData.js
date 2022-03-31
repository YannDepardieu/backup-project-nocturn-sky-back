/* eslint-disable no-unused-expressions */
require('dotenv').config();
const debug = require('debug')('importData');

const client = require('../app/db/postgres');

const users = require('./testUsers.json');
const places = require('./testPlaces.json');
const events = require('./testEvents.json');
const planets = require('./planets.json');
const constellations = require('./constellations.json');
const myths = require('./myths.json');

const allTables = { users, places, events, planets, constellations, myths };

const tables = Object.keys(allTables);
// console.log(tables);

(async () => {
    debug('Truncate Tables');
    // const tablesNames = tables.toString().split(',').join(', ');
    // await client.query(`TRUNCATE TABLE IF EXISTS ${tablesNames} RESTART IDENTITY`);

    const tableQuerys = [];

    // categories.forEach((category) => {
    //     debug('Processing category:', category.label);
    //     const query = client.query(
    //         `
    //             INSERT INTO "category"
    //             ("label", "route")
    //             VALUES
    //             ($1, $2)
    //             RETURNING *;
    //         `,
    //         [category.label, category.route],
    //     );
    //     debug('Contenu de query', query);
    //     categoryQueries.push(query);
    // });

    Object.entries(allTables).forEach((table) => {
        const tableColumns = `"${Object.keys(table[1][0]).toString().split(',').join('", "')}"`;

        const tableParams = [];
        for (let i = 1; i <= Object.keys(table[1][0]).length; i += 1) {
            tableParams.push(`$${i}`);
        }
        const tableParamsQuery = tableParams.toString().split(',').join(', ');

        let tableParamsValues = '';
        table[1].forEach((value) => {
            console.log(value);
            tableParamsValues += `${table[0]}.${value}`;
        });
        console.log(tableParamsValues);

        const query = client.query(
            `
            INSERT INTO "${table[0]}" (${tableColumns}) VALUES (${tableParamsQuery}) RETURNING *;
            `,
            [],
        );
        console.log(query);
    });
})();
