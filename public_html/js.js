
var receptTomb = [];
var irany = true;
$(function () {

    //adat betöltés

    $.ajax({
        url: "receptek.json",
        success: function (result) {
            receptTomb = result;
//            console.log(result);
            tablazatLetrehozas();
            receptLetrehozas();

        }}
    );
    $("#bal").click(balraLeptet);
    $("#jobb").click(jobbraLeptet);
    $("article").on("click", "tr", receptKivalaszt);
    
    $("select").on("change", rendezesOption);
    
    $("article").on("click", ".receptneve", idoOsszeg);
    $("#keres").click(kereses);
});
var osszIdo = 0;
var edesegek = 0;
var osszAr = 0;
function idoOsszeg() {
    var osszesit = $(this).attr("id");
    var adottIdo = receptTomb[osszesit].ido;
    var adottAr = receptTomb[osszesit].ar;
    var adottEdesseg = receptTomb[osszesit].kategoria;
    osszIdo += adottIdo;
    osszAr += adottAr;
    if (adottEdesseg === "Édesség") {
        edesegek++;

    }
    console.log(osszIdo);
    console.log(edesegek);
    console.log(osszAr);
}
function kereses() {

    var keresRecept = $("#keresettSzoveg").val();

    for (var i = receptTomb.length - 1; i > -1; i--) {
        var aktualisNev = receptTomb[i].nev;
        if (aktualisNev !== keresRecept) {

            receptTomb.splice(i, 1);

        }

    }
    tablazatLetrehozas();
}
function tablazatLetrehozas() {
    $("article").empty();
    $("article").append("<table>");
    $("article table").append("<tr><th id='nev'>Receptnev</th><th id='ido'>Elkészítési idő</th><th id='leiras'>Leírás</th><th>Kép</th><th id='hozzavalok'>Hozzávalók</th><th id='kategoria'>Kategoria</th><th id='ar'>ar</th></tr>");

    for (var i = 0; i < receptTomb.length; i++) {
        $("article table").append("<tr id='" + i + "'>");
        for (var item in receptTomb[i]) {
            if (item === "nev") {
                $("article table tr").eq(i + 1).append("<td class='receptneve' id='" + i + "'>" + receptTomb[i][item] + "</td>");
            } else {
                $("article table tr").eq(i + 1).append("<td>" + receptTomb[i][item] + "</td>");
            }
        }
    }
    //$("tr").click(receptKivalaszt);
//    $("#ido").click(rendezesIdo);
    $("th").click(rendezes);
//    $("#leiras").click(rendezesLeiras);
//    $("#hozzavalok").click(rendezesHozzavalok);
//    $("#kategoria").click(rendezesKategoria);
//    $("#ar").click(rendezesAr);
}
function rendezesOption() {
    console.log("valami");
    var id = $(this).val();
    var id2="";
    console.log(id);
    switch(id) {
  case "Ár":
    // code block
   id2="ar";
    break ;
  case "Idő":
    id2="ido";
    break;
    case "Leírás":
    // code block
   id2="leiras";
    break ;
    case "Hozzávalók":
    // code block
   id2="hozzavalok";
    break ;
    case "Kategória":
    // code block
   id2="kategoria";
    break ;
    case "Név":
    // code block
   id2="nev";
    break ;
  default:
    // code block
}
    idRendezes(id2);
}
function idRendezes(id2){
     if (!(id2 === "ar" || id2 === "ido")) {
        if (irany) {
            receptTomb.sort(function (a, b) {
                return Number(a[id2] > b[id2]) - 0.5;
            }
            );
            irany = false;
        } else {
            receptTomb.sort(function (a, b) {
                return Number(a[id2] < b[id2]) - 0.5;
            }
            );
            irany = true;
        }

    } else {
        if (irany) {
            receptTomb.sort(function (a, b) {
                return a[id2] - b[id2];

            }
            );
            irany = false;
        } else {
            receptTomb.sort(function (a, b) {
                return b[id2] - a[id2];

            }
            );
            irany = true;
        }

    }
    tablazatLetrehozas();
    
}
function rendezes() {
    var thId = $(this).attr("id");

    idRendezes(thId);
}


