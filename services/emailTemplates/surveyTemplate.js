module.exports = ({ body, _id: surveyId}) => {
  return `
    <html>
        <body>
            <div class="body" style="text-align: center;font-family: Arial, Helvetica, sans-serif;padding: 20px;">
                <h2>I'd like your input!</h2>
                <p>Please answer the following question:</p>
                <p>${body}</p>

                <div class="btn" style="position:realative; left: 10rem;">
                    <a style="background: #42f45c;display: block;width: 50px;color: white;font-weight: bold;padding: 10px;text-decoration: none;" href="${process.env.REDIRECT_DOMAIN}/api/surveys/${surveyId}/yes">YES</a>
                    <a style="background: #f44141;display: block;width: 50px;color: white;font-weight: bold;padding: 10px;text-decoration: none;" href="${process.env.REDIRECT_DOMAIN}/api/surveys/${surveyId}/no">NO</a>
                </div>
            </div>
        </body>
    </html>
  `;
};