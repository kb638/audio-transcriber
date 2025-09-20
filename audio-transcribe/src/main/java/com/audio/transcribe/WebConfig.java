package com.audio.transcribe;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Use allowedOriginPatterns so we can support *.vercel.app preview URLs
                .allowedOriginPatterns(
                        "http://localhost:5173",
                        "https://*.vercel.app" // allows preview + production Vercel URLs
                // optionally add your custom domain here if you attach one later
                // "https://your-domain.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
