const{ Router }= require('express');

const {check, header,body,param} = require('express-validator');
const {sectionGet,
    sectionGetById,
    sectionPut,
    sectionDelete,
    sectionPost } = require('../controllers/sectionController');
const {validarJWT} = require('../middlewares/validar-jwt');
const {validarCampos} = require('../middlewares/validar-campos');

const router = Router();

const errores = [
    body('title','El title no es valido').notEmpty(),
    body('slug','El slug es obligatorio').notEmpty(),
    body('level','El slug es obligatorio').notEmpty(),
    body('description','El description es obligatorio').notEmpty(),   
    body('points_value','El description es obligatorio').isNumeric(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
]
//Obtener usuario
router.get('/sectionGet',[header('token').isJWT(),validarJWT,validarCampos],sectionGet)

//account by id
router.get('/sectionGetById/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],sectionGetById)
//Agregar Usuario
router.post('/sectionPost',errores,sectionPost);

//Borrar usuario por ID
router.delete('/sectionDelete/:id',[
    param('id','No es un ID valido de MongoDB').isMongoId(),
    header('token').isJWT(),
    validarJWT,
    validarCampos
],sectionDelete);

//Actualizar  usuario por ID
router.put('/sectionPut/:id',[
    body('title','El title no es valido'),
    body('slug','El slug es obligatorio'),
    body('description','El description es obligatorio'),   
    body('points_value','El description es obligatorio').isNumeric(),        
    header('token').isJWT(),
    validarJWT,
    validarCampos
],sectionPut)




module.exports = router;