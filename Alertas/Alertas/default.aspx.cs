using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Alertas
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static List<Alerta> RetornarAlertas()
        {
            var ret = new List<Alerta>();

            ret.Add(new Alerta()
            {
                ID = 1,
                Titulo = "Primeiro alerta",
                Assunto = "Demonstração de alertas",
                Conteudo = @"Lorem ipsum dolor sit amet, <br><br>Consectetur adipiscing elit. Quisque sit amet nisl et dolor lobortis vestibulum. Ut gravida mi a dictum volutpat. Suspendisse pellentesque elementum ullamcorper.<br><br>Praesent laoreet mollis consequat. Mauris aliquet est magna, quis porttitor eros placerat in. Nam aliquet in mauris a egestas. Phasellus est lorem, faucibus eu vestibulum ut, imperdiet nec leo.",
                Data = new DateTime(2017, 1, 12, 22, 35, 00).ToString("dd/MM/yyyy HH:mm")
            });
            ret.Add(new Alerta()
            {
                ID = 2,
                Titulo = "Segundo alerta!!!",
                Assunto = "Demonstração de reorganização de alertas!",
                Conteudo = @"Lorem ipsum dolor sit amet, <br><br>Consectetur adipiscing elit.<br><br><table><tr><td>Codigo</td><td>Descricao</td></tr><tr><td>1</td><td>Descrição 1</td></tr></table><br><br>imperdiet,<br><br>Ec leo.",
                Data = new DateTime(2017, 1, 12, 23, 42, 00).ToString("dd/MM/yyyy HH:mm")
            });
            ret.Add(new Alerta()
            {
                ID = 3,
                Titulo = "Terceiro alerta, wow!",
                Assunto = "Demonstração de alertas",
                Conteudo = @"Lorem ipsum dolor sit amet, <br><br>Consectetur adipiscing elit. Quisque sit amet nisl et dolor lobortis vestibulum. Ut gravida mi a dictum volutpat. Suspendisse pellentesque elementum ullamcorper.<br><br>Praesent laoreet mollis consequat. Mauris aliquet est magna, quis porttitor eros placerat in. Nam aliquet in mauris a egestas. Phasellus est lorem, faucibus eu vestibulum ut, imperdiet nec leo.",
                Data = new DateTime(2017, 1, 13, 00, 07, 00).ToString("dd/MM/yyyy HH:mm")
            });
            ret.Add(new Alerta()
            {
                ID = 4,
                Titulo = "Quarto alerta, agora com botões!",
                Assunto = "Demonstração de botões",
                Conteudo = @"Lorem ipsum dolor sit amet, <br><br>Consectetur adipiscing elit. Quisque sit amet nisl et dolor lobortis vestibulum. Ut gravida mi a dictum volutpat. Suspendisse pellentesque elementum ullamcorper.<br><br>Praesent laoreet mollis consequat. Mauris aliquet est magna, quis porttitor eros placerat in. Nam aliquet in mauris a egestas. Phasellus est lorem, faucibus eu vestibulum ut, imperdiet nec leo.",
                Data = new DateTime(2017, 1, 15, 22, 51, 00).ToString("dd/MM/yyyy HH:mm"),
                Botoes = new List<Alerta.Botao>()
                {
                    new Alerta.Botao()
                    {
                        Texto = "Recusar",
                        Click = "alert('Recusado!')"
                    },
                    new Alerta.Botao()
                    {
                        Texto = "Aceitar",
                        Click = "alert('Aceito!')"
                    }
                }
            });
            ret.Add(new Alerta()
            {
                ID = 5,
                Titulo = "Quinto alerta, wow!",
                Assunto = "Demonstração de alertas",
                Conteudo = @"Lorem ipsum dolor sit amet, <br><br>Consectetur adipiscing elit. Quisque sit amet nisl et dolor lobortis vestibulum. Ut gravida mi a dictum volutpat. Suspendisse pellentesque elementum ullamcorper.<br><br>Praesent laoreet mollis consequat. Mauris aliquet est magna, quis porttitor eros placerat in. Nam aliquet in mauris a egestas. Phasellus est lorem, faucibus eu vestibulum ut, imperdiet nec leo.",
                Data = new DateTime(2017, 1, 15, 00, 16, 00).ToString("dd/MM/yyyy HH:mm")
            });

            return ret;
        }

        [WebMethod]
        public static void MarcarLidoAlerta(string Id)
        {

        }
    }

    public struct Alerta
    {
        public int ID { get; set; }
        public string Titulo  { get; set; }
        public string Assunto { get; set; }
        public string Conteudo { get; set; }
        public string Data { get; set; }
        public List<Botao> Botoes { get; set; }

        public struct Botao
        {
            public string Texto { get; set; }
            public string Click { get; set; }
        }
    }
}