function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
            document.getElementById('ibge').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
            document.getElementById('ibge').value=(conteudo.ibge);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";
                document.getElementById('ibge').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };


    function validaCadastro() {
        /*var cep = document.getElementById('cep').value
        var estado = document.getElementById('uf').value
        var bairro = document.getElementById('bairro').value
        var cidade = document.getElementById('cidade').value
        var rua = document.getElementById('rua').value

        var dados = Array()
        dados[0] = document.getElementById('e-mail').value
        dados[1] = document.getElementById('nome_usuario').value
        dados[2] = document.getElementById('senha').value
        dados[3] = document.getElementById('senha2').value
        dados['Endereço'] = Array(cep, estado, bairro, cidade, rua)
        console.log(dados)*/
        var dados = Array()
        dados[0] = document.getElementById('senha').value
        dados [1] = document.getElementById('senha2').value

        if(dados[0] != dados[1]) { 
            
            document.getElementById('alert').hidden = false
        } else {
        var cep = document.getElementById('cep').value
        var estado = document.getElementById('uf').value
        var bairro = document.getElementById('bairro').value
        var cidade = document.getElementById('cidade').value
        var rua = document.getElementById('rua').value
        dados[2] = document.getElementById('e-mail').value
        dados[3] = document.getElementById('nome_usuario').value
        dados['Endereço'] = Array(cep, estado, bairro, cidade, rua)
        console.log(dados)
        }

    }

    //funções para o upload de fotos
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*  ==========================================
    SHOW UPLOADED IMAGE NAME
* ========================================== */
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}