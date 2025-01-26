const TimelineEvent = require('../models/timelineEventModel');

const timelineEvents = [
  { year: '1949', title: 'Establishment', description: 'Notre Dame College was established by the Congregation of Holy Cross, marking the beginning of a prestigious educational journey in Dhaka.' },
  { year: '1954', title: 'First Graduation', description: 'The first batch of students graduated from Notre Dame College, setting a precedent for academic excellence that continues to this day.' },
  { year: '1960', title: 'Campus Expansion', description: 'Major expansion of college facilities including new academic buildings and laboratories to accommodate growing student population.' }
];

const seedTimelineEvents = async () => {
  await TimelineEvent.deleteMany(); // Clear existing data
  await TimelineEvent.insertMany(timelineEvents); // Insert new data
  console.log('Timeline events seeded successfully!');
};

module.exports = seedTimelineEvents;
