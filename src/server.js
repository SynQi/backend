const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// cors - Permite qualquer endereço acessar essa API
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

// Separação de salas
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://sync:madruga@cluster0-8oqjc.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

/* Permitir acesso para 'io' ao conteúdo de 'req'(middleware)*/
app.use((req, res, next) => {
    req.io = io;

    return next(); /* next(Middleware) - Permite o conteúdo ir para outras rotas,
                    * sem ele, o conteúdo não sera entregue as rotas.
                    */
});
/*-----------------------------------------------------------*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Ao usuário acessar a requisição '/files', o path redicionará 
 * todo o conteúdo físico contido no diretório 'tmp'
 */
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));


server.listen(3333);