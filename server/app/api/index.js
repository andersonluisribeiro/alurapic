var mysql = require('mysql');

var api = {}

api.adiciona = function(req, res) {
    var foto = req.body;
    delete foto._id;

    connection().query('INSERT INTO fotos SET ?', foto, function(erro, newDoc){
      if(erro) return console.log(erro);

        console.log('Adicionado com sucesso: ' + newDoc.insertId);
        res.json(newDoc.insertId);
    });
};

api.busca = function(req, res) {
    connection().query("select * from fotos where _id = ?",[req.params.fotoId], function(err, doc) {
        if (err) return console.log(err);
        res.json(doc[0]);
    });
};

api.atualiza = function(req, res) {
    console.log('Parâmetro recebido:' + req.params.fotoId);

    foto = req.body;

    console.log(foto.titulo);

    connection().query('UPDATE fotos SET titulo = ?, descricao = ?, url = ? where _id = ?',
                            [foto.titulo, foto.descricao, foto.url, req.params.fotoId], function(err, numReplaced) {

        if (err) return console.log(err);
        if(numReplaced) res.status(200).end();
        res.status(500).end();
        console.log('Atualizado com sucesso: ' + foto._id);
        res.status(200).end();

    });
};

api.lista = function(req, res) {
    connection().query('select * from fotos', function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });
};

api.listaPorGrupo = function(req, res) {
    var grupoId = parseInt(req.params.grupoId);
    db.find({grupo: grupoId}, function(err, doc) {
        if (err) return console.log(err);
        res.json(doc);
    });

};

api.remove = function(req, res) {

    connection().query('delete from fotos where _id = ?', [req.params.fotoId], function (err, numRemoved) {
        if (err) return console.log(err);
        console.log('removido com sucesso');
        if(numRemoved) res.status(200).end();
        res.status(500).end();
    });

};

api.listaGrupos = function(req, res) {

    res.json([
        {
            _id: 1,
            nome: 'esporte'
        },
        {
            _id: 2,
            nome: 'lugares',
        },
        {
            _id: 3,
            nome: 'animais'
        }
    ]);

};

connection = function(){
    return mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'alurapic'
      });
}

module.exports = api;
