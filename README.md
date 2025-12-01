# Support Veículos (Frontend)

Interface web responsiva para gerenciamento de anúncios de veículos, com autenticação JWT, busca avançada, galeria de fotos e painel de controle de anúncios.

## 🚀 Tecnologias Utilizadas

React 18

Vite (build tool)

Axios (requisições HTTP)

React Router (navegação)

React Context (autenticação)

CSS3 (estilos)

ESLint (linter)

## 📦 Funcionalidades

## 🔐 Autenticação

Registro de novos usuários

Login com email/senha

Autenticação com JWT

Refresh automático de token

Logout seguro

Persistência de sessão via localStorage

## 🔍 Busca e Filtros

Busca por marca/modelo em tempo real

Filtro por faixa de preço (mín/máx)

Filtro por ano do veículo

Modal de filtros avançados

Limpeza de filtros

## 🚘 Anúncios

Listar todos os anúncios com paginação

Visualizar detalhes do anúncio

Criar novo anúncio

Editar anúncio (somente dono)

Excluir anúncio (somente dono)

Listar meus anúncios

## 🖼️ Gerenciamento de Fotos

Galeria de fotos responsiva

Visualização de fotos em alta resolução

Upload de múltiplas fotos ao criar/editar

Deletar fotos (somente dono)

Confirmação antes de deletar

Feedback visual de carregamento

## ⚙️ Instalação e Setup

## 1️⃣ Clone o projeto

```bash
git clone https://github.com/lucastamborim/supportveiculos-frontend.git
cd supportveiculos-frontend
```

## 2️⃣ Instale as dependências

```bash
npm install
```

## 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```
VITE_BACKEND_URL=http://localhost:8000
```

## 4️⃣ Execute o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📦 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verifica código com ESLint
```

## 🌐 Páginas e Rotas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Home - Listar anúncios | Público |
| `/login` | Página de login | Público |
| `/register` | Página de registro | Público |
| `/detail/:id` | Detalhes do anúncio | Público |
| `/create` | Criar novo anúncio | Autenticado |
| `/edit/:id` | Editar anúncio | Somente dono |
| `/myadd` | Meus anúncios | Autenticado |

## 🔑 Fluxo de Autenticação

1. Usuário registra/faz login
2. Backend retorna tokens (access + refresh)
3. Tokens armazenados no localStorage
4. Access token enviado no header de cada requisição
5. Se 401, refresh token é enviado automaticamente
6. Novo access token obtido e requisição repetida
7. Ao logout, tokens são removidos do localStorage

## 🏗️ Estrutura do Projeto

```
src/
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── Detail/
│   ├── CreateEdit/
│   ├── MyAds/
│   └── ManagePhotos/
├── components/
│   ├── Header/
│   ├── AdCard/
│   ├── AdList/
│   └── Loading/
├── contexts/
│   └── AuthContext.jsx
├── services/
│   ├── api.js          (Axios com interceptor)
│   ├── authService.js
│   ├── adService.js
│   └── photoService.js
├── utils/
│   ├── storage.js      (localStorage abstraction)
│   └── media.js        (URL de mídia)
├── App.jsx
└── main.jsx
```

## 🔌 Serviços API

## authService.js

```javascript
login(username, password)        // Faz login
register(username, password)     // Registra novo usuário
refreshAuthToken()               // Refresh token
logout()                         // Limpa tokens
```

## adService.js

```javascript
getAllAds()                  // Lista todos os anúncios
getAd(id)                    // Detalhes de um anúncio
createAd(data)               // Cria novo anúncio
updateAd(id, data)           // Edita anúncio
deleteAd(id)                 // Deleta anúncio
getMyAds()                   // Lista anúncios do usuário
```

## photoService.js

```javascript
listPhotos(adId)             // Lista fotos do anúncio
addPhoto(adId, file, ordem)  // Upload de foto
deletePhoto(adId, photoId)   // Deleta foto
```

## 🎨 Componentes Principais

### Header
- Logo e navegação
- Links para Login/Register
- Menu do usuário autenticado
- Logout

### AdCard
- Exibição resumida do anúncio
- Primeira foto como thumbnail
- Preço e informações principais
- Link para detalhes

### AdList
- Grid responsivo de anúncios
- 1 coluna (mobile) → 2 (tablet) → 3 (desktop)
- Carregamento automático

### Home
- Barra de busca (marca/modelo)
- Botão de filtros
- Modal com filtros avançados
- Grid de resultados

### Detail
- Galeria de fotos completa
- Informações do anúncio
- Botão editar/deletar (somente dono)
- Dados do anunciante

### CreateEdit
- Formulário de anúncio
- Campos: preco, marca, modelo, ano, km, telefone_contato
- Seção de gerenciamento de fotos (edição)
- Upload de múltiplas fotos

## 📱 Responsividade

- **Mobile**: 1 coluna, navegação otimizada
- **Tablet**: 2 colunas, controles adaptados
- **Desktop**: 3 colunas, interface completa

Layout ajustado via CSS media queries e Flexbox.

## 🔐 Integração com Backend

### Endpoints base
```
GET    /api/anuncios/                           → Lista anúncios
GET    /api/anuncios/<id>/                      → Detalhe do anúncio
POST   /api/anuncios/                           → Criar anúncio
PATCH  /api/anuncios/<id>/                      → Editar anúncio
DELETE /api/anuncios/<id>/                      → Deletar anúncio

POST   /api/anuncios/<id>/adicionar_foto/       → Upload de foto
GET    /api/anuncios/<id>/listar_fotos/         → Listar fotos
DELETE /api/anuncios/<id>/deletar-foto/<id>/    → Deletar foto

POST   /api/auth/users/                         → Registro
POST   /api/auth/jwt/create/                    → Login
POST   /api/auth/jwt/refresh/                   → Refresh token
```

## ⚠️ Tratamento de Erros

- Validação de formulários no cliente
- Mensagens de erro amigáveis do servidor
- Retry automático em falhas de rede (token refresh)
- Loading states em operações assíncronas
- Confirmações antes de ações destrutivas

## 🧪 Testes

Testes manuais executados em:

✔ Registro de usuário

✔ Login com JWT

✔ Listagem de anúncios

✔ Busca por marca/modelo

✔ Filtros avançados (preço, ano)

✔ Visualização de detalhes

✔ Upload de fotos

✔ Deletar fotos

✔ Criar/editar/deletar anúncios

✔ Permissões (somente dono pode editar)

✔ Refresh automático de token

✔ Logout

Tudo 100% funcionando.

## 🚀 Preparando para Deploy

✔ Build otimizado com Vite
✔ Minificação de assets
✔ Tree-shaking de código não utilizado
✔ Variáveis de ambiente configuradas
✔ CORS compatível com backend
✔ Error boundaries implementados
✔ Lazy loading de rotas (se necessário)
✔ Performance otimizada (gzipped ~268KB)

### Deploy em Vercel/Netlify

```bash
npm run build
# Push para git (Vercel/Netlify fará deploy automático)
```

## 📖 Documentação

- Backend: https://github.com/lucastamborim/supportveiculos-backend
- API Docs: Disponível via Swagger no backend

## 🤝 Dependências Principais

```json
{
  "react": "^18",
  "react-dom": "^18",
  "react-router-dom": "^6",
  "axios": "^latest",
  "vite": "^latest",
  "eslint": "^latest"
}
```

## 👤 Autor

Lucas Tamborim — [GitHub](https://github.com/lucastamborim)

## 📄 Licença

MIT License
