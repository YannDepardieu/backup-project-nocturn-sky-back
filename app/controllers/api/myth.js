// const debug = require('debug')('ApiController');
const ApiError = require('../../errors/apiError');

const Model = require('../../models/myth');

const mythController = {
    /**
     * Api controller to get one constellation myth by its ID.
     * ExpressMiddleware signature
     * @param {object} req Express req.object
     * @param {object} res Express response object
     * @returns {string} Route API JSON data
     */

    /**
     * A constellation with its myth
     * @typedef {object} RandomMyth
     * @property {integer} id - The myth id
     * @property {string} origin - Myth origin
     * @property {string} img_name - Myth image name
     * @property {integer} constellation_id - Myth's constellation id
     * @property {integer} star_id - Myth's star id
     * @property {integer} planet_id - Myth's planet id
     * @property {string} legend - Myth's legend
     * @property {string} created_at - Myth's entry DB date
     * @property {string} updated_at - Myth's last DB update date
     * @property {string} name - Myth's constellation name
     * @property {string} latin_name - Myth's constellation latin name
     * @property {string} scientific_name - Myth's constellation scientific name
     * @property {string} story - Myth's constellation story
     * @property {string} spotting - Myth's constellation spotting advices
     */
    async getRandomWithConstellation(_, res) {
        const data = await Model.findRandomWithConstellation();
        if (!data) {
            throw new ApiError('Constellation not found', { statusCode: 404 });
        }
        return res.json(data);
    },
    /**
     * A myth with its celestial body
     * @typedef {object} FullMyth
     * @property {integer} myth_id - The myth id
     * @property {string} origin - Myth origin
     * @property {string} myth_img - Myth image name
     * @property {string} myth - The myth itself
     * @property {integer} constellation_id - Myth's constellation id
     * @property {string} constellation_name - The constellation name
     * @property {string} constellation_latin_name - And its latin name
     * @property {string} constellation_scientific_name - And its latin name
     * @property {string} constellation_img - With the image name
     * @property {string} constellation_history - The story of first discovering
     * @property {string} constellation_spotting - The spotting advices to locate it on sky
     * @property {integer} planet_id - Planet's id
     * @property {integer} planet_name - Planet's name
     * @property {integer} planet_img - Planet's image
     * @property {integer} star_id - Star's id
     * @property {string} star_name - Star's french name
     * @property {string} star_tradition_name - Star's traditional name
     * @property {string} star_tradition - Star's origin
     * @property {string} star_img - Star's image
     * @property {string} star_constellation - Constellation id star belongs to
     */

    async getOneMyth(req, res) {
        const data = await Model.oneMyth(req.params.id);
        if (!data) {
            throw new ApiError('Myth not found', { statusCode: 404 });
        }
        return res.json(data);
    },
};

module.exports = mythController;
