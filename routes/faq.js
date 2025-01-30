const express = require('express');
const router = express.Router();

const {
    getFaqs,
    newFaq,
    getSingleFaq,
    updateFaq,
    deleteFaq
} = require('../controllers/faqController');

router.route('/faqs').get(getFaqs);
router.route('/faq/:id').get(getSingleFaq);

// Admin Routes (temporarily without auth)
router.route('/admin/faq/new').post(newFaq);
router.route('/admin/faq/:id')
    .put(updateFaq)
    .delete(deleteFaq);

module.exports = router;
