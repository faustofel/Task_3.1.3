package com.github.faustofel.task_3_1_3.service;

import com.github.faustofel.task_3_1_3.dao.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private UserDAO userDAO;

    @Autowired
    public UserDetailServiceImpl(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userDAO.getUserByUserName(s);
    }
}
