var objAlerta = $("<div class='divAlerta'>" +
                    "<div>" +
                        "<div class='divFecharAlerta'></div>" +
                        "<div class='divMinimizarAlerta'>_</div>" +
                        "<span class='sTituloAlerta'></span> - <span class='sDataAlerta'></span><br/><br/>" +
                        "<b>Assunto:</b> <span class='sAssuntoAlerta'></span><br/><br/>" +
                        "<b>Mensagem:</b><br/><br/><div class='divConteudoAlerta'></div>" +
                    "</div>" +
                   "</div>");

var isMinimizavel = true;
var distanciaTopo = 120;
var distanciaEntreAlertas = 10;
var tempoEfeitoDesaparecer = 200;
var tempoEfeitoAparecer = 200;
var tempoEfeitoReorganizacao = "0.2s";
var urlCarregarAlertas = "default.aspx/RetornarAlertas";
var urlCallBackFechar = "default.aspx/MarcarLidoAlerta";

function CarregarAlertas() {
    $.ajax({
        type: 'POST',
        url: urlCarregarAlertas,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (lst) {
            if (lst != null && lst.d != null)
                $.each(lst.d, function () {
                    Alertar(this.ID, this.Titulo, this.Assunto, this.Conteudo, this.Data, this.Botoes);
                });

        }
    });
}

function Alertar(id, titulo, assunto, conteudo, data, botoes) {
    if ($(".divAlerta[id=" + id + "]").length == 0) {
        var alerta = objAlerta.clone();

        alerta.attr("id", id);

        $(".sTituloAlerta", alerta).html(titulo);
        $(".sAssuntoAlerta", alerta).html(assunto);
        $(".sDataAlerta", alerta).html(data);

        $(".divConteudoAlerta", alerta).html(conteudo);

        $.each(botoes, function () {
            if (this.Texto != undefined && this.Click != undefined) {
                $(">div", alerta).append(
                    $("<div class='divBotaoAlerta' onclick=\"" + this.Click + "\">" + this.Texto + "</div>").click(function () {
                        FecharAlerta(id);
                    })
                );
            }
        });

        if (isMinimizavel) {
            $(".divMinimizarAlerta", alerta).css("display", "block");
            $(".divMinimizarAlerta", alerta).click(function () { MinimizarAlertas(); });
        }

        alerta.css("-webkit-transition", "all " + tempoEfeitoReorganizacao + " ease-in-out");
        alerta.css("-moz-transition", "all " + tempoEfeitoReorganizacao + " ease-in-out");
        alerta.css("-o-transition", "all " + tempoEfeitoReorganizacao + " ease-in-out");
        alerta.css("-ms-transition", "all " + tempoEfeitoReorganizacao + " ease-in-out");
        alerta.css("transition", "all " + tempoEfeitoReorganizacao + " ease-in-out");

        if ($(".divAlerta", "body").length > 0) {

            var topo = distanciaTopo;

            $(".divAlerta", "body").each(function () {
                topo += $(this).outerHeight() + distanciaEntreAlertas;
            });

            alerta.css("top", topo);
        }
        else
            alerta.css("top", distanciaTopo);

        $(".divFecharAlerta", alerta).click(function () { FecharAlerta(id); });

        alerta.hide();

        $('body').append(alerta);

        alerta.fadeIn(tempoEfeitoAparecer);
    }
}

function FecharAlerta(id) {
    $(".divAlerta[id=" + id + "]").fadeOut(tempoEfeitoDesaparecer);
    $(".divAlerta[id=" + id + "]").remove();

    $.ajax({
        type: 'POST',
        url: urlCallBackFechar,
        data: { "Id": id },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });

    Reorganizar(id);
}

function Reorganizar(idExcluido) {
    $(".divAlerta:visible:not(.divAlerta[id=" + idExcluido + "])", "body").each(function () {

        var topoAtual = $(this).position().top;
        var topo = distanciaTopo;

        $(".divAlerta:visible:not(.divAlerta[id=" + $(this).attr("id") + "],.divAlerta[id=" + idExcluido + "])", "body").each(function () {
            if ($(this).position().top < topoAtual)
                topo += $(this).outerHeight() + distanciaEntreAlertas;
        });

        $(this).css("top", topo);
    });

    return false;
}

function MinimizarAlertas() {
    var qnt = $(".divAlerta:visible").length;

    $(".divAlerta:visible").fadeOut(tempoEfeitoDesaparecer);
    $(".divAlerta:visible").css("top", "100%");
    $(".divAlerta:visible").css("left", "0px");

    setTimeout(function () { $(".divAlerta").remove(); }, tempoEfeitoDesaparecer);

    $("body").append(
        $("<div class='barraAlertas'><span>" + qnt + "</span> Mensagens não lidas</div>").click(function () {
            $(".barraAlertas").fadeOut(tempoEfeitoDesaparecer);
            $(".barraAlertas").remove();
            CarregarAlertas();
        })
    );
}
