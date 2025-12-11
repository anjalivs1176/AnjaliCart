package com.Anjali.ECommerce.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String fromEmail;

    public void sendVerificationOtpEmail(String toEmail, String otp, String subject, String text) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(subject);
            message.setText(text + "\nYour OTP is: " + otp);

            mailSender.send(message);

            System.out.println("📧 Gmail SMTP Email Sent Successfully to " + toEmail);

        } catch (MailException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send Email");
        }
    }
}
