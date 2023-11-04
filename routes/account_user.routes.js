const{ Router }= require('express');

const {check} = require('express-validator');
const { user_accGet,
    user_accPut,
    user_accDelete,
    user_accPost,
    user_accGetById } = require('../controllers/account_userController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    check('mail','El correo no es valido').isEmail(),
    check('password','El nombre1 es obligatorio').not().isEmpty(),
    check('password','Tiene que ser mas de 6 letras').isLength({min: 6}),
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/user_accGet',[header('token').isJWT(),validarJWT,validarCampos],user_accGet)

//account by id
router.get('/user_accGetById/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],user_accGetById)
//Agregar Usuario
router.post('/user_accPost',errores,user_accPost);

//Borrar usuario por ID
router.delete('/user_accDelete/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],user_accDelete);

//Actualizar  usuario por ID
router.put('/user_accPut/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    check('mail','El correo no es valido').isEmail(),
    check('password','El nombre1 es obligatorio').not().isEmpty(),
    check('password','Tiene que ser mas de 6 letras').isLength({min: 6}),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],user_accPut)




module.exports = router;