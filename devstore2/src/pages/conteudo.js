import { Container } from './styled'
import "./styled.js";

import { useState, useEffect, useRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import LoadingBar from 'react-top-loading-bar'

import Api from '../service/api.js';
const api = new Api ();

export default function App() {


const [ produtos, setProdutos ] = useState([]);

const [ produto, setProduto ] = useState('');
const [ categoria, setCategoria ] = useState('');
const [ precode, setPrecoDe ] = useState('') ;
const [ precopor, setPrecoPor ] = useState('');
const [ avaliacao, setAvaliacao] = useState('');
const [ descproduto, setDescProduto ] = useState('');
const [ estoque, setEstoque ] = useState('');
const [ imgproduto, setImgProduto ] = useState('');
const [ idAlterando, setIdAlterando ] = useState(0);

const loading = useRef(null);


async function listar() {
    let r = await api.listar();
    setProdutos(r);
}

async function inserirProduto(){
    console.log('help2');

    if (idAlterando === 0) {
        let r = await api.inserir(produto, categoria, precode, precopor, avaliacao, descproduto, estoque, imgproduto);
        console.log('help')

            if (r.erro) {
            toast.dark(r.erro);
            } else
            toast.dark('💓 Produto inserido!');
            }
            else {
            console.log('roi bodia')
            let r = await api.alterar(idAlterando, produto, categoria, precode, precopor, avaliacao, descproduto, estoque, imgproduto);
            
            if (r.erro){
            toast.error(r.erro);
            } else {
            toast.dark('💓 Produto Alterado!');
            }
        }
        limparCampos();
        console.log("passou pelo limpar")
        listar();
}

const limparCampos = () => { 
    setProduto('');
    setCategoria('');
    setPrecoDe('');
    setPrecoPor(''); 
    setAvaliacao(''); 
    setDescProduto(''); 
    setEstoque('');
    setImgProduto('');
    setIdAlterando(0); 
};


async function remover(id) {
    loading.current.continuousStart();
    confirmAlert({
        title: 'Remover produto',
        message: `Tem certeza que deseja remover o produto ${id}?`,
        buttons: [
            {
                label: 'Sim',
                onClick: async () => {
                    let r = await api.remover(id);
                    if (r.erro)
                        toast.error(`${r.erro}`);
                    else {
                        toast.dark('💓 Produto removido!');
                        listar();
                    }

                }
            },
            {
                label: 'Não'
            }
        ]
    });


    loading.current.complete();
}




async function editar (item) { 
    loading.current.continuousStart();

    setProduto(item.nm_produto);
    setCategoria(item.ds_categoria);
    setPrecoDe(item.vl_preco_de);
    setPrecoPor(item.vl_preco_por); 
    setAvaliacao(item.vl_avaliacao); 
    setDescProduto(item.ds_produto);
    setEstoque(item.qtd_estoque);
    setImgProduto(item.img_produto);

    setIdAlterando(item.id_produto);

    console.log(item);

    loading.current.complete();
}

useEffect(() => {
    listar();
}, []);

return (
    <Container>
        <ToastContainer />
        <LoadingBar color="red" ref={loading}/>
     <div className="conteiner">
        <div className="barra-lateral">
            <div className="logo"><img src="../public/assets/images/logo.svg" alt=""/><div className="azul">Dev</div>Store</div>
            <div style={{height: '5vh'}}></div>
            <div className="gerenciamento">
                Gerenciamento <img src="../public/assets/images/Vectorssdsadsa.svg" alt=""/>
            </div>
            <div className="produtos">
                <img src="../public/assets/images/Rectangle 14.svg"alt=""/><p>Produtos</p>
            </div>
        </div> 
        <div className="tela-principal">   
                <div className="cabecalho">
                    <div className="usuario"><img src="../public/assets/images/usuario.svg"alt=""/>&nbsp;&nbsp;Olá, Bruno de Oliveira</div>
                    <div className="botoes-cab">
                        <button><img src="../public/assets/images/refresh.svg"alt=""/></button>
                    </div>
                    <div className="botoes-cab">
                        <button>&nbsp;<img src="../public/assets/images/log-out.svg"alt=""/></button>
                    </div>
                </div>

                    <div className="novo-produto">
                        <div className="bn-titulo"><img src="../public/assets/images/Rectangle 14.svg"alt=""/><p style={{marginLeft: "0.5em"}} > {idAlterando === 0 ? 'Novo Produto' : 'Alterando Produto' + idAlterando}</p></div>
                        <form>
                            <div className="lado-lado">
                                <div className="direita">   
                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nome:&nbsp;<input type="text" value={produto} onChange={(e) => setProduto(e.target.value)}/></div>
                                    <div>Categoria:&nbsp;<input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)}/></div>
                                    <div>Avaliação:&nbsp;<input type="text" value={avaliacao} onChange={(e) => setAvaliacao(e.target.value)}/></div>
                                </div>
                                <div className="esquerdo">
                                    <div>Preço DE:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" value={precode} onChange={(e) => setPrecoDe(e.target.value)}/></div>
                                    <div>Preço POR:&nbsp;&nbsp;<input type="text" value={precopor} onChange={(e) => setPrecoPor(e.target.value)}/></div>
                                    <div>Estoque:&nbsp;&nbsp;<input type="text" value={estoque} onChange={(e) => setEstoque(e.target.value)}/></div>
                                </div>
                            </div>
                            <div className="baixo">
                                <div>Link Imagem:<input type="text" value={imgproduto} onChange={(e) => setImgProduto(e.target.value)}/></div>
                            </div>
                        <div style={{fontWeight: "700", color: "#615858" }}>Descrição:<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea type="text" style={{border: "1px solid rgb(43, 43, 43)", borderRadius: "5px"}} value={descproduto} onChange={(e) => setDescProduto(e.target.value)}></textarea>
                        <button style={{backgroundColor: "#119FDC", border:"none", padding: "0.8em", marginLeft: "1em", borderRadius: "20px", color: "white", fontWeight:"700" }} onClick={inserirProduto}> {idAlterando === 0 ? 'Cadastrar' : 'Alterar'}</button></div>
                        </form>
                    </div>
                    <div className="produto-cadastrado">
                        <div className="bc-titulo"><img src="../public/assets/images/Rectangle 14.svg"alt=""/><p>Produtos Cadastrados</p></div>
                        <table className="tabela">
                            <thead>
                                    <tr>
                                        <th></th>
                                        <th>ID</th>
                                        <th>Produto</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Estoque</th>
                                        <th className="coluna-acao"> </th>
                                        <th className="coluna-acao"> </th>
                                    </tr>
                            </thead>
                            <tbody>
                              {produtos.map((item, i) => 
                                <tr className={ i % 2 === 0 ? "linha-alternada" : ""}>
                                    <td title={item.img_produto}>
                                        <img src={item.img_produto} alt="" style={{ height:'48px', width: '40px' }}/>
                                    </td>
                                    <td>{item.id_produto}</td>
                                    <td title={item.nm_produto}>{item.nm_produto != null && item.nm_produto.length >= 20
                                            ?   item.nm_produto.substr(0,25) + '...'
                                            :   item.nm_produto}
                                    </td>
                                    <td>{item.ds_categoria}</td>
                                    <td>{item.vl_preco_por}</td>
                                    <td>{item.qtd_estoque}</td>

                                    <td className="bonito"><button  onClick={() => editar(item) }><img src="../public/assets/images/editar.svg" alt=""/></button></td>
                                    <td className="bonito"><button  onClick={() => remover(item.id_produto) }><img src="../public/assets/images/lixo.svg" alt=""/></button></td>    
                                </tr>
                              )}

                            </tbody> 
                        </table>
                        
                    </div>
            </div>
        </div>
    </Container>
)
}