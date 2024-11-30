const express = require('express');
const {display_all_bank, display_bank_details, display_all_branches, display_branch_details, fetchBankBranches, display_customer,display_employee} = require('../controller/display');

const router = express.Router();

router.get('/bank', display_all_bank);
router.get('/bank/:bank_id', display_bank_details);

router.get('/branch', display_all_branches);
router.get('/branch/details/:branch_id',display_branch_details);
router.get('/branch/bank/:bank_id',fetchBankBranches);
router.get('/customer/:branch_id',display_customer);
router.get('/employee/:branch_id', display_employee);



module.exports =router;