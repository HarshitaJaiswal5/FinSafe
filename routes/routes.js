const express = require ('express');
const {registerUser, branch, registerAccountHolder ,transaction} = require('../controller/register');
const {updateUser} =require('../controller/update');
const {displayUser, displayBranch, branchUsers, login, logout} =require('../controller/display');




const router = express.Router();

router.post('/account',registerUser);
router.post('/branch',branch);
router.post('/register-account-holder',registerAccountHolder)
router.post('/transaction', transaction);





router.get('/user',displayUser);
router.get('/branch',displayBranch);

router.get('/branchUsers', branchUsers);
router.get('/login', login);  // changed to login 
router.post('/logout', logout)          // added logout 



router.put('/user',updateUser);



module.exports = router;