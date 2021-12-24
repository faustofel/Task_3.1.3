package com.github.faustofel.task_3_1_3.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role implements GrantedAuthority {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "roleName", unique = true)
    private String roleName;

    public Role(){}

    public Role(String roleName){
        this.roleName = roleName;
    }

    public Role(Long id, String roleName){
        this(roleName);
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj==null||obj.getClass()!=getClass()) return false;
        if(obj==this||((Role) obj).getAuthority().compareTo(this.getAuthority())==0) return true;
        return false;
    }

    @Override
    public String getAuthority() {
        return roleName;
    }
}
