package com.ucas.wtz.cap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ucas.wtz.cap.Model.Picture;

public interface PictureRepository extends JpaRepository<Picture, Long>{
    Picture findById(String id);
}