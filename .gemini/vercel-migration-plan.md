# 🚀 Plano de Migração para Vercel Serverless

## Objetivo
Adaptar o projeto Weather Forecast para deploy no Vercel usando Serverless Functions, mantendo a estrutura de desenvolvimento local.

---

## 📋 Checklist Geral

### Parte 1: Código (Claude faz)
- [ ] Criar pasta `api/` com Serverless Functions
- [ ] Criar `api/weather.js` - endpoint para clima atual
- [ ] Criar `api/forecast.js` - endpoint para previsão 5 dias
- [ ] Criar `vercel.json` - configuração do Vercel
- [ ] Criar `package.json` na raiz - dependências para serverless
- [ ] Copiar frontend para pasta `public/`
- [ ] Modificar `public/script.js` - usar URL dinâmica (dev vs prod)
- [ ] Atualizar README.md com instruções de deploy
- [ ] Commit e Push para GitHub

### Parte 2: Vercel (Você faz)
- [ ] Acessar https://vercel.com
- [ ] Conectar repositório GitHub
- [ ] Configurar variável de ambiente
- [ ] Deploy

---

## 🔧 Parte 1: Alterações no Código

### 1.1 Criar `api/weather.js`
```javascript
// Serverless Function para clima atual
// Endpoint: GET /api/weather?city=...
```

### 1.2 Criar `api/forecast.js`
```javascript
// Serverless Function para previsão 5 dias
// Endpoint: GET /api/forecast?city=...
```

### 1.3 Criar `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/public/$1" }
  ]
}
```

### 1.4 Criar `package.json` (raiz)
```json
{
  "dependencies": {
    "axios": "^1.6.0"
  }
}
```

### 1.5 Copiar Frontend para `public/`
- Copiar todos os arquivos de `weather-frontend/` para `public/`

### 1.6 Modificar `public/script.js`
```javascript
// Detectar ambiente (dev vs prod)
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/weather'
    : '/api';
```

---

## 🌐 Parte 2: Configuração no Vercel

### Passo 1: Acessar Vercel
1. Vá para https://vercel.com
2. Faça login com sua conta (GitHub)

### Passo 2: Importar Projeto (Se já não estiver)
1. Clique em "Add New..." → "Project"
2. Selecione o repositório `S4t8rn0/Weather-forecast`
3. **OU** se já estiver conectado, ele vai detectar as mudanças automaticamente

### Passo 3: Configurar Variáveis de Ambiente ⚠️ IMPORTANTE
1. No dashboard do projeto, vá em **"Settings"**
2. Clique em **"Environment Variables"**
3. Adicione a variável:
   - **Name**: `OPENWEATHER_API_KEY`
   - **Value**: `213b39ca5171c65c15886c472b743e63` (sua nova chave)
   - **Environment**: Marque todas (Production, Preview, Development)
4. Clique em **"Save"**

### Passo 4: Deploy
1. Após configurar as variáveis, vá em **"Deployments"**
2. Clique nos 3 pontinhos do último deploy
3. Selecione **"Redeploy"**
4. Aguarde o build completar (geralmente 30-60 segundos)

### Passo 5: Testar
1. Acesse a URL fornecida pelo Vercel (ex: `weather-forecast-xxx.vercel.app`)
2. Verifique se a previsão do tempo carrega
3. Teste a busca de outras cidades

---

## 📁 Estrutura Final do Projeto

```
previsão-do-tempo-finalizado/
│
├── api/                          # Serverless Functions (PRODUÇÃO)
│   ├── weather.js                # GET /api/weather?city=...
│   └── forecast.js               # GET /api/forecast?city=...
│
├── public/                       # Frontend (PRODUÇÃO)
│   ├── index.html
│   ├── script.js                 # Com URL dinâmica
│   ├── style.css
│   └── images/
│
├── weather-backend/              # Backend Express (DEV LOCAL)
│   ├── src/
│   ├── .env
│   └── package.json
│
├── weather-frontend/             # Frontend Original (DEV LOCAL)
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── images/
│
├── vercel.json                   # Configuração Vercel
├── package.json                  # Dependências Serverless
├── .gitignore
└── README.md
```

---

## ⏱️ Tempo Estimado

| Tarefa | Tempo |
|--------|-------|
| Alterações no código (Claude) | ~5 min |
| Commit e Push | ~2 min |
| Configuração Vercel (Você) | ~5 min |
| Total | **~12 min** |

---

## ✅ Resultado Final

Após completar:
- ✅ Projeto acessível via URL pública do Vercel
- ✅ API Key protegida (variável de ambiente)
- ✅ Resposta instantânea (sem delays)
- ✅ 100% gratuito
- ✅ Pronto para portfólio e LinkedIn!
