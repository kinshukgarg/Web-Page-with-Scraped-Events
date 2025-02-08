const axios = require("axios");
const cheerio = require("cheerio");
const Event = require("../models/Event");

async function scrapeEvents() {
    const url = "https://example-event-site.com/sydney-events";  // Replace with actual event site URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let events = [];
    $(".event-card").each((index, element) => {
        events.push({
            title: $(element).find(".event-title").text(),
            date: $(element).find(".event-date").text(),
            location: $(element).find(".event-location").text(),
            link: $(element).find(".event-link").attr("href")
        });
    });

    await Event.insertMany(events, { ordered: false }).catch(err => console.log(err));
    console.log("Scraped and stored events.");
}

module.exports = scrapeEvents;
