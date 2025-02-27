const EMAIL_TEMPLATE_STYLE = `
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
  }
  .header {
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 35%, rgba(0,212,255,1) 100%);
    padding: 20px;
    text-align: center;
    border-radius: 10px 10px 0 0;
  }
  .header h1 {
    color: white;
    margin: 0;
  }
  .content {
    background-color: white;
    padding: 20px;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .button {
    display: inline-block;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 35%, rgba(0,212,255,1) 100%);
    color: white;
    padding: 12px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  .footer {
    text-align: center;
    margin-top: 20px;
    color: #888;
    font-size: 0.8em;
  }
`;

export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>${EMAIL_TEMPLATE_STYLE}</style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: rgb(0, 0, 0); margin: 30px 0;">
      {verificationCode}
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>${EMAIL_TEMPLATE_STYLE}</style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Successful</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,107,1) 35%, rgba(0,212,255,1) 100%); color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>${EMAIL_TEMPLATE_STYLE}</style>
</head>
<body>
  <div class="header">
    <h1>Password Reset</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" class="button" style="color: white !important; text-decoration: none;">
        Reset Password
      </a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;