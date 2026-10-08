import { app } from './app.js'

async function serverInit() {
    try{

        await app.listen({
            port: 3333
        });
        
        console.log("Servidor roando http://localhost:3333");

    }catch(erro){
        console.log("Erro no servidor: ", erro);
    }
}

serverInit();