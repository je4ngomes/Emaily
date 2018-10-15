module.exports = ({ body }) => {
  return `
    <html>
        <body>
            <div style="text-align: center;background: #333; padding: 20px;">
                <h3>I'd your input!</h3>
                <p>Please answer the following question:</p>
                <p>${body}</p>

                <div><a href="${process.env.REDIRECT_DOMAIN}/surveys/feedback">Yes</a></div>
                <div><a href="${process.env.REDIRECT_DOMAIN}/surveys/feedback">No</a></div>
            </div>
        </body>
    </html>
  `;
};