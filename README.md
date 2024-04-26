# Trabalho final da disciplina de Backend

- Professor: Douglas Nassif Roma Junior
- LinkedIn: https://www.linkedin.com/in/douglasjunior/

## Para rodar o projeto

1. Baixe o projeto
1. Instale as dependências
   ```
   npm install
   ```
1. Configure as variáveis de ambiente no arquivo `dev.env`
   > Você precisa estar com o `MySQL` rodando e com um banco de dados já criado.
   >
   > As tabelas serão criadas automaticamente pelo `Sequelize`.
1. Rode o projeto
   ```
   npm run dev
   ```

## Rotas públicas

### Cadastro de usuários

> POST /users
>
> Body:
>
> ```json
> {
>   "name": "Fulano da Silva",
>   "email": "fulano@email.com",
>   "password": "12345678"
> }
> ```

### Login de usuários

> POST /users/login
>
> Body:
>
> ```json
> {
>   "email": "fulano@email.com",
>   "password": "12345678"
> }
> ```

## Rotas autenticadas

Todas as rotas autenticadas exigem que o `token jwt` seja passado no cabeçalho (header) chamado `Authorization`.

### Cadastrar tarefas

> POST /tasks
>
> Headers:
>
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```
>
> Body:
>
> ```json
> {
>   "title": "Aprender Node",
>   "concluded": false
> }
> ```

### Consultar tarefas

> GET /tasks
>
> Headers:
>
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Obter tarefa por ID

> GET /tasks/1
>
> Headers:
>
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Marcar tarefa como concluída

> PUT /tasks/1/concluded
>
> Headers:
>
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Marcar tarefa como pendente

> PUT /tasks/1/pending
>
> Headers:
>
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Atualização parcial da tarefa

> PATCH /tasks/1
>
> Headers:
>
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```
>
> Body:
>
> ```json
> {
>   "title": "Aprender Node",
>   "concluded": false
> }
> ```

### Deploy da aplicação

> Deploy será feito na Oracle com no tier gratuito
> Ip publico: 144.22.203.254
>
> Para liberar portas:
> Subnet -> default list -> adicionar as portas para - EVITAR AS PORTAS PADRÃO
>
> Range de ip 0.0.0.0/0 significa todos CIDR
>
> Conectar com o bash utilizando a chave ssh:
>
> ```
> ssh -i "~/Downloads/ssh-key-2024-04-25.key" ubuntu@144.22.203.254
>
> A chave SSH é a baixada na criação da instância
>
> ```
>
> Acessar o ROOT na Oracle:
> sudo su -> acessa o root para executar tudo como sudo
> sudo apt update
> df -h para ver o tamanho do hd
>
> opção para pouca ram - SWAP (Swp) - como vem 1gb gratuito, é recomendado
> o swap utiliza parte do armazenamento como ram
>
> ```
> Habilitar o swap:
> fallocate -l 2G /swapfile
> chmod 600 /swapfile
> mkswap /swapfile
> swapon /swapfile
>
> Tornar pernanente:
> cp /etc/fstab /etc/fstab.bak -> faz backup do arquivo de parcitionamento
> echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab -> torna permanente
> cat  /etc/fstab -> verifica o arquivo
> ```

Rodar aplicação em DOCKER:
https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script

utilizar um convenience script para instalar o docker no linux:
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

docker ps -> verifica os containeres

Gerenciamento dos containeres Caprover:
faz a gestão através do docker swarm
docker run -p 80:80 -p 443:443 -p 3000:3000 -e ACCEPTED_TERMS=true -v /var/run/docker.sock:/var/run/docker.sock -v /captain:/captain caprover/caprover

A partir daqui já é possível acessar na porta ip:3000

senha padrão: captain42 - ALTERAR SEMPRE

---

Após essas configurações, devem ser feitas as configurações do banco de dados, variáveis de ambiente e repositório
