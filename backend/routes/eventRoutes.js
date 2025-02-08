const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// Get a single event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Add a new event manually
router.post("/", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: "Error adding event" });
    }
});

// Delete an event
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
        res.json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
