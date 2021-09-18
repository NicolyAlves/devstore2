import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try {
        let produtos = await db.tb_produto.findAll({
                             order: [[ 'id_produto', 'desc']]
                        });
                        resp.send(produtos);
    } catch (e) {
        resp.send({erro:'moiou'})
    }
})

app.post('/produto', async (req, resp) => {
    try {
        let { produto, categoria, preco_de, preco_por, avaliacao, descproduto, estoque, imgproduto, ativo, inclusao } = req.body;

        if(produto == "") {
            return resp.send({erro: 'O campo Nome é obrigatório'});
        }
        if(categoria == "") {
            return resp.send({erro: 'O campo Categoria é obrigatório'});
        }
        if(avaliacao == "") {
            return resp.send({erro: 'O campo Avaliação é obrigatório'});
        }

        if(isNaN(avaliacao)) {
            return resp.send({erro: 'O campo Avaliação não pode ter letras como valor'});
        }
        if(avaliacao <= 0) {
            return resp.send({erro: 'O campo Avaliação não pode ter um número negativo'});
        }
        if(avaliacao > 10) {
            return resp.send({erro: 'O campo Avaliação não pode ser maior que 10'});
        }

        if(imgproduto == "") {
            return resp.send({erro: 'O campo Link imagem é obrigatório'})
        }
        if( descproduto == "") {
            return resp.send({erro: 'O campo Descrição é obrigatório'})
        }
        if(preco_de == "") {
            return resp.send({erro: 'O campo Preco DE é obrigatório'})
        }
        if( preco_por == "") {
            return resp.send({erro: 'O campo Preco POR é obrigatório'})
        }
        if(estoque == "") {
            return resp.send({erro: 'O campo Estoque é obrigatório'})
        }
       


        if(isNaN(preco_de) || preco_de < 0) {
            return resp.send({erro: 'O campo Preço DE está inválido'});
        }

        if(isNaN(preco_por) || preco_por < 0) {
            return resp.send({erro: 'O campo Preço POR está inválido'});
        }

        if(isNaN(estoque) || estoque < 0) {
            return resp.send({erro: 'O campo Estoque está inválido'});
        }
       

        let r = await db.tb_produto.create({
            nm_produto: produto,
            ds_categoria: categoria,
            vl_preco_de: preco_de,
            vl_preco_por: preco_por,
            vl_avaliacao: avaliacao,
            ds_produto: descproduto,
            qtd_estoque: estoque,
            img_produto: imgproduto,
            bt_ativo: ativo,
            dt_inclusao: inclusao
        })
        resp.send(r);
    } catch (e) {
        resp.send({erro: e.toString()});
    }
        let valido  = await db.tb_produto.findOne({ where: {nm_produto: produto} });
        if (valido != null) {
            return resp.send({erro: 'Produto já existe!'});
        }    
})


app.put('/produto/:id', async (req, resp) => {
    try {   
        let { produto, categoria, preco_de, preco_por, avaliacao, descproduto, estoque, imgproduto } = req.body;
        let { id } = req.params;
      
        let r = await db.tb_produto.update(
            {
                nm_produto: produto,
                ds_categoria: categoria,
                vl_preco_de: preco_de,
                vl_preco_por: preco_por,
                vl_avaliacao: avaliacao,
                ds_produto: descproduto,
                qtd_estoque: estoque,
                img_produto: imgproduto,
                bt_ativo: ativo,
                dt_inclusao: inclusao
            },
            {
                where: {id_produto: id }
            }
        )
        resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()});
    }
})

app.delete('/produto/:id', async (req, resp) => {
        try {
            let r = await db.tb_produto.destroy({ where: { id_produto: req.params.id } });
            resp.sendStatus(200);
        } catch (e) {
            resp.send({ erro: e.toString() });
        }
})


app.listen(process.env.PORT,
           x => console.log(`Server up at port ${process.env.PORT}`))