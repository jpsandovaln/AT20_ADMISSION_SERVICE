const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

const generate = (privateKey, { id, name, eml, avatar, appId, kid }) => {
    const now = new Date();
    const jwt = jsonwebtoken.sign({
        aud: 'jitsi',
        context: {
            user: {
                id,
                name,
                avatar,
                email: eml,
                moderator: 'true'
            },
            features: {
                livestreaming: 'true',
                recording: 'true',
                transcription: 'true',
                'outbound-call': 'true'
            }
        },
        iss: 'chat',
        room: '*',
        sub: appId,
        exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
        nbf: (Math.round((new Date()).getTime() / 1000) - 10)
    }, privateKey, { algorithm: 'RS256', header: { kid } });
    return jwt;
};
const privateKey = fs.readFileSync('src/Key 4_18_2023, 12_48_12 PM.pk', 'utf8');

const token = generate(privateKey, { // Pass your generated private key
    id: '1234', // You can generate your own id
    name: 'Gio Perez', // Set the user name
    email: 'gio@gmail.com', // Set the user email
    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50', // Set the user avatar
    appId: 'vpaas-magic-cookie-325753d5a9de49c393ada134def1a104', // Your AppID
    kid: 'vpaas-magic-cookie-325753d5a9de49c393ada134def1a104/dc6dc8' // Set the api key, see https://jaas.8x8.vc/#/apikeys for more info.
});
console.log(token); // Write JWT to console.
