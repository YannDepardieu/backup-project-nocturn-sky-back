const debug = require('debug')('Model:Event');
const CoreModel = require('./coreModel');
const client = require('../db/postgres');
const ApiError = require('../errors/apiError');

class Event extends CoreModel {
    name;

    event_datetime;

    latitude;

    longitude;

    recall_datetime;

    // on surcharge la proprieté statique tableName définie dans le parent CoreModel
    static tableName = 'event';

    static routeName = 'events';

    constructor(obj) {
        super(obj);
        this.name = obj.name;
        this.event_datetime = obj.event_datetime;
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.recall_datetime = obj.recall_datetime;
    }

    static async selectAll(userId) {
        const result = await client.query(
            `
            SELECT *, event.id FROM "event"
            JOIN reserve_event
            ON event.id = reserve_event.event_id
            WHERE reserve_event.user_id = $1;`,
            [userId],
        );
        const resultAsClasses = [];
        result.rows.forEach((obj) => {
            const newObj = new this(obj);
            resultAsClasses.push(newObj);
        });
        return resultAsClasses;
    }

    static async selectByPk(userId, eventId) {
        const result = await client.query(
            `
            SELECT *, event.id FROM "event"
            JOIN reserve_event
            ON event.id = reserve_event.event_id
            WHERE reserve_event.user_id = $1
            AND event.id = $2;`,
            [userId, eventId],
        );
        if (result.rows.length === 0) {
            throw new ApiError(`${this.tableName} not found for this user`, {
                statusCode: 404,
            });
        }
        debug(result.rows[0]);
        return new this(result.rows[0]);
    }

    static async update(eventId, input) {
        const fields = Object.keys(input).map((prop, index) => `"${prop}" = $${index + 1}`);
        const values = Object.values(input);

        const output = await client.query(
            `
                UPDATE "${this.tableName}" SET ${fields}
                WHERE id = $${fields.length + 1} RETURNING *;
            `,
            [...values, eventId],
        );

        return output.rows[0];
    }
}

module.exports = Event;
