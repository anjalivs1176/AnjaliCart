package com.Anjali.ECommerce.Service;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username:#{null}}")
    private String springMailUsername;

    @Value("${spring.mail.password:#{null}}")
    private String springMailPassword;

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) throws MessagingException {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setSubject(subject);
            helper.setText(text);
            helper.setTo(userEmail);

            javaMailSender.send(mimeMessage);
        } catch (MailException e) {
            throw new MailSendException("Failed to send Email", e);
        }
    }

    @PostConstruct
    public void debugMailConfig() {
        System.out.println("🌸 MAIL USER FROM SPRING = " + springMailUsername);
        System.out.println("🌸 MAIL PASS FROM SPRING = " + springMailPassword);
    }
}
