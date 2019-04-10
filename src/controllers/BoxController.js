/* Middleware's 'req' e 'res'*/
// req - Fornece o conteúdo da sua Database
// res - Fornece ao servidor uma resposta aquele conteúdo requisitado(req)

const Box = require('../models/Box');

class BoxController {
    async store(req, res) {
        const box = await Box.create(req.body);

        return res.json(box);
    }
    async show(req, res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1 } }/* Passando options para *
                                                 * sort ordenar em forma *
                                                 * decrescente           */
        });

        return res.json(box);
    }
}
/*store é tipo um middleware que usuário pode criar outras pastas para upload */

/* Necessário o uso de 'new' no exports para acessar
 * as instâncias da classe com seus métodos,
 * exemplo: BoxController
 */
module.exports = new BoxController();
