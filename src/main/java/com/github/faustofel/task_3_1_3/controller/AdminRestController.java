package com.github.faustofel.task_3_1_3.controller;

import com.github.faustofel.task_3_1_3.model.User;
import com.github.faustofel.task_3_1_3.service.RoleService;
import com.github.faustofel.task_3_1_3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rest/")
public class AdminRestController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService){
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("currentUser")
    public ResponseEntity<User> getActiveUser(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("users")
    public ResponseEntity<List> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("roles")
    public ResponseEntity<List> getAllRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") Long id) {
        userService.removeUser(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("createUser")
    public ResponseEntity createUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PatchMapping("updateUser")
    public ResponseEntity updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity(HttpStatus.OK);
    }
}
