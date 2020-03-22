const moment = require("moment");
const { Op } = require("sequelize");
const { Appointment } = require("../models");

class AvailableController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date));

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf("day").format(),
            date.endOf("day").format()
          ]
        }
      }
    });

    const schedule = [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30"
    ];

    const available = schedule.map(time => {
      const [hour, minute] = time.split(":");
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0);

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format("HH:mm") === time)
      };
    });

    return res.render("available/index", { available });
  }
}

module.exports = new AvailableController();
