const expreess= require('express')
const {protect}= require('../middleware/authMiddleware')
const router= expreess.Router()
const {sendMessage}=require('../controllers/messageController')
const {allMessages} = require("../controllers/messageController")
router.route('/').post(protect,sendMessage)
router.route('/:chatId').get(protect,allMessages)
module.exports=router