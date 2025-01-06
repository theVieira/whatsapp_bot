# Whatsapp bot

Enviar mensagem automaticamente para chats (conversas) do whatsapp

### Recomendações

- Usar o **PM2** para executar em segundo plano

### Pré requisitos

- Node.js v22.11.0
- Chrome

### Como configurar

- **Crie o arquivo de configuração** :: **_config.json_**

- **Insira a imagem a ser enviada na pasta public e configure no config.json**

```{
  schedules: [
    {
      "time": "deve ser uma _expressão cron_"},
      "chats": ["deve inserir o mesmo nome do chat no aplicativo"]
    }
  ],
  "timezone": "deve inserir uma timezone válida",
  "media": "nome do arquivo na pasta public"
}
```

### Como executar

##### Com o PM2

- Execute `pm2 start npm --name whatsapp-bot -- start`
- Então `pm2 logs --lines 50 whatsapp-bot`
- Conecte-se com o QR-Code

##### Sem o PM2

- Execute `npm start`
- Conecte-se com o QR-Code
