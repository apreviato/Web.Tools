	function Apresentar(roteiro) {
	    
	    if (!$("#divFundoApresentacao").length)
	    {
		    var Apresentador = document.createElement("div");
		    document.body.appendChild(Apresentador);
		    Apresentador.innerHTML = ("<div id='divFundoApresentacao'></div>" + 
								    	"<div id='divBoxApresentacao'>" + 
									    	"<span id='lblNavegacao'>Instruções:</span>" + 
									    	"<span id='lblNaoExibirNovamente'>Não mostrar novamente</span>" + 
									    	"<span id='btnAnterior' title='Ir para passo anterior'></span>" + 
									    	"<span id='btnProximo' title='Ir para o próximo passo'></span>" + 
									    	"<span id='btnParar'>X</span>" + "<div id='htmlInput'></div>" + 
									    	"<span id='btnFinalizar'>Finalizar</span>" + 
								    	"</div>");
		}

	    if (roteiro.naoMostrarNovamente) $("#lblNaoExibirNovamente").show();

	    var Apresentacao = function(roteiro, capitulo) {
	        if ($(roteiro.cenas[capitulo].Objeto).length || roteiro.cenas[capitulo].Objeto == "")
	        {
	            var obj = null;
	            obj = $(roteiro.cenas[capitulo].Objeto);
		        var original = $(roteiro.cenas[capitulo].Objeto).clone();


		        var texto = roteiro.cenas[capitulo].Texto;
		        var divFundoApresentacao = $("#divFundoApresentacao");
		        var box = $("#divBoxApresentacao");
		        var objIndex = obj.css('z-index');
		        var objOpacity = obj.css('opacity');
		        var objPoint = obj.offset();
		        var objBackgroundColor = obj.css('background-color');

		        $("body").scrollTop();

                if (objPoint != undefined)
		            Scroll(objPoint.top - 10);

		        var fProximo = function () {
		            $(document).unbind("keypress");
		            $(document).off();
		            obj.replaceWith(original);
		            original.css('position', '');
		            Apresentacao(roteiro, capitulo + 1);
		        }
		        var fAnterior = function() {
		            obj.replaceWith(original);
		            Apresentacao(roteiro, capitulo - 1);
		        }
		        var fSair = function () {
		            $("body").scrollTop();
		            $(document).unbind("keypress");
		            $(document).off();
		            obj.replaceWith(original);
		            divFundoApresentacao.fadeOut(300);
		            box.fadeOut(200);
		        };

		        divFundoApresentacao.css("display", "block");
		        box.css("display", "block");
		        obj.css('opacity', 1);

		        if (roteiro.cenas.length == 1) 
		        	$("#lblNavegacao").text("Instrução");

		        else
		        	$("#lblNavegacao").text("Instruções: Passo " + (capitulo + 1) + " de " + (roteiro.cenas.length));

		        if (objPoint != null) {

		            var topFixo = 0;

		            if (200 + obj.outerHeight(true) + box.outerHeight(true) > $(window).height()) {
		                Scroll(objPoint.top + obj.outerHeight(true) - 190);

		                topFixo = objPoint.top + obj.outerHeight(true) - 200;
		            }

		            box.css('top', topFixo);
                    
		            if (objPoint.left + obj.outerWidth() + 400 > $(window).width()) {
		                if (($(window).width() / 100) * 50 > obj.outerWidth(true)) {
		                    box.removeClass();
		                    box.addClass("ApontaDireita");
		                    box.css('left', objPoint.left - 385);
		                    box.css('width', 300);
		                }
		                else
		                {
		                    var altura = 0;
		                    obj.find("> .col-md-12").each(function () {
		                        altura += 45;
		                    });

		                    box.removeClass();
		                    box.addClass("ApontaEsquerda");
		                    box.css('left', objPoint.left);
		                    
		                    box.css('top', obj.outerHeight(true) + 5 + altura - topFixo);

		                    if (obj.outerHeight() == 0)
		                        obj.css("height", altura);
                            box.css('width', '');
		                }
		            } else {
		                box.removeClass();
		                box.addClass("ApontaEsquerda");
		                box.css('left', objPoint.left + obj.outerWidth(true) + 10);
		                box.css('width', '');
		            }
		        }
		        else {
		            box.removeClass();
		            box.addClass("ApontaNenhumLado");
		            box.css('left', "40%");
		            box.css('width', "20%");
		            box.css('top', "30%");
		        }

		        obj.css('position', 'relative');
		        obj.css('z-index', '9999');

		        if (!obj.is("input"))
		        	obj.css('background-color', 'white');

		        obj.css('opacity', 1);

		        $("#htmlInput").html(texto);
		        $("#btnParar").unbind("click");
		        $("#btnParar").click(fSair);
		        obj.click(fSair);

		        if (capitulo > 0) {
		            $("#btnAnterior").show();
		            $("#btnAnterior").off();;
		            $("#btnAnterior").unbind("click");
		            $("#btnAnterior").click(fAnterior);
		            box.css("-webkit-transition", "0.2s ease-in-out");
		            box.css("-moz-transition", "0.2s ease-in-out");
		            box.css("-o-transition", "0.2s ease-in-out");
		            box.css("transition", "0.2s ease-in-out");
		        }
		        else
		        	$("#btnAnterior").hide();

		        if (capitulo < roteiro.cenas.length - 1) {
		            $("#btnProximo").show();
		            $(document).unbind("keypress");
		            $(document).off();
		            $(document).keypress(fProximo);
		            $("#divFundoApresentacao").unbind("click");
		            $("#divFundoApresentacao").off();
		            $("#divFundoApresentacao").click(fProximo);
		            $("#btnProximo").unbind("click");
		            $("#btnProximo").off();
		            $("#btnProximo").click(fProximo);
		            $("#btnFinalizar").fadeOut(0);
		            $("#divBoxApresentacao").css("padding-bottom: 20px;")
		        } else {
		            $("#btnProximo").hide();
		            $(document).unbind("keypress");
		            $(document).off();
		            $(document).keypress(fSair);
		            $("#divFundoApresentacao").unbind("click");
		            $("#divFundoApresentacao").off();
		            $("#divFundoApresentacao").click(fSair);
		            $("#btnFinalizar").fadeIn(400);
		            $("#divBoxApresentacao").css("padding-bottom", "50px");
		            $("#btnFinalizar").unbind("keypress");
		            $("#btnFinalizar").off();
		            $("#btnFinalizar").click(fSair);
		        }
		    }
	    }
	    Apresentacao(roteiro, 0);
	}

	function Scroll(top) {
	    $('html,body').animate({
	        scrollTop: top
	    },
            200);
	}
