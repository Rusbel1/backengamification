const{ Router }= require('express');

const {check,body,param,header} = require('express-validator');
const {usuariosGet,
    usuariosGetById,
    usuariosPut,
    usuariosDelete,
    usuariosGetByIdAcc,
    usuariosPost,
    infoUsuariosByToken } = require('../controllers/usuarioController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    body('first_name','El first_name es obligatorio').notEmpty(),
    body('first_lastname','El first_lastname es obligatorio').notEmpty(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/usuariosGet',[header('token').isJWT(),validarJWT],usuariosGet)
router.get('/usuariosGetByIdAcc/:id',[check('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
                                    header('token').isJWT(),validarJWT,validarCampos],usuariosGetByIdAcc)


router.get('/usuariosByToken',[header('token').isJWT(),validarJWT,validarCampos],infoUsuariosByToken)

//account by id
router.get('/usuariosGetById/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],usuariosGetById)
//Agregar Usuario
router.post('/usuariosPost',usuariosPost);

//Borrar usuario por ID
router.delete('/usuariosDelete/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],usuariosDelete);

//Actualizar  usuario por ID
router.put('/usuariosPut/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId().notEmpty(),
    body('points_user').isNumeric(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],usuariosPut)




module.exports = router;