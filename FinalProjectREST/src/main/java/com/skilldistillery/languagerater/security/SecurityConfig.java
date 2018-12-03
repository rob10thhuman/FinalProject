package com.skilldistillery.languagerater.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	PasswordEncoder encoder; 
	
	@Autowired
	DataSource dataSource; 
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
	        http
	        .csrf().disable()
	        .authorizeRequests()
	        .antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()
	        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
	        .antMatchers("/login").permitAll()
	        .antMatchers("/register").permitAll()
	        .antMatchers("/*").permitAll()
	        .antMatchers("/api/languages/index").permitAll()
	        .antMatchers("/api/languages/search/{keywords}").permitAll()
	        .antMatchers("/api/languages/{id}").permitAll()
	        .anyRequest().authenticated()
	        .and()
	        .httpBasic();

	        http
	        .sessionManagement()
	        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	  }

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	    String userQuery = "SELECT username, password, active FROM User WHERE username=?";
	    String authQuery = "SELECT username, role FROM User WHERE username=?";
	    auth
	      .jdbcAuthentication()
	      .dataSource(dataSource)
	      .usersByUsernameQuery(userQuery)
	      .authoritiesByUsernameQuery(authQuery)
	      .passwordEncoder(encoder);
	  }

}
