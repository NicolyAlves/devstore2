import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})
export default class Api {
    async listar () {
        let r = await api.get(`/produto`);
        return r.data;
    }

    async inserir (produto, categoria, preco_de, preco_por, avaliacao, descproduto, estoque, imgproduto, ativo, inclusao) {
        let r = await api.post(`/matricula`, { produto, categoria, preco_de, preco_por, avaliacao, descproduto, estoque, imgproduto, ativo, inclusao });
        return r.data;
    }

    async alterar (id, produto, categoria, preco_de, preco_por, avaliacao, descproduto, estoque, imgproduto, ativo, inclusao){
        let r = await api.put(`/matricula/` + id, produto, categoria, preco_de, preco_por, avaliacao, descproduto, estoque, imgproduto, ativo, inclusao);
        return r.data;
    }

    async remover(id){
        let r = await api.delete(`/matricula` + id);
        return r.data;
    }

}