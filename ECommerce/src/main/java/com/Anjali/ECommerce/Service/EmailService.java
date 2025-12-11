package com.Anjali.ECommerce.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${mail.from}")
    private String from;

    public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text) {

        try {
            String url = "https://api.resend.com/emails";

            String jsonBody = """
                {
                  "from": "%s",
                  "to": ["%s"],
                  "subject": "%s",
                  "html": "<p>%s</p><p>Your OTP is <b>%s</b></p>"
                }
            """.formatted(from, userEmail, subject, text, otp);

            HttpClient client = HttpClient.newHttpClient();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "Bearer " + resendApiKey)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response
                    = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("📧 RESEND RESPONSE = " + response.body());

            if (response.statusCode() >= 400) {
                throw new RuntimeException("Failed to send email via Resend");
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to send Email", e);
        }
    }
}
