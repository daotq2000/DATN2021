package com.sapo.qlsc.security;

import com.sapo.qlsc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service("UserDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService  {
	@Autowired
	UserRepository userRepository;
	@Autowired
	private BCryptPasswordEncoder encoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.sapo.qlsc.entity.User user =  userRepository.checkExistEmail(username);
		final List<AppUser> users = Arrays.asList(
			new AppUser(user.getId(),username, user.getPassword(), user.getRole())
		);

		for(AppUser appUser: users) {
			if(appUser.getUsername().equals(username)) {

				List<GrantedAuthority> grantedAuthorities = AuthorityUtils
		                	.commaSeparatedStringToAuthorityList("ROLE_" + appUser.getRole());

				return new User(appUser.getUsername(), appUser.getPassword(), grantedAuthorities);
			}
		}

		throw new UsernameNotFoundException("Username: " + username + " not found");
	}

	private static class AppUser {
		private Long id;
	    	private String username, password;
	    	private byte role;
	    
		public AppUser(Long id, String username, String password, byte role) {
	    		this.id = id;
	    		this.username = username;
	    		this.password = password;
	    		this.role = role;
	    	}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public byte getRole() {
			return role;
		}

		public void setRole(byte role) {
			this.role = role;
		}
	}
}