<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="Alertas._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Relacionamento</title>
    
    <script src="js/jquery-3.1.1.min.js"></script>

    <link href="css/Alertas.css" rel="stylesheet" />
    <%--<link href="css/AlertasTemaCinza.css" rel="stylesheet" />--%>
    <%--<link href="css/AlertasTemaVerde.css" rel="stylesheet" />--%>

    <script src="js/Alertas.js"></script>

    <style type="text/css">
        html, body{
            padding:0px;
            margin:0px;
            height:100%;
            width:100%;
        }
        body{
            background-image: url('img/fundo.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
        }
    </style>

    <script type="text/javascript">
        $(document).ready(function () {
            CarregarAlertas();
        });

        
    </script>
</head>
<body>
</body>
</html>
