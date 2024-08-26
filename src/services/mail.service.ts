'use server'
import { Resend } from "resend";

export default async function sendMail(sender: string, from_mail: string, title: string, message: string) {
    const resend = new Resend(process.env.RESEND_PRIVATE_KEY);
    const mail = {
        from: "users@mangluoitienphong.org <noreply@ethnicityviet.com>",
        to: ["nnphongphu@gmail.com", "bdh@tienphongvietnam.org"],
        subject: `[Tin nhắn từ Mạng lưới Tiên phong Website] ${title}`,
        html: `
        Có một tin nhắn mới từ ${sender} sử dụng form liên hệ @tienphongvietnam.org:
        <h3>Người gửi: ${sender}</h3>
        <h3>Địa chỉ email: ${from_mail}</h3>
        <h3>Tiêu đề: ${title}</h3>
        <p>Nội dung: ${message}</p>`
    };
    return resend.emails.send(mail);
}