jQuery.fn.extend({
    Dialogo: function (opcoes) {

        var textoBotao = "Ok";
        var id = "dvDialogo";

        if (opcoes.botao != undefined)
            textoBotao = opcoes.botao;

        if (opcoes.id != undefined)
            id = opcoes.id;

        if (!$("#divFundoDialogo" + id).length) {
            var Dialogo = document.createElement("div");

            Dialogo.id = id;

            if (document.forms[0] != undefined)
                document.forms[0].appendChild(Dialogo);
            else
                document.body.appendChild(Dialogo);

            var html = "<div id='divFundoDialogo" + id + "' class='divFundoDialogo'></div>" +
	    							"<div id='divBoxDialogo" + id + "' class='divBoxDialogo'>" +
								    	"<span id='lblTituloDialogo" + id + "' class='lblTituloDialogo'>Titulo</span>";

            if (opcoes.naopermitefechar == undefined || !opcoes.naopermitefechar) {
                html += "<span id='btnFecharDialogo" + id + "' class='btnFecharDialogo' title='Fechar'>X</span>";
            }

            html += "<div id='divConteudoDialogo" + id + "' class='divConteudoDialogo'></div><br/><br/>" +
								    	"<span id='btnOkDialogo" + id + "' class='btnOkDialogo'>" + textoBotao + "</span>" +
							    	"</div>";

            Dialogo.innerHTML = html;
        }
      
        $("#divBoxDialogo" + id).css("width", opcoes.width);
        $("#divBoxDialogo" + id).css("height", opcoes.height);
        $("#divBoxDialogo" + id).css("left", "50%");
        $("#divBoxDialogo" + id).css("top", "25%");
        $("#divBoxDialogo" + id).css("margin-left", -(parseInt(opcoes.width) / 2));
        $("#divBoxDialogo" + id).css("margin-top", -(parseInt(opcoes.height) / 4));

        $(this).detach().appendTo("#divConteudoDialogo" + id).fadeIn(200);

        if (opcoes.titulo != undefined && opcoes.titulo.length) {
            $("#lblTituloDialogo" + id).fadeIn(200).text(opcoes.titulo);
        }
        else if ($(this).prop("title") != undefined && $(this).prop("title").length)
            $("#lblTituloDialogo" + id).fadeIn(200).text($(this).prop("title"));
        
        var fSair = function () {
            if (opcoes.naopermitefechar == undefined || !opcoes.naopermitefechar) {
                $("#divBoxDialogo" + id).fadeOut(300);
                $("#divFundoDialogo" + id).fadeOut(300);
            }
        };

        $("#divFundoDialogo" + id).fadeIn(200);
        $("#divBoxDialogo" + id).fadeIn(200);

        $("#btnFecharDialogo" + id).click(fSair);

        $("#btnOkDialogo" + id).click(function () {
            if (ValidatePage()) {
                if (opcoes.callback != undefined) {
                    eval(opcoes.callback.toString());
                }
                fSair();
            } else if (opcoes.callback == undefined) {
                fSair();
            }
        });

        $("#divFundoDialogo" + id).click(fSair);

        function ValidatePage() {

            if (typeof (Page_ClientValidate) == 'function') {
                Page_ClientValidate();
            } else
                return true;

            if (Page_IsValid) {
                return true;
            }
            else {
                return false
            }
        }
    }
});
