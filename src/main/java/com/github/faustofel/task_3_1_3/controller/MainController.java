package com.github.faustofel.task_3_1_3.controller;

import com.github.faustofel.task_3_1_3.model.Role;
import com.github.faustofel.task_3_1_3.model.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/") // it isn't necessary
public class MainController {



    @GetMapping(value={"/login", "/"})
    public String getLogin(){
        return "login";
    }

    @GetMapping("admin")
    public String getAdminPage() {
        return "admin";
    }

    @GetMapping("user")
    public String getUserPage(@AuthenticationPrincipal User user, Model model) {
        // следующая строка нужна исключительно для управления(есть/нет) кнопкой ADMIN на странице юзера, решение кривое но пришло быстро
        model.addAttribute("isAdmin", user.hasRole(new Role("ROLE_ADMIN")));
        model.addAttribute("activeuser", user);
        return "user";
    }
}
