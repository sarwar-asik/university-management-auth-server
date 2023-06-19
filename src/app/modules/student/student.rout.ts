import express from 'express'
import { StudentController } from './student.controller'




const router = express.Router()

router.get('/',StudentController.getAllStudents)
router.get('/:id',StudentController.getAllStudents)
router.delete('/:id',StudentController.deleteStudent)




// router.get("/",userController.getUser)

export const studentRouter = router
