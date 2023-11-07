const{ Router }= require('express');

const {check, header,body,param} = require('express-validator');
const {lessonGet,
    lessonGetById,
    lessonPut,
    lessonDelete,
    lessonGetByIdSection,
    lessonPost } = require('../controllers/lessonController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    body('type','El title no es valido').notEmpty(),
    body('ovamessage','El slug es obligatorio').notEmpty(),
    body('ovaside','El description es obligatorio').notEmpty(),   
    body('id_section','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/lessonGet',[header('token').isJWT(),validarJWT,validarCampos],lessonGet)

//account by id
router.get('/lessonGetById/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonGetById)

router.get('/lessonGetByIdSection/:idSection',[
    param('idSection','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonGetByIdSection)


router.post('/lessonPost',errores,lessonPost);

//Borrar usuario por ID
router.delete('/lessonDelete/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonDelete);

//Actualizar  usuario por ID
router.put('/lessonPut/:id',[
    body('type','El title no es valido'),
    body('ovamessage','El slug es obligatorio'),
    body('ovaside','El description es obligatorio'),   
    body('id_section','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonPut)




module.exports = router;