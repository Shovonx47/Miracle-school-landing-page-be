const TimelineEvent = require('../models/timelineEventModel');

const commonData = {
  heroImage: '/assets/images/Buildings/low-rise-building.jpg',
  heroTitle: 'Our Legacy',
  heroSubtitle: 'Seven decades of shaping minds and building futures at Notre Dame College Dhaka',
  legacyTitle: 'A Legacy of Excellence',
  legacyDescription: 'Notre Dame College, established in 1949, stands as a beacon of educational excellence in Bangladesh. Founded by the Congregation of Holy Cross, our institution has cultivated a rich tradition of academic achievement and moral formation that spans over seven decades. Through the years, we have maintained our commitment to holistic education, combining rigorous academic standards with character development and community service. Our legacy is reflected in the countless alumni who have gone on to make significant contributions to society.',
  stats: [
    { value: '1949', label: 'Founded' },
    { value: '10000+', label: 'Alumni' },
    { value: '95%', label: 'Success Rate' },
    { value: '50+', label: 'Programs' }
  ]
};

const timelineEvents = [
  {
    ...commonData,
    year: '1949',
    title: 'Establishment',
    description: 'Notre Dame College was established by the Congregation of Holy Cross, marking the beginning of a prestigious educational journey in Dhaka.'
  },
  {
    ...commonData,
    year: '1954',
    title: 'First Graduation',
    description: 'The first batch of students graduated from Notre Dame College, setting a precedent for academic excellence that continues to this day.'
  },
  {
    ...commonData,
    year: '1960',
    title: 'Campus Expansion',
    description: 'Major expansion of college facilities including new academic buildings and laboratories to accommodate growing student population.'
  }
];

const seedTimelineEvents = async () => {
  try {
    await TimelineEvent.deleteMany(); // Clear existing data
    await TimelineEvent.insertMany(timelineEvents); // Insert new data
    console.log('Timeline events seeded successfully!');
  } catch (error) {
    console.error('Error seeding timeline events:', error);
  }
};

module.exports = seedTimelineEvents;
