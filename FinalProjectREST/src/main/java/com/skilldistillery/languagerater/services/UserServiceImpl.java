package com.skilldistillery.languagerater.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.languagerater.entities.User;
import com.skilldistillery.languagerater.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository uRepo;

	@Override
	public List<User> index() {
		return uRepo.findAll();
	}

	@Override
	public User show(int id) {
		Optional<User> opt = uRepo.findById(id);
		if (opt.isPresent()) {
			return opt.get();
		} else {
			return null;
		}
	}
	
	@Override
	public User showByUsername(String username) {
		return uRepo.findByUsername(username);
	}

	@Override
	public User create(User u) {
		return uRepo.saveAndFlush(u);
	}

	@Override
	public User update(int id, User u) {
		User existing = null;
		Optional<User> opt = uRepo.findById(id);

		if (opt.isPresent()) {
			existing = opt.get();
			
			existing.setActive(u.getActive());
			existing.setEmail(u.getEmail());
			existing.setFirstName(u.getFirstName());
			existing.setLastName(u.getLastName());
			existing.setRole(u.getRole());
			existing.setUsername(u.getUsername());
			existing.setPassword(u.getPassword());
			
			//TODO add a set for comments?
			
			existing = uRepo.saveAndFlush(existing);

		}
		return existing;
	}

	@Override
	public boolean delete(int id) {
		boolean deleted = false;
		User u = show(id);
		
		if(u != null && uRepo.existsById(u.getId())) {
			uRepo.delete(u);
			deleted = true;
		}
		
		return deleted;
	} 
}
