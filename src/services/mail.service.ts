'use server'
import { Resend } from "resend";

export default async function sendMail(sender: string, from_mail: string, title: string, message: string) {
    const resend = new Resend(process.env.RESEND_PRIVATE_KEY);
    const mail = {
        from: "users@ethnicityviet.com <noreply@ethnicityviet.com>",
        to: ["nnphongphu@gmail.com", "ethnicityviet@gmail.com"],
        subject: `[MESSAGSE FROM ETHNICITYVIET.COM] ${title}`,
        html: `
        A new message from ${sender} using the contact form @ethnicityviet.com:
            <h3>Sender: ${sender}</h3>
            <h3>From: ${from_mail}</h3>
            <h3>Title: ${title}</h3>
            <p>Content: ${message}</p>
        `
    };
    return resend.emails.send(mail);
}