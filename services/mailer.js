const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_KEY);

const config = {
    trackingSettings: {
    clickTracking: {
      enable: true
    }
  }
};

module.exports = (data, template) => {
    return sgMail.send({ 
        ...data, 
        from: 'not-reply@emaily.com', 
        html: template,
        to: data.recipients.map(({ email }) => email),
        ...config
    });
};