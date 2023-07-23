const config = {
  billFilePath: './upload/bills',
  nurseNoteFilePath: './upload/nurse-notes',
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  },
  parse: {
    databaseUri: process.env.DB_URI,
    appId: process.env.PARSE_APP_ID,
    masterKey: process.env.PARSE_MASTER_KEY,
    serverURL: process.env.PARSE_SERVER_URL,
    port: process.env.PARSE_PORT,
    mountPath: process.env.PARSE_MOUNT_PATH,
  },
};

module.exports = config;
