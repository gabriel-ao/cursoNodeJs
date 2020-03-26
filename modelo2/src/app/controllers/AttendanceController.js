const { User, Appointment } = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

class AttendanceController {

    async teste(req, res ){
        return res.send("teste");
    }

    async index (req, res) {
        const appointments = await Appointment.findAll({
            include: [{
                model: User,
                as: 'user'
            }],

            where: {
                provide_id: req.session.user.id,
                date: {
                    [Op.between]: [
                        moment().startOf("day").format(),
                        moment().endOf("day").format()
                    ]
                }
            }
        })

        return res.render("attendance/index", {
            appointments
        })
    }
}

module.exports = new AttendanceController()