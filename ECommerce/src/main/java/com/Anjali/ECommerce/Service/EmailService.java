package com.Anjali.ECommerce.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${mail.from}")
    private String from;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom(from);
            helper.setTo(userEmail);
            helper.setSubject(subject);
            helper.setText(text + "\n\nYour OTP: " + otp);

            javaMailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }
}
