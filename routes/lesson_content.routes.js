const{ Router }= require('express');

const {check, header} = require('express-validator');
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
    check('order','El title no es valido').not().isEmpty().isLength({min: 2}),
    check('type','El slug es obligatorio').not().isEmpty().isLength({min: 2}),
    check('content','El description es obligatorio').not().isEmpty().isLength({min: 2}),   
    check('id_lesson','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/lesson_contentGet',[header('token').isJWT(),validarJWT,validarCampos],lesson_contentGet)

//account by id
router.get('/lesson_contentGetById/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentGetById)

router.get('/lesson_contentGetByIdLesson/:idLesson',[
    check('idSection','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentGetByIdLesson)

//Agregar Usuario
router.post('/lesson_contentPost',errores,lesson_contentPost);

//Borrar usuario por ID
router.delete('/lesson_contentDelete/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentDelete);

//Actualizar  usuario por ID
router.put('/lesson_contentPut/:id',[
    check('order','El title no es valido').isLength({min: 2}),
    check('type','El slug es obligatorio').isLength({min: 2}),
    check('content','El description es obligatorio').isLength({min: 2}),   
    check('id_lesson','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lesson_contentPut)




module.exports = router;