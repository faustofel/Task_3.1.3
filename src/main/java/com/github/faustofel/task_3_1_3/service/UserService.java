package com.github.faustofel.task_3_1_3.service;

import com.github.faustofel.task_3_1_3.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User getUserById(Long id);
    public User getUserByUserName(String userName);

    public void addUser(User user);
    public void updateUser(User user);
    public void removeUser(Long id);
}
