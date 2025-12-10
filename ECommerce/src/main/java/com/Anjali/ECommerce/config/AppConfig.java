package com.Anjali.ECommerce.config;

import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration                 // 💡 Marks this as a configuration class (used by Spring during startup)
@EnableWebSecurity             // 💡 Enables Spring Security in the application
public class AppConfig {

    /**
     * 💡 Main security configuration method This defines how Spring Security
     * will protect all HTTP endpoints. We’re using a stateless setup with JWT
     * authentication (no sessions).
     */
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .sessionManagement(session
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                // Public GET endpoints for homepage
                .requestMatchers(HttpMethod.GET, "/api/home/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/deals/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/home-categories/**").permitAll()
                // Authentication routes
                .requestMatchers("/api/seller/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                // Admin routes
                .requestMatchers("/api/admin/**").authenticated()
                // Everything else under API requires login
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
                )
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        return new CorsConfigurationSource() {
            @Override
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();

                cfg.setAllowedOriginPatterns(List.of(
                        "http://localhost:3000",
                        "https://anjalicart.netlify.app"
                ));

                // ✅ Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                cfg.setAllowedMethods(Collections.singletonList("*"));

                // ✅ Allow all headers (Authorization, Content-Type, etc.)
                cfg.setAllowedHeaders(Collections.singletonList("*"));

                // ✅ Allow credentials (e.g., cookies or Authorization headers)
                cfg.setAllowCredentials(true);

                // ✅ Expose specific headers to frontend (like Authorization)
                cfg.setExposedHeaders(Collections.singletonList("Authorization"));

                // ✅ Set how long the CORS configuration can be cached by the browser (in seconds)
                cfg.setMaxAge(3600L);

                return cfg;
            }
        };
    }

    /**
     * 💡 PasswordEncoder bean Used by Spring Security for hashing passwords
     * (e.g., during registration or login validation).
     */
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 💡 RestTemplate bean Used when you need to make REST API calls from your
     * backend (e.g., calling an external API).
     */
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
