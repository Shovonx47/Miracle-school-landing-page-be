const express = require('express');
const router = express.Router();

const {
    getFaqs,
    newFaq,
    getSingleFaq,
    updateFaq,
    deleteFaq
} = require('../controllers/faqController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/faqs').get(getFaqs);
router.route('/faq/:id').get(getSingleFaq);

// Admin Routes
router.route('/admin/faq/new').post(isAuthenticatedUser, authorizeRoles('admin'), newFaq);
router.route('/admin/faq/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateFaq)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteFaq);

module.exports = router;
