'use client';

import Image from "next/image";
import Form from "antd/es/form";
import Result from "antd/es/result";
import Button from "antd/es/button";
import sendEmail from "@/services/mail.service";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
    const [form] = Form.useForm();
    const [status, setStatus] = useState<string>('idle');

    const handleSubmit = (data: any) => {
        setStatus('loading');
        sendEmail(data.sender, data.email, data.subject, data.message).then(() => {
            form.resetFields();
            setStatus('success');
        }).catch((err: any) => {
            setStatus('error');
        });
    }

    return <>
        <div
            className='w-screen justify-center items-center relative flex flex-row max-w-[1920px] m-auto py-5'>
            <div className="w-11/12 xl:w-1/2 min-h-screen flex flex-col items-center xl:items-start mb-5">
                <h1 className="text-white text-xl font-medium md:text-4xl mb-5">Liên hệ</h1>
                <div className="bg-white w-full p-5 flex flex-col">
                    <h1 className="text-xl text-medium md:text-4xl mb-5">Gửi thư cho chúng tôi</h1>
                    {
                        status == 'success' && <Result
                            status="success"
                            title="Tin nhắn của bạn đã được gửi thành công!"
                            subTitle="Chúng tôi sẽ liên hệ với bạn sớm nhất có thể."
                            extra={[
                                <Link key={"backHomeButtonSuccess"} href="/">
                                    <Button type="primary">
                                        Trở về trang chủ
                                    </Button>
                                </Link>,
                            ]}
                        />
                    }
                    {
                        status == 'error' && <Result
                            status="error"
                            title="Có lỗi xảy ra khi gửi tin nhắn."
                            subTitle="Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với chúng tôi qua những kênh khác."
                            extra={[
                                <Link key={"backHomeButtonError"} href="/">
                                    <Button type="primary">
                                        Trở về trang chủ
                                    </Button>
                                </Link>,
                            ]}
                        />
                    }
                    {(status == 'idle' || status == 'loading') && <Form
                        labelCol={{ span: 8 }}
                        onFinish={handleSubmit}
                        form={form}
                    >
                        <Form.Item name="sender" label="Người gửi" colon={false} rules={[{ required: true }]}>
                            <input type="text" className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <Form.Item name="email" label="Email" colon={false} rules={[{ required: true, type: 'email' }]}>
                            <input type="email" className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <Form.Item name="subject" label="Tiêu đề" colon={false} rules={[{ required: true }]}>
                            <input type="text" className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <Form.Item name="message" label="Nội dung" colon={false} rules={[{ required: true }]}>
                            <textarea className="w-full p-2 border-[1px] border-gray-300" />
                        </Form.Item>
                        <div className="w-full flex flex-row justify-end">
                            <Form.Item>
                                <Button loading={status == 'loading'} htmlType="submit">Gửi</Button>
                            </Form.Item>
                        </div>
                    </Form>}
                </div>
            </div >
            <div className="absolute w-full h-full bg-red-700/[50%] -z-[9]" />
            <Image
                src="/hero.jpg"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                alt="Background"
                className="absolute -z-10"
            />
        </div>
    </>
}