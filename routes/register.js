const express = require('express');
const {reg_bank, reg_branch, reg_person_and_roles} = require('../controller/register');

const router = express.Router();

router.post('/bank', reg_bank);
router.post('/branch', reg_branch);
router.post('/person',reg_person_and_roles);

module.exports =router;