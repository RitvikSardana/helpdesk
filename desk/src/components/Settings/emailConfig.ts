import LogoGmail from "@/assets/images/gmail.png";
import LogoOutlook from "@/assets/images/outlook.png";
import LogoSendgrid from "@/assets/images/sendgrid.png";
import LogoSparkpost from "@/assets/images/sparkpost.webp";
import LogoYahoo from "@/assets/images/yahoo.png";
import LogoYandex from "@/assets/images/yandex.png";
import LogoFrappeMail from "@/assets/images/frappe-mail.svg";
import { RenderField, EmailService } from "@/types";
const fixedFields: RenderField[] = [
  {
    label: "Account Name",
    name: "email_account_name",
    type: "text",
    placeholder: "Support / Sales",
  },
  {
    label: "Email ID",
    name: "email_id",
    type: "email",
    placeholder: "johndoe@example.com",
  },
];

export const popularProviderFields = [
  ...fixedFields,
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
  },
];

export const customProviderFields = [
  ...fixedFields,
  {
    label: "API Key",
    name: "api_key",
    type: "text",
    placeholder: "********",
  },
  {
    label: "API Secret",
    name: "api_secret",
    type: "password",
    placeholder: "********",
  },
];

export const services: EmailService[] = [
  {
    name: "FrappeMail",
    icon: LogoFrappeMail,
    info: `Setting up Frappe Mail requires you to have an API key and API Secret of your email account. Read more `,
    link: "https://yandex.com/support/id/authorization/app-passwords.html",
    custom: true,
  },
  {
    name: "GMail",
    icon: LogoGmail,
    info: `Setting up GMail requires you to enable two factor authentication
		  and app specific passwords. Read more`,
    link: "https://support.google.com/accounts/answer/185833",
    custom: false,
  },
  {
    name: "Outlook",
    icon: LogoOutlook,
    info: `Setting up Outlook requires you to enable two factor authentication
		  and app specific passwords. Read more`,
    link: "https://support.microsoft.com/en-us/account-billing/how-to-get-and-use-app-passwords-5896ed9b-4263-e681-128a-a6f2979a7944",
    custom: false,
  },
  {
    name: "Sendgrid",
    icon: LogoSendgrid,
    info: `Setting up Sendgrid requires you to enable two factor authentication
		  and app specific passwords. Read more `,
    link: "https://sendgrid.com/docs/ui/account-and-settings/two-factor-authentication/",
    custom: false,
  },
  {
    name: "SparkPost",
    icon: LogoSparkpost,
    info: `Setting up SparkPost requires you to enable two factor authentication
		  and app specific passwords. Read more `,
    link: "https://support.sparkpost.com/docs/my-account-and-profile/enabling-two-factor-authentication",
    custom: false,
  },
  {
    name: "Yahoo",
    icon: LogoYahoo,
    info: `Setting up Yahoo requires you to enable two factor authentication
		  and app specific passwords. Read more `,
    link: "https://help.yahoo.com/kb/SLN15241.html",
    custom: false,
  },
  {
    name: "Yandex",
    icon: LogoYandex,
    info: `Setting up Yandex requires you to enable two factor authentication
		  and app specific passwords. Read more `,
    link: "https://yandex.com/support/id/authorization/app-passwords.html",
    custom: false,
  },
];

export const emailDefaults = {
  GMail: {
    email_server: "imap.gmail.com",
    use_ssl: 1,
    smtp_server: "smtp.gmail.com",
  },
  Outlook: {
    email_server: "imap-mail.outlook.com",
    use_ssl: 1,
    smtp_server: "smtp-mail.outlook.com",
  },
  Sendgrid: {
    smtp_server: "smtp.sendgrid.net",
    smtp_port: 587,
  },
  SparkPost: {
    smtp_server: "smtp.sparkpostmail.com",
  },
  Yahoo: {
    email_server: "imap.mail.yahoo.com",
    use_ssl: 1,
    smtp_server: "smtp.mail.yahoo.com",
    smtp_port: 587,
  },
  Yandex: {
    email_server: "imap.yandex.com",
    use_ssl: 1,
    smtp_server: "smtp.yandex.com",
    smtp_port: 587,
  },
};