package com.poly.datn.security;

import com.poly.datn.exception.userException.TokenExpiredException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
@ControllerAdvice
public class JwtTokenAuthenticationFilter extends OncePerRequestFilter {
    public static JwtConfig jwtConfig;

    public static String token;

    public JwtTokenAuthenticationFilter(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }



        @Override
        @SneakyThrows
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
                throws ServletException, IOException {

            String header = request.getHeader(jwtConfig.getHeader());
            System.out.println(header);
            if(header == null || !header.startsWith(jwtConfig.getPrefix())) {
                chain.doFilter(request, response);
                return;
            }

            token = header.replace(jwtConfig.getPrefix(), "");

            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(jwtConfig.getSecret().getBytes())
                        .parseClaimsJws(token)
                        .getBody();
                System.out.println(claims.toString());
                Long now = System.currentTimeMillis();
                Date date = new Date(now);
                Date exp = claims.getExpiration();
                System.out.println(exp);
                if(date.compareTo(exp) > 0) {
                    return;
                }
                String username = claims.getSubject();
                if(username != null) {
                    List<String> authorities = (List<String>) claims.get("authorities");
                    //String username = taiKhoanService.getTaiKhoanById(Integer.parseInt(id)).getTenDangNhap();
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception e) {
                SecurityContextHolder.clearContext();
                throw new TokenExpiredException("Yêu cầu đăng nhập của bạn đã hết hạn! Vui lòng đăng nhập lại");
            }
            chain.doFilter(request, response);
        }
        @ExceptionHandler
        private ResponseEntity TokenExpiredException(TokenExpiredException e){
            return new ResponseEntity(e.getMessage(), HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        }
}
