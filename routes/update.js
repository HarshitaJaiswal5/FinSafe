const express = require('express');
const {update_bank, update_branch, update_person_and_roles} = require('../controller/update');

const router = express.Router();

router.patch('/bank/:bank_id', update_bank);
router.patch('/branch/:branch_id', update_branch);
router.patch('/person/:person_id', update_person_and_roles)
module.exports =router;