const{ Router }= require('express');

const {check, header} = require('express-validator');
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
    check('type','El title no es valido').not().isEmpty().isLength({min: 2}),
    check('ovamessage','El slug es obligatorio').not().isEmpty().isLength({min: 2}),
    check('ovaside','El description es obligatorio').not().isEmpty().isLength({min: 2}),   
    check('id_section','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/lessonGet',[header('token').isJWT(),validarJWT,validarCampos],lessonGet)

//account by id
router.get('/lessonGetById/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonGetById)

router.get('/lessonGetByIdSection/:idSection',[
    check('idSection','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonGetByIdSection)

//Agregar Usuario
router.post('/lessonPost',errores,lessonPost);

//Borrar usuario por ID
router.delete('/lessonDelete/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonDelete);

//Actualizar  usuario por ID
router.put('/lessonPut/:id',[
    check('type','El title no es valido').isLength({min: 2}),
    check('ovamessage','El slug es obligatorio').isLength({min: 2}),
    check('ovaside','El description es obligatorio').isLength({min: 2}),   
    check('id_section','El description es obligatorio').isMongoId(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
],lessonPut)




module.exports = router;