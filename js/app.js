// ------------------------------------------------------------
// CÓDIGO DO SITE (não precisa editar daqui para baixo)
// ------------------------------------------------------------
function init() {
  document.getElementById("logo").src = IMAGES.logo;
  document.getElementById("heroImg").src = IMAGES.hero;
  var qty = {},
    sel = {},
    msel = MARMITEX.sizes[0].key;
  function isAcai(f) {
    return (f.group || "acai") == "acai";
  }
  function keyOf(f, size) {
    return isAcai(f) ? f.id + "|" + size : f.id;
  }
  function priceOf(f, size) {
    var extra = 0;
    if (isAcai(f))
      SIZES.forEach(function (z) {
        if (z.key == size) extra = z.extra;
      });
    return f.price + extra;
  }
  FLAVORS.forEach(function (f) {
    sel[f.id] = SIZES[0].key;
    (isAcai(f)
      ? SIZES.map(function (z) {
          return z.key;
        })
      : [""]
    ).forEach(function (z) {
      qty[keyOf(f, z)] = 0;
    });
  });
  function renderGrid(gridId, group) {
    document.getElementById(gridId).innerHTML = FLAVORS.filter(function (f) {
      return (f.group || "acai") == group;
    })
      .map(function (f) {
        var sizes = isAcai(f)
          ? '<div class="sizes" role="group" aria-label="Tamanho">' +
            SIZES.map(function (z) {
              return (
                '<button type="button" class="sz" data-f="' +
                f.id +
                '" data-sz="' +
                z.key +
                '" aria-pressed="false">' +
                z.key +
                "</button>"
              );
            }).join("") +
            "</div>"
          : "";
        return (
          '<article class="card"><img src="' +
          (IMAGES[f.img] || f.img) +
          '" alt="' +
          f.name +
          '"><div class="body"><div class="hd"><h3>' +
          f.name +
          '</h3><span class="price" id="p-' +
          f.id +
          '"></span></div><p>' +
          f.desc +
          "</p>" +
          sizes +
          '<div class="qty"><button aria-label="Tirar ' +
          f.name +
          '" data-f="' +
          f.id +
          '" data-d="-1">−</button><b id="q-' +
          f.id +
          '">0</b><button aria-label="Adicionar ' +
          f.name +
          '" data-f="' +
          f.id +
          '" data-d="1">+</button></div><p class="other" id="o-' +
          f.id +
          '"></p></div></article>'
        );
      })
      .join("");
  }
  renderGrid("grid", "acai");
  renderGrid("grid2", "lanche");
  var customs = [],
    chosen = {};
  document.getElementById("mImg").src = IMAGES[MARMITEX.img] || MARMITEX.img;
  function mPriceNow() {
    var p = 0;
    MARMITEX.sizes.forEach(function (z) {
      if (z.key == msel) p = z.price;
    });
    return p;
  }
  function renderM() {
    document.getElementById("mPrice").textContent = fmt(mPriceNow());
    document.querySelectorAll("[data-ms]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.ms == msel);
    });
  }
  document.getElementById("msizes").innerHTML = MARMITEX.sizes
    .map(function (z) {
      return (
        '<button type="button" class="sz" data-ms="' +
        z.key +
        '" aria-pressed="false">' +
        z.key +
        "</button>"
      );
    })
    .join("");
  document.getElementById("msizes").addEventListener("click", function (e) {
    var b = e.target.closest("[data-ms]");
    if (!b) return;
    msel = b.dataset.ms;
    renderM();
  });
  renderM();
  document.getElementById("chips").innerHTML = MARMITEX.options
    .map(function (o) {
      return (
        '<button type="button" class="chip" aria-pressed="false" data-o="' +
        o +
        '">' +
        o +
        "</button>"
      );
    })
    .join("");
  document.getElementById("mHint").textContent =
    "Escolha até " + MARMITEX.max + " acompanhamentos e toque em adicionar.";
  function refreshChips() {
    var n = MARMITEX.options.filter(function (o) {
      return chosen[o];
    }).length;
    document.querySelectorAll(".chip").forEach(function (c) {
      var on = !!chosen[c.dataset.o];
      c.setAttribute("aria-pressed", on);
      c.disabled = !on && n >= MARMITEX.max;
    });
    document.getElementById("mCount").textContent =
      n +
      " de " +
      MARMITEX.max +
      " escolhidos" +
      (n >= MARMITEX.max ? " (limite atingido)" : "");
  }
  document.getElementById("chips").addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b || b.disabled) return;
    chosen[b.dataset.o] = !chosen[b.dataset.o];
    refreshChips();
  });
  refreshChips();
  document.getElementById("mAdd").addEventListener("click", function () {
    var opts = MARMITEX.options.filter(function (o) {
      return chosen[o];
    });
    customs.push({
      label:
        MARMITEX.name +
        " " +
        msel +
        (opts.length ? " (" + opts.join(", ") + ")" : " (só açaí)"),
      price: mPriceNow(),
    });
    chosen = {};
    refreshChips();
    var btn = this;
    btn.textContent = "Adicionado ✓";
    setTimeout(function () {
      btn.textContent = "Adicionar ao pedido";
    }, 1200);
    update();
  });
  document.getElementById("list").addEventListener("click", function (e) {
    var b = e.target.closest("[data-rm]");
    if (!b) return;
    customs.splice(Number(b.dataset.rm), 1);
    update();
  });
  var clickFn = function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    var id = b.dataset.f,
      f = FLAVORS.filter(function (x) {
        return x.id == id;
      })[0];
    if (b.dataset.sz) {
      sel[id] = b.dataset.sz;
      update();
      return;
    }
    var k = keyOf(f, sel[id]);
    qty[k] = Math.max(0, qty[k] + Number(b.dataset.d));
    update();
  };
  ["grid", "grid2"].forEach(function (g) {
    document.getElementById(g).addEventListener("click", clickFn);
  });
  ["city", "nome", "rua", "num", "bairro", "comp"].forEach(function (i) {
    document.getElementById(i).addEventListener("input", update);
  });
  function v(i) {
    return document.getElementById(i).value.trim();
  }
  function link(t) {
    return "https://wa.me/" + WHATS + (t ? "?text=" + encodeURIComponent(t) : "");
  }
  document.getElementById("waTop").href = link("Olá! Quero fazer um pedido na 2C.");
  document.getElementById("city").innerHTML =
    '<option value="">Selecione</option>' +
    PLACES.map(function (p) {
      return "<option>" + p.n + "</option>";
    }).join("");
  document.getElementById("deliv").innerHTML = PLACES.map(function (p) {
    return (
      "<div" +
      (p.fee ? ' class="on"' : "") +
      "><h3>" +
      p.n +
      "</h3><p>" +
      (p.min ? "Entrega acima de " + (p.min - 1) + " garrafinhas de açaí. " : "") +
      (p.fee ? "Taxa de entrega: " + fmt(p.fee) + "." : "Sem taxa de entrega.") +
      "</p></div>"
    );
  }).join("");
  var fees = PLACES.filter(function (p) {
    return p.fee;
  }).map(function (p) {
    return p.fee;
  });
  document.getElementById("feeBanner").textContent = fees.length
    ? "Taxa de entrega a partir de " + fmt(Math.min.apply(null, fees))
    : "Sem taxa de entrega";
  function place() {
    var c = v("city");
    return PLACES.filter(function (p) {
      return p.n == c;
    })[0];
  }
  function update() {
    var total = 0,
      bottles = 0,
      sum = 0,
      items = [];
    FLAVORS.forEach(function (f) {
      var cur = sel[f.id];
      (isAcai(f)
        ? SIZES.map(function (z) {
            return z.key;
          })
        : [""]
      ).forEach(function (z) {
        var n = qty[keyOf(f, z)];
        if (n) {
          total += n;
          bottles += n * (f.bottles === undefined ? 1 : f.bottles);
          sum += n * priceOf(f, z);
          items.push([f.name + (z ? " " + z : ""), n, priceOf(f, z)]);
        }
      });
      document.getElementById("q-" + f.id).textContent = qty[keyOf(f, cur)];
      document.getElementById("p-" + f.id).textContent = fmt(priceOf(f, cur));
      if (isAcai(f)) {
        var other = "";
        SIZES.forEach(function (z) {
          if (z.key != cur && qty[keyOf(f, z.key)])
            other += qty[keyOf(f, z.key)] + "x " + z.key + " no pedido. ";
        });
        document.getElementById("o-" + f.id).textContent = other;
        document.querySelectorAll('[data-f="' + f.id + '"][data-sz]').forEach(function (bt) {
          bt.setAttribute("aria-pressed", bt.dataset.sz == cur);
        });
      }
    });
    customs.forEach(function (c, i) {
      total++;
      sum += c.price;
      items.push([c.label, 1, c.price, i]);
    });
    var pl = place(),
      fee = pl ? pl.fee : 0;
    document.getElementById("bairroBox").hidden = !(pl && pl.bairro);
    var html = items
      .map(function (i) {
        return (
          "<li><span>" +
          i[0] +
          "</span><b>" +
          i[1] +
          "x · " +
          fmt(i[1] * i[2]) +
          (i[3] !== undefined
            ? ' <button type="button" class="rm" data-rm="' +
              i[3] +
              '" aria-label="Remover">×</button>'
            : "") +
          "</b></li>"
        );
      })
      .join("");
    if (total) {
      if (pl)
        html +=
          "<li><span>Entrega (" +
          pl.n +
          ")</span><b>" +
          (fee ? fmt(fee) : "Sem taxa") +
          "</b></li>";
      html += "<li><b>Total</b><b>" + fmt(sum + fee) + "</b></li>";
    }
    document.getElementById("list").innerHTML = html;
    document.getElementById("empty").style.display = total ? "none" : "block";
    document.getElementById("bar").classList.toggle("on", total > 0);
    document.getElementById("barN").textContent = total + (total == 1 ? " item" : " itens");
    var msg = document.getElementById("msg"),
      ok = false;
    if (!total) {
      msg.textContent = "";
      msg.className = "msg";
    } else if (!pl) {
      msg.textContent = "Escolha a cidade / bairro de entrega.";
      msg.className = "msg";
    } else if (pl.min && bottles < pl.min) {
      msg.textContent =
        "Para " +
        pl.n +
        " entregamos acima de " +
        (pl.min - 1) +
        " garrafinhas de açaí. Faltam " +
        (pl.min - bottles) +
        " garrafinha(s) para liberar.";
      msg.className = "msg bad";
    } else if (!v("nome") || !v("rua") || !v("num") || (pl.bairro && !v("bairro"))) {
      msg.textContent =
        "Preencha seu nome, rua, número" + (pl.bairro ? " e bairro" : "") + ".";
      msg.className = "msg";
    } else {
      msg.textContent = "Tudo certo! Toque no botão para enviar.";
      msg.className = "msg good";
      ok = true;
    }
    var sd = document.getElementById("send");
    sd.setAttribute("aria-disabled", ok ? "false" : "true");
    if (ok) {
      sd.href = link(
        "Olá! Quero fazer um pedido na 2C Açaí de Garrafa:\n" +
          items
            .map(function (i) {
              return "• " + i[1] + "x " + i[0] + " (" + fmt(i[1] * i[2]) + ")";
            })
            .join("\n") +
          "\n\nSubtotal: " +
          fmt(sum) +
          "\nTaxa de entrega: " +
          (fee ? fmt(fee) : "sem taxa") +
          "\nTotal: " +
          fmt(sum + fee) +
          " (" +
          total +
          (total == 1 ? " item" : " itens") +
          ")\n\nEntrega:\nNome: " +
          v("nome") +
          "\nEndereço: " +
          v("rua") +
          ", " +
          v("num") +
          (pl.bairro ? "\nBairro: " + v("bairro") : "") +
          "\nCidade/bairro: " +
          pl.n +
          (v("comp") ? "\nReferência: " + v("comp") : ""),
      );
    } else sd.href = "#";
  }
  update();
}
document.addEventListener("DOMContentLoaded", init);
