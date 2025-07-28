const School = require('../models/school.models');

const createSchool = async (req, res) => {
    const { name } = req.body;

    try {
        if (!name) {
            throw Error("School name is required");
        }
        
        const school = await School.create({ name });
        res.status(201).json(school);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createSchool,
}