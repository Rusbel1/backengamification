const{ Router }= require('express');

const {check, header,body,param} = require('express-validator');
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
    check('id_usuario','El correo no es valido').isMongoId().notEmpty(),
    check('id_section','El first_name es obligatorio').notEmpty(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/User_sectionGet',[header('token').isJWT(),validarJWT,validarCampos],User_sectionGet)
router.get('/User_sectionGetByUsuario/:idUsuario',[param('idUsuario','No es un ID valido de MongoDB').isMongoId().notEmpty(),
                                    header('token').isJWT(),validarJWT,validarCampos],User_sectionGetByUsuario)

router.get('/User_sectionGetBySection/:idSection',[param('idSection','No es un ID valido de MongoDB').isMongoId().notEmpty(),
                                    header('token').isJWT(),validarJWT,validarCampos],User_sectionGetBySection)

//account by id tabla
router.get('/User_sectionGetById/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],User_sectionGetById)
//Agregar Usuario
router.post('/User_sectionPost',errores,User_sectionPost);

//Borrar usuario por ID de la tabla
router.delete('/User_sectionDelete/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],User_sectionDelete);

//Actualizar  usuario por ID
router.put('/User_sectionPut/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
    body('id_usuario','El correo no es valido').isMongoId(),
    body('id_section','El first_name es obligatorio').isMongoId(),
    body('completed','El first_lastname es obligatorio').isBoolean(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],User_sectionPut)




module.exports = router;