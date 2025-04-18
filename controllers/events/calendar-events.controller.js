const { response, request } = require("express");
const Event = require("../../models/Event");
const getEvents = async (req, res = response) => {
  userId = req.uid; // uid del usuario autenticado
  try {
    //? The populate() method in Mongoose is used to automatically replace a field in a document with the actual data from a related document.
    const allEvents = await Event.find({ user: userId }).populate(
      "user",
      "name"
    );
    res.status(200).json({
      ok: true,
      msg: "get Calendar Events",
      events: allEvents,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error al obtener los eventos, hable con el administrador",
    });
  }
};
const getEventById = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "get Calendar Event by ID",
  });
};
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid; // uid del usuario autenticado
    const eventSaved = await event.save();
    res.status(201).json({
      ok: true,
      msg: "Evento creado correctamente",
      id: eventSaved.id,
    });
  } catch (error) {
    console.log("Calendar Events Controller::createEvent::", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al crear el evento, hable con el administrador",
    });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const userId = req.uid; // uid del usuario autenticado

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado",
      });
    }

    //? Verificar si el usuario es el propietario del evento
    if (event.user._id.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar este evento",
      });
    }

    const updatedEvent = {
      ...req.body,
      user: userId,
    };

    //? el new nos retorna el evento actailizado

    const eventUpdated = await Event.findByIdAndUpdate(eventId, updatedEvent, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "Evento actualizado correctamente",
      event: eventUpdated,
    });
  } catch (error) {
    console.log("Calendar Events Controller::updateEvent", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al actualizar el evento, hable con el administrador",
    });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  const userId = req.uid;

  try {
    const event = await Event.findById(eventId);

    //? Verificar si el usuario es el propietario del evento
    if (event.user._id.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar este evento",
      });
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "Evento eliminado correctamente",
    });
  } catch (error) {
    console.log("Calendar Events Controller::deleteEvent", error);
    return res.status(500).json({
      ok: false,
      msg: "Error al eliminar el evento, hable con el administrador",
    });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
