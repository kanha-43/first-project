const express =require("express")
const {createData,getData, deleteData, createBulkData, createSupportEmailAddressBulk, createBrandsBulk, createLocalesBulk, createPublicLocalesBulk, createTagsBulk, createDynamicContentBulk, createSchedulesBulk, createTicketFieldsBulk, createWebhooksBulk, createTriggerBulk, createAutomationsBulk, createMacrosBulk, createUserFieldsBulk, createGroupBulk, createSlaPoliciesBulk, createOrganizationsBulk, createOrganizationFieldsBulk, createTicketMasterBulk, createMainMaster, createTicketFormBulk, deleteBulk}=require("../controller/master");
const { readBrandData, readGroupData, readMainMasterData, readBrandID, readConditionAllData } = require("../controller/read");

const router = express.Router();

//read data
router.get("/getbrands",readBrandData)
router.get('/getgroups',readGroupData)
/*  */
router.post('/insert', createData);
router.post('/bulkadd',createBulkData)
router.get('/getbrandid',readBrandID)
router.get('/getcond',readConditionAllData)

//17 tables
router.post('/supportemail',createSupportEmailAddressBulk)
router.post("/brands",createBrandsBulk)
router.post("/locales",createLocalesBulk)
router.post("/allpublic",createPublicLocalesBulk)
router.post("/tags",createTagsBulk)
router.post("/dynamic",createDynamicContentBulk)
router.post("/schedules",createSchedulesBulk)
router.post("/ticketfield",createTicketFieldsBulk)
router.post("/webhooks",createWebhooksBulk)
router.post("/triggers",createTriggerBulk)
router.post("/automation",createAutomationsBulk)
router.post("/macros",createMacrosBulk)
router.post("/userfields",createUserFieldsBulk)
router.post("/groups",createGroupBulk)
router.post("/slapolicies",createSlaPoliciesBulk)
router.post("/organizations",createOrganizationsBulk)
router.post("/orgfields",createOrganizationFieldsBulk)
router.post("/ticketmaster",createTicketMasterBulk)
router.post('/ticketform',createTicketFormBulk)
//main master
router.post("/main",createMainMaster)

//delete
router.delete("/bulkdel",deleteBulk)

router.get('/getmaster/:name',readMainMasterData)

router.get('/:id',getData );
router.delete('/delete/:id',deleteData );


module.exports = router;