// 1. Inicia o carrinho buscando o que está salvo no navegador (localStorage)
let carrinho = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

// 2. Dicionário de fotos: AJUSTADO COM OS NOMES QUE VOCÊ PEDIU
const imagensDosProdutos = {
    "Caneca Personalizada": ["Imagens/canecaM.jpeg", "Imagens/caneca_detalhe1.jpg"],
    "Caneca Personagens": ["Imagens/canecaL.jpeg"],
    "Kit Canecas": ["Imagens/canecas.jpeg"],
    
    // AQUI ESTÁ A CORREÇÃO DA CAMISETA
    "Camiseta Personalizada": [
        "Imagens/camisetareal.jpeg", // Sua foto principal
        "Imagens/real2.jpeg"         // Sua segunda foto (miniatura)
    ],
    
    "Almofada 30x30": ["Imagens/ALM.jpeg", "Imagens/almofada_detalhe.jpg"],
    "Almofada de Pescoço": ["Imagens/almpes.jpg"],
    "Almofada Personagens": ["Imagens/almpers.jpg"],
    "Máscara de Dormir": ["Imagens/masc.jpg"],
    "Pantufa Personalizada": ["Imagens/pantufa.jpg"],
    "Pijama Infantil": ["Imagens/pijamainf.png"],
    "Almochaveiro": ["Imagens/almochaveiro.jpg"],
    "Chaveiro de Acrílico": ["Imagens/acrílico.png"]
};

// 3. Função para atualizar o visual do carrinho (lista e contador)
function atualizarCarrinho() {
    let lista = document.getElementById("listaCarrinho");
    let contador = document.getElementById("contagem-carrinho");

    if (lista) {
        lista.innerHTML = "";
        carrinho.forEach((item, index) => {
            let li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.padding = "10px";
            li.style.borderBottom = "1px solid #eee";
            
            li.innerHTML = `
                <strong>${item.nome}</strong> ${item.detalhes !== 'Padrão' ? '('+item.detalhes+')' : ''} 
                <button onclick="removerItem(${index})" style="float:right; border:none; background:none; cursor:pointer;">❌</button>
            `;
            lista.appendChild(li);
        });
    }

    if (contador) {
        contador.innerText = carrinho.length;
    }

    localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
}

// 4. Funções para Adicionar Itens
function adicionarDireto(nome, idSeletor) {
    const seletor = document.getElementById(idSeletor);
    const tamanho = seletor ? seletor.value : "Padrão";
    carrinho.push({ nome: nome, detalhes: tamanho });
    atualizarCarrinho();
    alert(nome + " (" + tamanho + ") adicionado!");
}

function adicionarSimples(nome) {
    carrinho.push({ nome: nome, detalhes: "Padrão" });
    atualizarCarrinho();
    alert(nome + " adicionado ao carrinho!");
}

function adicionarDoModal() {
    let nome = document.getElementById('modalNome').innerText;
    adicionarSimples(nome);
    fecharModal();
}

// 5. Função para Remover Item
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// 6. Funções do Modal e Galeria
function abrirModal(nomeDoProduto) {
    const modal = document.getElementById('modalProduto');
    const container = document.getElementById('miniaturasContainer');
    const fotoPrincipal = document.getElementById('fotoPrincipal');
    const nomeModal = document.getElementById('modalNome');
    
    if (!modal || !container) return;

    nomeModal.innerText = nomeDoProduto;
    container.innerHTML = ''; 
    modal.style.display = "block";

    const fotos = imagensDosProdutos[nomeDoProduto];
    if (fotos && fotos.length > 0) {
        fotoPrincipal.src = fotos[0];

        fotos.forEach(path => {
            let img = document.createElement('img');
            img.src = path;
            img.style.cssText = "width: 60px; height: 60px; cursor: pointer; border: 1px solid #ddd; object-fit: cover; border-radius: 5px;";
            img.onclick = function() { fotoPrincipal.src = path; };
            container.appendChild(img);
        });
    }
}

function fecharModal() {
    document.getElementById('modalProduto').style.display = "none";
}

window.onclick = function(event) {
    let modal = document.getElementById('modalProduto');
    if (event.target == modal) {
        fecharModal();
    }
}

// 7. Finalizar e mandar para o WhatsApp
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let numero = "5541991530405"; 
    let mensagem = "Olá! Gostaria de fazer o seguinte pedido:%0A%0A";

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} [${item.detalhes}]%0A`;
    });

    let url = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(url, '_blank');
}

atualizarCarrinho();