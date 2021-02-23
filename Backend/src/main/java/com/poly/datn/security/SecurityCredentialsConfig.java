package com.poly.datn.security;

import com.poly.datn.contraint.ROLE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class SecurityCredentialsConfig extends WebSecurityConfigurerAdapter {

 	@Qualifier("UserDetailsServiceImpl")
	@Autowired
	private UserDetailsService userService;

	@Autowired
	private JwtConfig jwtConfig;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and()
		    .csrf().disable()
	            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	            .exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
	        .and()
		    .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager(), jwtConfig))
				.addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
		.authorizeRequests()
		    .antMatchers(HttpMethod.POST, jwtConfig.getUri()).permitAll()
				.antMatchers("**").permitAll()
//				.antMatchers("/admin/checkUser").permitAll()
//				.antMatchers("/admin/products/image/**").permitAll()
//				.antMatchers("/admin/provinces/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR)
//				.antMatchers("/admin/wards/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR)
//				.antMatchers(HttpMethod.DELETE,"/admin/customers/**").hasAnyRole(ROLE.ADMIN)
//				.antMatchers(HttpMethod.POST,"/admin/maintenanceCards/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR)
//				.antMatchers(HttpMethod.GET,"/admin/maintenanceCards/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR,ROLE.REPAIRMAN)
//				.antMatchers(HttpMethod.PUT,"/admin/maintenanceCards/workStatus/**").hasAnyRole(ROLE.REPAIRMAN)
//				.antMatchers(HttpMethod.PUT,"/admin/maintenanceCardDetails/status").hasAnyRole(ROLE.REPAIRMAN)
//				.antMatchers("/admin/paymentHistories/**").hasAnyRole("3")
//				.antMatchers(HttpMethod.GET,"/admin/products/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR)
//				.antMatchers(HttpMethod.POST,"/admin/products/**").hasAnyRole(ROLE.ADMIN)
//				.antMatchers(HttpMethod.PUT,"/admin/products/**").hasAnyRole(ROLE.ADMIN)
//				.antMatchers(HttpMethod.DELETE,"/admin/products/**").hasAnyRole(ROLE.ADMIN)
//				.antMatchers("/admin/accessories").hasAnyRole(ROLE.ADMIN)
//				.antMatchers("/admin/services").hasAnyRole(ROLE.ADMIN)
//				.antMatchers("/admin/users/maintenanceCard").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR)
//				.antMatchers("/admin/users").hasAnyRole(ROLE.ADMIN)
//				.antMatchers("/admin/customers/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR)
//				.antMatchers("/admin/**").hasAnyRole(ROLE.ADMIN,ROLE.COORDINATOR,ROLE.REPAIRMAN)
//				.antMatchers(HttpMethod.POST,"/admin/**").hasAnyRole(ROLE.COORDINATOR)
//				.antMatchers("/admin/**").hasAnyRole(ROLE.ADMIN)
		    .anyRequest().permitAll();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
	}
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}
}
