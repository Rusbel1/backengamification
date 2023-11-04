const{ Router }= require('express');

const {check, header} = require('express-validator');
const {User_sectionPost,
    User_sectionDelete,
    User_sectionPut,
    User_sectionGetById,
    User_sectionGetBySection,
    User_sectionGetByUsuario,
    User_sectionGet } = require('../controllers/user_sectionController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    check('id_usuario','El correo no es valido').isMongoId(),
    check('id_section','El first_name es obligatorio').not().isEmpty().isLength({min: 2}),
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/User_sectionGet',[header('token').isJWT(),validarJWT,validarCampos],User_sectionGet)
router.get('/User_sectionGetByUsuario/:idUsuario',[check('idUsuario','No es un ID valido de MongoDB').isMongoId(),
                                    header('token').isJWT(),validarJWT,validarCampos],User_sectionGetByUsuario)

router.get('/User_sectionGetBySection/:idSection',[check('idSection','No es un ID valido de MongoDB').isMongoId(),
                                    header('token').isJWT(),validarJWT,validarCampos],User_sectionGetBySection)

//account by id
router.get('/User_sectionGetById/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],User_sectionGetById)
//Agregar Usuario
router.post('/User_sectionPost',errores,User_sectionPost);

//Borrar usuario por ID
router.delete('/User_sectionDelete/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],User_sectionDelete);

//Actualizar  usuario por ID
router.put('/User_sectionPut/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    check('id_usuario','El correo no es valido').isMongoId(),
    check('id_section','El first_name es obligatorio').isMongoId(),
    check('completed','El first_lastname es obligatorio').isBoolean(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],User_sectionPut)




module.exports = router;