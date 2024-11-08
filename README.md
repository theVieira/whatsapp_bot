## Pré requisitos

- Node.js v22.11.0
- Chrome

## Como configurar

- **Arquivo de configuração ./src/config/config.json**

- Defina os grupos ["Grupo 1", "Grupo 2"]

  - Os grupos devem ser definidos com o mesmo nome que aparece no aplicativo

- Defina a mensagem a ser enviada

- Defina o horário de envio da mensagem
  - O horário deve ser definido sem o 0 (hour: "8", minute: "9")

## Como executar

- `npm start`
  - Irá gerar o QR Code para conexão com seu aplicativo

Ao ler o QR Code, mantenha seu aplicativo aberto até a sincronização finalizar

Após a conexão o script executará a varredura dos chats,

ào finalizar o console mostrará uma mensagem 'ready to send message' (esse processo pode demorar um pouco),

isso significa que tudo ocorreu corretamente e sua mensagem deve ser enviada no horário programado
