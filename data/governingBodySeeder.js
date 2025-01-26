const GoverningBody = require('../models/governingBodyModel');

const governingBodyMembers = [
  { name: 'Brigadier General Md Shahadat Sikder, ndc, afwc, psc', position: 'Chairman', description: 'Governing Body, Birshreshtha Noor Mohammad Public College & Additional Director General Headquarters Border Guard Bangladesh', image: '/assets/images/poeple/inspiring-new-boss.jpg' },
  { name: 'Sharif Ahmed Chowdhury', position: 'Member, Teacher Representative', description: 'Governing Body, Birshreshtha Noor Mohammad Public College Peelkhana, Dhaka.', image: '/assets/images/poeple/office-happy-man-work.jpg' }
  // Add more members as needed
];

const seedGoverningBodyMembers = async () => {
  await GoverningBody.deleteMany(); // Clear existing data
  await GoverningBody.insertMany(governingBodyMembers); // Insert new data
  console.log('Governing body members seeded successfully!');
};

module.exports = seedGoverningBodyMembers;