function receptLetrehozas() {
    $("article").append("<div id ='sorba'>");
    $("article div").append("<p>Receptnev</p><p>ido</p><p>leiras</p><p>kep</p><p>hozzavalok</p><p>kategoria</p><p>ar</p>");

    for (var i = 0; i < receptTomb.length; i++) {
        $("article").append("<div>");

        for (var item in receptTomb[i]) {

            $("article div").eq(i + 1).append(receptTomb[i][item]);

        }
    }
}
function rendezesNev() {
    if (irany) {
        receptTomb.sort(function (a, b) {
            return Number(a.nev > b.nev) - 0.5;
        }
        );
        irany = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a.nev < b.nev) - 0.5;
        }
        );
        irany = true;
    }
    tablazatLetrehozas();
}

function rendezesIdo() {
    if (irany) {
        receptTomb.sort(function (a, b) {
            return a.ido - b.ido;

        }
        );
        irany = false;
    } else {
        receptTomb.sort(function (a, b) {
            return b.ido - a.ido;

        }
        );
        irany = true;
    }
    tablazatLetrehozas();
}
function rendezesLeiras() {
    if (irany) {
        receptTomb.sort(function (a, b) {
            return Number(a.leiras > b.leiras) - 0.5;
        }
        );
        irany = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a.leiras < b.leiras) - 0.5;
        }
        );
        irany = true;
    }
    tablazatLetrehozas();

}
function rendezesHozzavalok() {
    if (irany) {
        receptTomb.sort(function (a, b) {
            return Number(a.hozzavalok > b.hozzavalok) - 0.5;
        }
        );
        irany = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a.hozzavalok < b.hozzavalok) - 0.5;
        }
        );
        irany = true;
    }
    tablazatLetrehozas();
}
function rendezesKategoria() {
    if (irany) {
        receptTomb.sort(function (a, b) {
            return Number(a.kategoria > b.kategoria) - 0.5;
        }
        );
        irany = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a.kategoria < b.kategoria) - 0.5;
        }
        );
        irany = true;
    }
    tablazatLetrehozas();

}
function rendezesAr() {
    if (irany) {
        receptTomb.sort(function (a, b) {
            return Number(a.ar > b.ar) - 0.5;
        }
        );
        irany = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a.ar < b.ar) - 0.5;
        }
        );
        irany = true;
    }
    tablazatLetrehozas();

}
function feltoltes() {
    var ujRecept = {};
    receptTomb.nev = $("#receptNev").val();
    receptTomb.ido = $("#ido").val();
    receptTomb.leiras = $("#leiras").val();
    receptTomb.hozzavalok = $("#hozzavalok").val();
    receptTomb.kategoria = $("#kategoria").val();
    receptTomb.ar = $("#ar").val();
    receptTomb.push(ujRecept);
    tablazatLetrehozas();

}
function receptKivalaszt() {

//    console.log("itt vagyok");
    var id = $(this).attr("id");
//    console.log(id);
//    console.log(receptTomb[id]);
    leptetoIndex = id;

    megjelenit(id);
}

function megjelenit(id) {
    $("#recept").empty();
    $("#recept").append("<img src='" + receptTomb[id].kep + "' alt='" + receptTomb[id].nev + "'>");
    $("#recept").append("<h2>");
    $("#recept h2").append(receptTomb[id].nev);
    $("#recept").append("<p>");
    $("#recept p").append(receptTomb[id].leiras);
    $("#recept").append("<p>");
    $("#recept p").eq(1).append("Elkészítési idő: " + receptTomb[id].ido);

    $("#recept").append("<h3>");
    $("#recept h3").append("Hozzavalók");
    $("#recept").append("<ul>");
    var hozzavalok = receptTomb[id].hozzavalok;
//    console.log(hozzavalok);
    for (var i = 0; i < hozzavalok.length; i++) {
        for (var item in hozzavalok[i]) {
            $("section ul").append("<li>" + item + " " + hozzavalok[i][item] + "</li>");
        }
    }

}
var leptetoIndex = 0;
function balraLeptet() {
    leptetoIndex--;
    if (leptetoIndex < 0) {
        leptetoIndex = receptTomb.length - 1;
    }

//    console.log(leptetoIndex);
    megjelenit(leptetoIndex);


}
function jobbraLeptet() {
    leptetoIndex++;
    if (leptetoIndex > receptTomb.length - 1) {
        leptetoIndex = 0;
    }
    megjelenit(leptetoIndex);

}

