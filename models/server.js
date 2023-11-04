const express = require('express');
require('dotenv').config();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const {dbConnection} = require('../database/config');
const routesAccount_user = require('../routes/account_user.routes');
const routesLesson_content = require('../routes/lesson_content.routes');
const routesLesson = require('../routes/lesson.routes');
const routeLogin = require('../routes/login.routes');
const routesSection = require('../routes/section.routes');
const routesUser_section = require('../routes/user_section.routes');
const routesUsuario = require('../routes/usuario.routes');



//const socketIO = require("socket.io");

class server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        //DB
        this.conectarDB();

        //Middlewares
        this.middlewares();
                
        //Rutas de mi aplicacion
        this.routes();

        //this.sockets();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        
        this.app.use(cors());//cors
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

   

    routes(){
        
        //this.app.use(routesCategoria);
        this.app.use(routesAccount_user);
        this.app.use(routesLesson_content);
        this.app.use(routesLesson);
        this.app.use(routeLogin);
        this.app.use(routesSection);
        this.app.use(routesUser_section);
        this.app.use(routesUsuario);
       
                
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`SERVIDOR CORRIENDO EN http://localhost:${this.port}/`);
        });
    }

}

module.exports=server;