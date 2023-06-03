const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const CLIENT_ID = '324109435320-q64cuge05oejrjfg1dnue18mmqt4c0d4.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04AkIO2faSy3iCgYIARAAGAQSNwF-L9Irx476vg9r6Olj519qlRcs5TJYW_gSpGTi5kTpqrhEBYMI_FJ_jfnP5NB48_r5bg68jlY';
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
    );
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendEmail = async(email,url )=>{
  const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'backendtesting9@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailOptions = {
          from: 'Domicial <backendtesting9@gmail.com>',
          to: email,
          subject: 'Verify your Account',
          text: 'Hello from gmail email using API',
          html: `
          <!DOCTYPE html>
              <html>
              <head>

              <meta charset="utf-8">
              <meta http-equiv="x-ua-compatible" content="ie=edge">
              <title>Password Reset</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style type="text/css">
              /**
               * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
               */
              @media screen {
                  @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 400;
                  src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                  }

                  @font-face {
                  font-family: 'Source Sans Pro';
                  font-style: normal;
                  font-weight: 700;
                  src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                  }
              }

              /**
               * Avoid browser level font resizing.
               * 1. Windows Mobile
               * 2. iOS / OSX
               */
              body,
              table,
              td,
              a {
                  -ms-text-size-adjust: 100%; /* 1 */
                  -webkit-text-size-adjust: 100%; /* 2 */
              }

              /**
               * Remove extra space added to tables and cells in Outlook.
               */
              table,
              td {
                  mso-table-rspace: 0pt;
                  mso-table-lspace: 0pt;
              }

              /**
               * Better fluid images in Internet Explorer.
               */
              img {
                  -ms-interpolation-mode: bicubic;
              }

              /**
               * Remove blue links for iOS devices.
               */
              a[x-apple-data-detectors] {
                  font-family: inherit !important;
                  font-size: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
                  color: inherit !important;
                  text-decoration: none !important;
              }

              /**
               * Fix centering issues in Android 4.4.
               */
              div[style*="margin: 16px 0;"] {
                  margin: 0 !important;
              }

              body {
                  width: 100% !important;
                  height: 100% !important;
                  padding: 0 !important;
                  margin: 0 !important;
              }

              /**
               * Collapse table borders to avoid space between cells.
               */
              table {
                  border-collapse: collapse !important;
              }

              a {
                  color: #1a82e2;
              }

              img {
                  height: auto;
                  line-height: 100%;
                  text-decoration: none;
                  border: 0;
                  outline: none;
              }
              </style>

              </head>
              <body style="background-color: #e9ecef;">
              <!-- start preheader -->
              <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                  A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
              </div>
              <!-- end preheader -->

              <!-- start body -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <!-- start hero -->
                  <tr>
                  <td align="center" bgcolor="#e9ecef">
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                      <tr>
                      <td align="center" valign="top" width="600">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                      <tr>
                          <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Account Verifiction</h1>
                          </td>
                      </tr>
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                  </td>
                  </tr>
                  <!-- end hero -->

                  <!-- start copy block -->
                  <tr>
                  <td align="center" bgcolor="#e9ecef">
                      <!--[if (gte mso 9)|(IE)]>
                      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                      <tr>
                      <td align="center" valign="top" width="600">
                      <![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                      <!-- start copy -->
                      <tr>
                          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">Tap the button below to Verify your customer account . If you didn't request a new account, you can safely delete this email.</p>
                          </td>
                      </tr>
                      <!-- end copy -->

                      <!-- start button -->
                      <tr>
                          <td align="left" bgcolor="#ffffff">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%">
                              <tr>
                              <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                  <tr>
                                      <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                      <a href="${url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">CLICK HERE</a>
                                      </td>
                                  </tr>
                                  </table>
                              </td>
                              </tr>
                          </table>
                          </td>
                      </tr>
                      <!-- end button -->

                      <!-- start copy -->
                      <tr>
                          <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                          <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                          <p style="margin: 0;"><a href="${url}" target="_blank">${url}</a></p>
                          </td>
                      </tr>
                      <!-- end copy -->
                      </table>
                      <!--[if (gte mso 9)|(IE)]>
                      </td>
                      </tr>
                      </table>
                      <![endif]-->
                  </td>
                  </tr>
                  <!-- end copy block -->

              </table>
              <!-- end body -->

              </body>
              </html>
      `
        };

        await transport.sendMail(mailOptions)

}
 
const sendEmailForgotPassword =  async(email,url ) =>{
        try{
            const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
        service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'backendtesting9@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailOptions = {
          from: 'Domicial <backendtesting9@gmail.com>',
          to: email,
          subject: 'Forgot Password',
          html: 
          
          `
            <!DOCTYPE html>
                <html>
                <head>

                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Password Reset</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                /**
                 * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
                 */
                @media screen {
                    @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                    }

                    @font-face {
                    font-family: 'Source Sans Pro';
                    font-style: normal;
                    font-weight: 700;
                    src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                    }
                }

                /**
                 * Avoid browser level font resizing.
                 * 1. Windows Mobile
                 * 2. iOS / OSX
                 */
                body,
                table,
                td,
                a {
                    -ms-text-size-adjust: 100%; /* 1 */
                    -webkit-text-size-adjust: 100%; /* 2 */
                }

                /**
                 * Remove extra space added to tables and cells in Outlook.
                 */
                table,
                td {
                    mso-table-rspace: 0pt;
                    mso-table-lspace: 0pt;
                }

                /**
                 * Better fluid images in Internet Explorer.
                 */
                img {
                    -ms-interpolation-mode: bicubic;
                }

                /**
                 * Remove blue links for iOS devices.
                 */
                a[x-apple-data-detectors] {
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    color: inherit !important;
                    text-decoration: none !important;
                }

                /**
                 * Fix centering issues in Android 4.4.
                 */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }

                body {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /**
                 * Collapse table borders to avoid space between cells.
                 */
                table {
                    border-collapse: collapse !important;
                }

                a {
                    color: #1a82e2;
                }

                img {
                    height: auto;
                    line-height: 100%;
                    text-decoration: none;
                    border: 0;
                    outline: none;
                }
                </style>

                </head>
                <body style="background-color: #e9ecef;">
                <!-- start preheader -->
                <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
                </div>
                <!-- end preheader -->

                <!-- start body -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- start hero -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Reset Your Password</h1>
                            </td>
                        </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                    </tr>
                    <!-- end hero -->

                    <!-- start copy block -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <!--[if (gte mso 9)|(IE)]>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                        <tr>
                        <td align="center" valign="top" width="600">
                        <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start button -->
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                        <a href="${url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">CLICK HERE</a>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        <!-- end button -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                            <p style="margin: 0;"><a href="${url}" target="_blank">${url}</a></p>
                            </td>
                        </tr>
                        <!-- end copy -->
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                        </td>
                        </tr>
                        </table>
                        <![endif]-->
                    </td>
                    </tr>
                    <!-- end copy block -->

                </table>
                <!-- end body -->

                </body>
                </html>
        `
        };

        await transport.sendMail(mailOptions)
        }catch(err){
            console.log(err)
        }
}
module.exports = {sendEmail , sendEmailForgotPassword }  

