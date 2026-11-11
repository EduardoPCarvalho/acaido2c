<div align="center">

# 🫐 2C Açaí de Garrafa

Cardápio online com montagem de pedido e envio direto pelo WhatsApp.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?logo=whatsapp&logoColor=white)

</div>

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como executar](#-como-executar)
- [Personalização](#-personalização)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Créditos](#-créditos)

---

## 📖 Sobre o projeto

**2C Açaí de Garrafa** é uma página web de catálogo e pedidos para uma delivery de açaí. O cliente escolhe os produtos, informa o endereço de entrega e envia o pedido já formatado para o WhatsApp da loja, sem precisar de cadastro, login ou servidor.

O projeto resolve o fluxo de pedidos por mensagem: o cardápio, o cálculo do total (com taxa de entrega) e as regras de entrega ficam na própria página, e o pedido chega ao estabelecimento completo e organizado.

A aplicação é um site estático, organizado em HTML, CSS, JavaScript e uma pasta de imagens.

---

## ✨ Funcionalidades

### Cardápio
- **Açaí de garrafa** em dois tamanhos (300ml e 500ml, com acréscimo de valor no maior).
- **Marmitex de açaí** em dois tamanhos (500ml e 1L), com seleção de acompanhamentos até um limite máximo.
- **Lanches e combos**: sanduíches e combos com açaí.
- Cada item tem foto, descrição, preço e controle de quantidade (−/+).

### Pedido
- Resumo do pedido com subtotal, taxa de entrega e total.
- Remoção de marmitex personalizadas já adicionadas.
- Barra fixa com a contagem de itens e atalho para o pedido.
- Mensagem do pedido gerada automaticamente e enviada via link `wa.me`.

### Entrega
- Seleção da cidade/bairro de entrega, com taxa própria para cada local.
- Quantidade mínima de garrafinhas de açaí exigida em alguns locais, com aviso de quantas faltam.
- Campo de bairro exibido apenas nos locais configurados para isso.
- O botão de envio só é liberado quando o pedido está completo (nome, rua, número e, se aplicável, bairro).

### Outros
- Botão de WhatsApp no cabeçalho para contato direto.
- Layout responsivo, com tema escuro e suporte a `prefers-reduced-motion`.

---

## 🛠️ Tecnologias utilizadas

| Categoria | Tecnologia |
|---|---|
| Marcação e estilo | HTML5, CSS3 |
| Lógica | JavaScript (vanilla, sem framework ou biblioteca) |
| Fontes | Google Fonts: Anton, Permanent Marker e DM Sans |
| Integração de pedidos | API de links do WhatsApp (`https://wa.me/`) |

> O projeto não possui backend, banco de dados, gerenciador de pacotes nem etapa de build.

---

## ✅ Pré-requisitos

- Navegador moderno.
- Conexão com a internet para carregar as fontes do Google e abrir o WhatsApp. Sem as fontes, a página usa as fontes de sistema definidas como alternativa.

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/EduardoPCarvalho/acaido2c.git
cd acaido2c
```

Ou baixe o código em **Code → Download ZIP** e extraia o conteúdo. Não há dependências para instalar.

---

## ▶️ Como executar

Como a página não usa módulos nem requisições externas além das fontes, basta abrir o arquivo `index.html` no navegador. Os scripts são carregados com `<script src>` comum, por isso não é necessário servidor.

Se preferir um servidor local:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

**Demo:** [acaido2c.vercel.app](https://acaido2c.vercel.app)

### Fluxo de uso

1. Escolha o tamanho (quando houver) e toque em **+** para adicionar itens do catálogo.
2. Monte a marmitex escolhendo o tamanho e os acompanhamentos, e toque em **Adicionar ao pedido**.
3. Em **Seu pedido**, selecione a cidade/bairro e preencha os dados de entrega.
4. Toque em **Enviar pedido no WhatsApp** para abrir a conversa com a mensagem pronta.

---

## ⚙️ Personalização

As configurações ficam no arquivo `js/config.js`, na seção marcada como `CONFIGURAÇÕES (edite aqui)`:

| Variável | O que controla |
|---|---|
| `WHATS` | Número do WhatsApp que recebe os pedidos (DDI + DDD + número, somente dígitos) |
| `FLAVORS` | Itens do cardápio: `id`, `name`, `desc`, `price` (usar ponto: `12.5` = R$ 12,50) e `img`. Itens com `group: "lanche"` aparecem em "Lanches e combos"; os demais, em "Açaí de garrafa". O campo `bottles` define quantas garrafinhas o item soma para o mínimo de entrega (padrão `1`; `0` não conta) |
| `SIZES` | Tamanhos do açaí de garrafa e o valor adicional (`extra`) somado ao preço base |
| `MARMITEX` | Tamanhos e preços (`sizes`), limite de acompanhamentos (`max`) e lista de acompanhamentos (`options`) |
| `PLACES` | Locais de entrega: nome (`n`), taxa em R$ (`fee`), mínimo de garrafinhas (`min`, `0` = sem mínimo) e `bairro: true` para pedir o bairro |

**Imagens:** ficam na pasta `img/` e são referenciadas pelo objeto `IMAGES`, no final do `js/config.js`. Para trocar uma foto, substitua o arquivo mantendo o nome (ou altere o caminho em `IMAGES`). No campo `img` de um item, use a chave de uma imagem de `IMAGES` ou informe um link/caminho de imagem.

---

## 🗂️ Estrutura do projeto

```text
acaido2c/
├── index.html        # Estrutura da página
├── css/
│   └── style.css     # Estilos
├── js/
│   ├── config.js     # Configurações: WhatsApp, cardápio, tamanhos, marmitex, locais de entrega e imagens
│   └── app.js        # Lógica do site (renderização, pedido, validação e envio ao WhatsApp)
├── img/              # Logo e fotos dos produtos
└── LICENSE           # Arquivo de licença
```

---

## 🙌 Créditos

Este projeto foi desenvolvido para um amigo, influenciador, como site de pedidos do seu negócio de açaí. As fotos exibidas no cardápio foram escolhidas e enviadas por ele para uso no site.
