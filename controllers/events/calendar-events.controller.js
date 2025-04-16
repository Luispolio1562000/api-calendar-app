const { response, request } = require("express");

const getEvents = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "get Calendar Events",
  });
};
const getEventById = async (req = request, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "get Calendar Event by ID",
  });
};
const createEvent = async (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "create Calendar Events",
  });
};

const updateEvent = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "update Calendar Events",
  });
};

const deleteEvent = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "delete Calendar Events",
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
