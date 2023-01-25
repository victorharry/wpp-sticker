const { Client, MessageMedia } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const axios = require('axios')
const client = new Client({})
const { removeBackgroundFromImageBase64 } = require('remove.bg')
require('dotenv').config()

const ID_GROUP_Teste_bot = '120363029774299517@g.us'
const ID_GROUP_Ah_amizade = '5524981176474-1527282309@g.us'
const ID_USER_eu = '5524999273282@c.us'

const allowedUserOrGroupIds = [
    ID_GROUP_Teste_bot,
    ID_GROUP_Ah_amizade, 
    ID_USER_eu
]

client.on('qr', qr => {
    qrcode.generate(qr, {small: true})
});

client.on('ready', () => {
    console.log('O Wpp-Sticker está pronto 😋 Não esquece da estrelinha no repo ⭐')
});

/**
 * Aqui vem como default 'message', bora trocar para 'message_create', 
 * dessa forma nós também poderemos dar comandos e não apenas seus 
 * contatos.
 */
client.on('message_create', msg => {
    const command = msg.body.split(' ')[0];
    const sender = msg.from.includes(process.env.PHONE_NUMBER_WITHOUT_FIRST_DIGIT) ? msg.to : msg.from
    if (command === "/sticker" && allowedUserOrGroupIds.includes(sender)) {
        generateSticker(msg, sender)
    }
});

client.initialize();

const generateSticker = async (msg, sender) => {
    if(msg.type === "image") {
        try {
            let { data: image } = await msg.downloadMedia()

            if (msg.body.includes('--transparent')) {
                image = await removeBackground(image)
            }

            image = await new MessageMedia("image/jpeg", image, "image.jpg")
            await client.sendMessage(sender, image, { sendMediaAsSticker: true })
        } catch(e) {
            msg.reply("❌ Erro ao processar imagem")
        }
    } else {
        try {
            const url = msg.body.split(' ').pop();
            const { data } = await axios.get(url, {responseType: 'arraybuffer'})
            let returnedB64 = Buffer.from(data).toString('base64');

            if (msg.body.includes('--transparent')) {
                returnedB64 = await removeBackground(returnedB64)   
            }

            const image = await new MessageMedia("image/jpeg", returnedB64, "image.jpg")
            await client.sendMessage(sender, image, { sendMediaAsSticker: true })
        } catch(e) {
            msg.reply("❌ Não foi possível gerar um sticker com esse link")
        }
    }
}

const removeBackground = async (image) => {
    try  {
        const result = await removeBackgroundFromImageBase64({
            base64img: image,
            apiKey: process.env.REMOVE_BG_API_KEY,
            size: 'regular',
            type: 'auto',
        })
    
        return result.base64img
    } catch (e) {
        console.log(JSON.stringify(e))
    }
}
