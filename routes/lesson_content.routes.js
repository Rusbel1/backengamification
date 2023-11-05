const{ Router }= require('express');

const {check, header,body,param} = require('express-validator');
const {lesson_contentGet,
    lesson_contentGetById,
    lesson_contentPut,
    lesson_contentDelete,
    lesson_contentGetByIdLesson,
    lesson_contentPost} = require('../controllers/lesson_contentController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    body('order','El title no es valido').notEmpty(),
    body('type','El slug es obligatorio').notEmpty(),
    body('content','El description es obligatorio').notEmpty(),   
    body('id_lesson','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/lesson_contentGet',[header('token').isJWT(),validarJWT,validarCampos],lesson_contentGet)

//account by id
router.get('/lesson_contentGetById/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentGetById)

router.get('/lesson_contentGetByIdLesson/:idLesson',[
    param('idSection','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentGetByIdLesson)

//Agregar Usuario
router.post('/lesson_contentPost',errores,lesson_contentPost);

//Borrar usuario por ID
router.delete('/lesson_contentDelete/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentDelete);

//Actualizar  usuario por ID
router.put('/lesson_contentPut/:id',[
    body('order','El title no es valido'),
    body('type','El slug es obligatorio'),
    body('content','El description es obligatorio'),   
    body('id_lesson','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentPut)




module.exports = router;