import controllers from './controllers'
import * as express from 'express'
import {validate} from "./helpers/validator";
import {DataCreateDto} from "./dtos/DataCreateDto";
import {DataUpdateDto} from "./dtos/DataUpdateDto";

const { DataController } = controllers

const router = express.Router()

router.route('/data').get(DataController.getAllData)
router.route('/data/parse').post(DataController.parse)
router.route('/data/update').post([validate(DataUpdateDto), DataController.updateData])
router.route('/data/delete/:id').delete(DataController.deleteData)

export default router
