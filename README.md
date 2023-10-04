# wpp-sticker
 
A integração permitirá que os usuários mandem imagens/vídeos/gifs, links de imagens/vídeos/gifs no Whatsapp e o bot irá transformar-los em Sticker.

## Demo

![Gif Aplicação](https://victor-harry.s3.sa-east-1.amazonaws.com/V%C3%ADdeo+do+WhatsApp+de+2023-01-23+%C3%A0(s)+22.47.05.gif)

## Tecnologias

- [whatsapp-web.js](https://wwebjs.dev/)
- [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)
- [axios](https://axios-http.com/ptbr/docs/intro)

## Rodar o projeto

Clone este projeto com o comando:

```bash
  git clone https://github.com/victorharry/wpp-sticker.git
```

Instale agora as dependencias do projeto com o comando:

```bash
  npm install
```

Por fim rode o comando abaixo para iniciar o projeto e leia o QR Code com o seu Whasapp para se conectar com o serviço.

```bash
  node .
```

### Opções

É possível modificar alguns parâmetros do projeto pela linha de comando:

```bash
  node . --help
Usage: wpp-sticker [OPTIONS]...

Options:
  -d, --debug           Show debug logs (default: false)
  -c, --chrome <value>  Use a installed Chrome Browser
  -f, --ffmpeg <value>  Use a different ffmpeg
  -h, --help            display help for command
```

* Debug: Exibe mensagens de debug no terminal
* Chrome: Permite utilizar um Google Chrome instalado, isso permite a conversão de formatos que dependem de licença, que não estão disponíveis no Chromiun.
* ffmpeg: Permite utilizar um outro ffmpeg. É fornecido um script(`ffmpeg-docker`) que utiliza uma imagem em Docker, sem precisar instalar o ffmpeg.

#### Exemplo MacOS

```bash
node . -c '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' -f ffmpeg-docker
```
