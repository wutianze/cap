package com.ucas.wtz.cap;

import com.ucas.wtz.cap.Model.SysUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SysUserRepository extends JpaRepository<SysUser, Long> {
    SysUser findByUsername(String username);
    SysUser save(SysUser sysUser);
}
