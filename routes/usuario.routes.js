const{ Router }= require('express');

const {check, header} = require('express-validator');
const {usuariosGet,
    usuariosGetById,
    usuariosPut,
    usuariosDelete,
    usuariosGetByIdAcc,
    usuariosPost } = require('../controllers/usuarioController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    check('id_account_user','El correo no es valido').isMongoId(),
    check('first_name','El first_name es obligatorio').not().isEmpty().isLength({min: 2}),
    check('first_lastname','El first_lastname es obligatorio').not().isEmpty().isLength({min: 2}),
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/usuariosGet',[header('token').isJWT(),validarJWT],usuariosGet)
router.get('/usuariosGetByIdAcc/:id',[check('id','No es un ID valido de MongoDB').isMongoId(),
                                    header('token').isJWT(),validarJWT,validarCampos],usuariosGetByIdAcc)

//account by id
router.get('/usuariosGetById/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],usuariosGetById)
//Agregar Usuario
router.post('/usuariosPost',errores,usuariosPost);

//Borrar usuario por ID
router.delete('/usuariosDelete/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],usuariosDelete);

//Actualizar  usuario por ID
router.put('/usuariosPut/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    check('id_account_user','El correo no es valido').isMongoId(),
    check('first_name','El first_name es obligatorio').isLength({min: 2}),
    check('first_lastname','El first_lastname es obligatorio').isLength({min: 2}),
    check('points_user').isNumeric(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],usuariosPut)




module.exports = router;