const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'votre_email@gmail.com',
        pass: 'votre_mot_de_passe'
    }
});

const mailOptions = {
    from: 'votre_email@gmail.com',
    to: 'destinataire@gmail.com',
    subject: 'Mise à jour de votre entretien',
    text: 'Les détails de votre entretien ont changé.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log('Email envoyé : ' + info.response);
});
