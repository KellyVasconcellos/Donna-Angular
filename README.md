
refatorar criando componentes para reutilização de componentes em html e css

colocar uma div e usar flex-grow na lista de serviços

fazer todo a parte de serviço da area aberta, acessando api/backend

testar funcionalidade login

deletar área logada dentro do login e criar um novo app de área logada (Serviços pré escolhidos na area publica)

***como subir em 2 portas: 
json-server --watch db-funcionario.json
json-server --watch db-servicos.json --port 3001
json-server --watch db-lista-servicos.json --port 3002
json-server --watch db-login.json --port 3003
json-server --watch db-agendamento.json --port 3004

referencia de guardas de rotas: https://consolelog.com.br/como-proteger-rotas-angular-com-guard/

ver serviços e como colocar no db.json
        {
          "titulo":"Dia da Noiva",
          "descricao":"Este pacote incluí serviços de lavagem e secagem do cabelo, penteado, maquiagem, modelagem de sobrancelha, manicure e pedicure, colocação de arranjo.",
          "especifica-preco": "Valor sob Consulta",
          "preco":""
        },

        {
          Programa de Fidelidade
Oferecemos as melhores oportunidades para quem já é nossa cliente, possuímos programa de fidelidade para:

Pé e Mão - pacote mensal com direito a coloração das mãos 1x por semana e pés a cada 15 dias.
Babyliss - pacote mensal inclui 4 modelagens no mês (1x por semana)
Penteado - pacote mensal inclui 4 penteados no mês (1x por semana)
Maquiagem manual casual - pacote dá direito a 4 maquiagens que podem ser utilizadas de acordo com a necessidade da cliente.
Obs: A contratação deve ser feita presencialmente no salão, sujeito a disponibilidade.
        }


