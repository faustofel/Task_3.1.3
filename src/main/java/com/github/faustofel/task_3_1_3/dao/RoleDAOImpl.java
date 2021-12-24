package com.github.faustofel.task_3_1_3.dao;

import com.github.faustofel.task_3_1_3.model.Role;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class RoleDAOImpl implements RoleDAO{

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("FROM Role", Role.class)
                .getResultList();
    }

    @Override
    public Role getRoleById(Long id) {
        return entityManager.find(Role.class, id);
    }

    @Override
    public Role getRoleByName(String roleName) {
        return entityManager.createQuery("FROM Role WHERE roleName=:roleName",Role.class)
                .setParameter("roleName", roleName)
                .getSingleResult();
    }

    @Override
    public void addRole(Role role) {
        entityManager.persist(role);
    }
}
