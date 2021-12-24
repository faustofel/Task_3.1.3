package com.github.faustofel.task_3_1_3.dao;

import com.github.faustofel.task_3_1_3.model.Role;
import java.util.List;

public interface RoleDAO {

    public List<Role> getAllRoles();
    public Role getRoleById(Long id);
    public Role getRoleByName(String roleName);

    public void addRole(Role role);

}
