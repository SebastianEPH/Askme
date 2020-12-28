const express = require('express')
const router = express.Router();

const exam = require('../controller/controller_exam')

router.get('/', exam.get_view_only_user )
router.get('/all', exam.get_view_all )
router.get('/create', exam.get_create )
router.post('/create', exam.post_create )
router.get('/start/:id', exam.get_start)    // RunOnce
router.get('/start/:id:/:is_true', exam.get_start)  // muestra pregunta perot ambien
/*
    # información
    exam_id:    Id del examen actual
    que_id:     Pregunta actual
    que_true:   Respuesta correcta de la pregunta
    que_reply:  Respuesta del usuario

    # Metadata
    que_n:      de N preguntas , en cual estamos
    que_total:  Maximo de preguntas
    attempts:   Intentos

 */
router.post('/start/:exam_id/:que_id/:que_true/:que_n/:que_total/:attempts', exam.post_start) // :


module.exports = router;