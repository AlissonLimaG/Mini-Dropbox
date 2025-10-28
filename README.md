# 📦 Mini Dropbox

> Um sistema simples de armazenamento de arquivos usando **MinIO** e **Node.js**

## 🎯 Visão Geral

Este projeto implementa um **Mini Dropbox** com:

- 🖥️ **Backend** em Node.js/Express que gerencia uploads e downloads
- 🗄️ **Armazenamento** MinIO (compatível com S3) rodando em containers Docker
- 🌐 **Interface Web** estática para interação com o usuário

## 🏗️ Arquitetura do Sistema
graph TD
    A[Usuário] --> B[Frontend (HTML + JS)]
    B --> C[Backend (Express.js)]
    C --> D[MinIO (Armazenamento Distribuído)]
    D -->|Docker| E[Container MinIO]

    subgraph Interface Web
        B
    end

    subgraph Serviço HTTP
        C
    end

    subgraph Armazenamento Distribuído
        D
        E
    end

    C -->|Upload de Arquivos| D
    C -->|Listagem de Arquivos| D
    C -->|Download de Arquivos| D

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- ✅ **Docker** e **Docker Compose**
- ✅ **Node.js** (>= 14) e **npm**
- ✅ Terminal/CMD do Windows

## 🚀 Como Executar

### 🐳 Passo 1: Iniciar o MinIO (Containers)

1. **Navegue até a pasta do projeto:**

2. **Inicie os containers MinIO:**
   ```cmd
   docker-compose up -d
   ```
   
   > 💡 **Dica:** Use `docker compose up -d` se você tem a versão mais nova do Docker

3. **Verifique se os containers estão rodando:**
   ```cmd
   docker ps
   ```

### 🌐 Acessar o MinIO Console

- **URL:** http://localhost:9001
- **👤 Usuário:** `minioadmin`
- **🔑 Senha:** `minioadmin123`

### ⚙️ Passo 2: Configurar e Iniciar o Backend

1. **Instalar dependências:**
   ```cmd
   npm install
   ```

2. **Iniciar o servidor:**
   ```cmd
   npm start
   ```

3. **✅ Servidor rodando em:** http://localhost:3000

### 🖼️ Passo 3: Abrir a Interface Web

Escolha uma das opções:

#### 📁 Opção 1: Abrir diretamente no navegador
- Clique duas vezes em `index.html` ou abra via navegador

## 🧪 Testando o Sistema

<div align="center">

### 🎯 **Fluxo de Teste Completo**

</div>

<table>
<tr>
<td width="33%" align="center">

### 📤 **Upload**
![Upload](https://img.shields.io/badge/Teste-Upload-blue?style=for-the-badge&logo=upload&logoColor=white)

1. 🎯 Selecione um arquivo
2. 🚀 Clique em "Enviar"
3. ✅ Aguarde confirmação

**Formatos suportados:**
- � Documentos (PDF, DOC, TXT)
- 🖼️ Imagens (PNG, JPG, GIF)
- 🎵 Mídia (MP3, MP4, AVI)
- 📦 Arquivos (ZIP, RAR)

</td>
<td width="33%" align="center">

### �📋 **Listagem**
![List](https://img.shields.io/badge/Teste-Listagem-green?style=for-the-badge&logo=list&logoColor=white)

1. 🔄 Clique em "Atualizar lista"
2. 👀 Visualize arquivos disponíveis
3. 📊 Veja informações detalhadas

**Informações exibidas:**
- 📛 Nome do arquivo
- 📏 Tamanho em bytes
- 📅 Data de modificação
- ⚙️ Ações disponíveis

</td>
<td width="33%" align="center">

### 📥 **Download**
![Download](https://img.shields.io/badge/Teste-Download-orange?style=for-the-badge&logo=download&logoColor=white)

1. 🎯 Encontre o arquivo desejado
2. �️ Clique em "Download"
3. 🔗 URL é gerada automaticamente

**Características:**
- ⏱️ URLs temporárias (10 min)
- 🛡️ Acesso seguro e controlado
- 📱 Funciona em qualquer dispositivo
- 🚀 Download direto do MinIO

</td>
</tr>
</table>

<div align="center">

### 🔄 **Fluxo Visual do Teste**

```mermaid
graph LR
    A[📤 Upload] --> B[✅ Confirmação]
    B --> C[🔄 Atualizar Lista]
    C --> D[📋 Ver Arquivo]
    D --> E[📥 Download]
    E --> F[🎉 Sucesso!]
    
    style A fill:#e3f2fd
    style B fill:#e8f5e8
    style C fill:#fff3e0
    style D fill:#f3e5f5
    style E fill:#fce4ec
    style F fill:#e0f2f1
```

> **💡 Dica:** Teste com arquivos pequenos primeiro (< 1MB) para verificar se tudo está funcionando

</div>

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | - | Runtime JavaScript |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | ^5.1.0 | Framework web minimalista |
| ![Multer](https://img.shields.io/badge/Multer-FF6600?style=flat) | ^2.0.2 | Middleware para uploads |

### Armazenamento
| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| ![MinIO](https://img.shields.io/badge/MinIO-C72E29?style=flat&logo=minio&logoColor=white) | latest | Armazenamento S3-compatível |
| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) | - | Containerização |

### Frontend
| Tecnologia | Descrição |
|------------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Interface web |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica do frontend |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilos |

## 📡 API Endpoints

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| `POST` | `/upload` | 📤 Upload de arquivo | `file` (multipart) |
| `GET` | `/files` | 📋 Listar arquivos | - |
| `GET` | `/download/:name` | 📥 URL de download | `name` (filename) |

## 🔧 Estrutura do Projeto

```
projetoDropBox/
├── 📄 docker-compose.yml    # Configuração MinIO
├── 📄 package.json          # Dependências Node.js
├── 📄 server.js             # Backend Express
├── 📄 index.html            # Interface web
└── 📄 README.md             # Esta documentação
```