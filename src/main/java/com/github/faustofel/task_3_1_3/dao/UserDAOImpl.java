package com.github.faustofel.task_3_1_3.dao;

import com.github.faustofel.task_3_1_3.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class UserDAOImpl implements UserDAO{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("FROM User", User.class).getResultList();
    }

    @Override
    public User getUserById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User getUserByUserName(String userName) {
        return entityManager.createQuery("FROM User WHERE userName=:userName", User.class)
                .setParameter("userName", userName)
                .getSingleResult();
    }

    @Override
    public void addUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUser(User user) {
        entityManager.merge(user);
    }

    @Override
    public void removeUser(Long id) {
        entityManager.remove(getUserById(id));
    }
}
