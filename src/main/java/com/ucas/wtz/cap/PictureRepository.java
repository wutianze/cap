package com.ucas.wtz.cap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ucas.wtz.cap.Model.Picture;

import java.sql.Timestamp;
import java.util.List;

public interface PictureRepository extends JpaRepository<Picture, Long>{
    Picture findById(String id);
    List<Picture> findAll();
    List<Picture> findByProvider(String provider);
    List<Picture> findByLabel(String label);
    List<Picture> findByPlace(String place);
    List<Picture> findByLabelAndProviderAndPlace(String label,String provider,String place);
    List<Picture> findByLabelAndProvider(String label,String provider);
    List<Picture> findByLabelAndPlace(String label,String place);
    List<Picture> findByPlaceAndProvider(String place,String provider);
    Picture save(Picture picture);
    //List<Picture> findBetweenDateTime(Timestamp starttime,Timestamp endtime);
}