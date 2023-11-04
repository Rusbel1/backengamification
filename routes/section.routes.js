const{ Router }= require('express');

const {check, header} = require('express-validator');
const {sectionGet,
    sectionGetById,
    sectionPut,
    sectionDelete,
    sectionPost } = require('../controllers/sectionController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    check('title','El title no es valido').not().isEmpty().isLength({min: 2}),
    check('slug','El slug es obligatorio').not().isEmpty().isLength({min: 2}),
    check('description','El description es obligatorio').not().isEmpty().isLength({min: 2}),   
    check('points_value','El description es obligatorio').isNumeric(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/sectionGet',[header('token').isJWT(),validarJWT,validarCampos],sectionGet)

//account by id
router.get('/sectionGetById/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],sectionGetById)
//Agregar Usuario
router.post('/sectionPost',errores,sectionPost);

//Borrar usuario por ID
router.delete('/sectionDelete/:id',[
    check('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],sectionDelete);

//Actualizar  usuario por ID
router.put('/sectionPut/:id',[
    check('title','El title no es valido').isLength({min: 2}),
    check('slug','El slug es obligatorio').isLength({min: 2}),
    check('description','El description es obligatorio').isLength({min: 2}),   
    check('points_value','El description es obligatorio').isNumeric(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
],sectionPut)




module.exports = router;