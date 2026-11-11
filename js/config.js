// ============================================================
// CONFIGURAÇÕES (edite aqui)
// ============================================================

// >>> NÚMERO DO WHATSAPP (DDI+DDD+número, só dígitos)
var WHATS = "5521978783878";

function fmt(n) {
  return "R$ " + Number(n).toFixed(2).replace(".", ",");
}

// >>> ITENS DO CARDÁPIO: group "lanche" aparece em "Lanches e combos"; os demais em "Açaí de garrafa"
// >>> bottles: quantas garrafinhas de açaí o item traz (padrão 1; 0 = não conta para o mínimo de entrega)
// >>> PREÇOS: edite o campo price (use ponto: 12.5 = R$ 12,50)
// >>> FOTOS: img usa a foto embutida (ninho, natural...). Para usar outra, coloque o link ou caminho dela
var FLAVORS = [
  {
    id: "ninho",
    name: "Leite Ninho",
    desc: "Açaí cremoso com leite Ninho.",
    price: 15.0,
    img: "ninho",
  },
  {
    id: "confete",
    name: "Ninho c/ Confete",
    desc: "Açaí com leite Ninho e confete.",
    price: 20.0,
    img: "confete",
  },
  {
    id: "natural",
    name: "Natural",
    desc: "Açaí puro, intenso e gelado.",
    price: 15.0,
    img: "natural",
  },
  {
    id: "nutella",
    name: "Nutella",
    desc: "Açaí com Nutella e avelãs.",
    price: 20.0,
    img: "nutella",
  },
  {
    group: "lanche",
    id: "sanduba",
    bottles: 0,
    name: "Sanduba Natural",
    desc: "Acompanha salpicão, batata palha, salada e um guaravita.",
    price: 15.0,
    img: "sanduba",
  },
  {
    group: "lanche",
    id: "combonatural",
    bottles: 1,
    name: "Combo Sanduba Natural + Açaí Natural",
    desc: "Acompanha sanduba natural + açaí natural 300ml.",
    price: 28.0,
    img: "combonatural",
  },
  {
    group: "lanche",
    id: "big2c",
    bottles: 0,
    name: "BIG 2C",
    desc: "Acompanha salpicão, cheddar, ovo de codorna, batata palha, salada e um guaravita.",
    price: 20.0,
    img: "big2c",
  },
  {
    group: "lanche",
    id: "combobig",
    bottles: 1,
    name: "BIG 2C + Açaí de Nutella",
    desc: "Acompanha o sanduba BIG 2C + açaí de Nutella 300ml.",
    price: 38.0,
    img: "combobig",
  },
];

// >>> MARMITEX DE AÇAÍ: edite os tamanhos e preços (sizes), o máximo de acompanhamentos (max) e a lista (options)
// >>> TAMANHOS DO AÇAÍ DE GARRAFA: extra = valor somado ao preço do 300ml (500ml = +R$ 5,00)
var SIZES = [
  { key: "300ml", extra: 0 },
  { key: "500ml", extra: 5 },
];

var MARMITEX = {
  name: "Marmitex de açaí",
  sizes: [
    { key: "500ml", price: 20.0 },
    { key: "1L", price: 30.0 },
  ],
  max: 4,
  img: "marmitex",
  options: ["Uva", "Banana", "Morango", "Disquete", "Leite em pó", "Confete", "Jujuba"],
};

// >>> LOCAIS DE ENTREGA E TAXAS: edite fee (taxa em R$) e min (quantidade mínima de garrafinhas de açaí; 0 = sem mínimo)
var PLACES = [
  { n: "Itaipuaçu", fee: 3, min: 0 },
  { n: "Maricá", fee: 5, min: 0 },
  { n: "Inoã", fee: 7, min: 0 },
  { n: "Niterói", fee: 0, min: 11, bairro: true },
  { n: "São Gonçalo", fee: 0, min: 11, bairro: true },
];

// >>> IMAGENS: cada chave aponta para um arquivo da pasta img/. Para trocar uma foto, substitua o arquivo
// >>> (mesmo nome) ou altere o caminho abaixo.
var IMAGES = {
  logo: "img/logo.jpg",
  hero: "img/hero.jpg",
  confete: "img/confete.jpg",
  nutella: "img/nutella.jpg",
  ninho: "img/ninho.jpg",
  natural: "img/natural.jpg",
  sanduba: "img/sanduba.jpg",
  combonatural: "img/combonatural.jpg",
  big2c: "img/big2c.jpg",
  combobig: "img/combobig.jpg",
  marmitex: "img/marmitex.jpg",
};
