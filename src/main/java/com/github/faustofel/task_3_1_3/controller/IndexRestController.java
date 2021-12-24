//package com.github.faustofel.task_3_1_3.controller;
//
//import com.github.faustofel.task_3_1_3.model.User;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@RestController
//@RequestMapping("/index")
//public class IndexRestController {
//
//    private int state = 0;
//
//    List<User> list = new ArrayList();
//    {
//        list.add(new User("nameOne","passOne"));
//        list.add(new User("nameTwo","passTwo"));
//        list.add(new User("nameThree","passThree"));
//    }
//
//    @GetMapping("/getElement_02")
//    public ResponseEntity<String> getElement_02() {
//        return new ResponseEntity<>("<h1>ELEMENT 02</h1>", HttpStatus.OK);
//    }
//
//    @GetMapping("/getElement_03")
//    public ResponseEntity<User> getElement_03() {
//        return new ResponseEntity<>(new User("username", "password"), HttpStatus.OK);
//    }
//
//    @GetMapping("/getElement_04")
//    public ResponseEntity<List> getElement_04() {
//        return new ResponseEntity<>( list, HttpStatus.OK);
//    }
//
//    @PostMapping("/")
//    public ResponseEntity postMethod(@RequestBody User user){
//        System.out.println("!!!");
//        list.add(user);
//        return new ResponseEntity(HttpStatus.OK);
//    }
//
//}
