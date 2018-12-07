package com.ucas.wtz.cap.controller;

import com.ucas.wtz.cap.Model.Picture;
import com.ucas.wtz.cap.PictureRepository;
import net.minidev.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
public class FileUploadController {
// 这里的是application.properties中配置的地址
@Value("${uploadpic.path}")
private String uploadPicPath;

@Autowired
PictureRepository pictureRepository;
    @ResponseBody
    @PostMapping("/uploadImg")
    public String uploadImg(@RequestParam("label") String label,@RequestParam("provider") String provider,@RequestParam("place") String place,@RequestParam("dateTime") String dateTime,@RequestParam("description") String description,@RequestParam("published") boolean published,@RequestParam("copyright") boolean copyright,@RequestParam("imgFile") MultipartFile file) throws Exception {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String date = df.format(new Date());// new Date()为获取当前系统时间，也可使用当前时间戳
        Date existTime = null;
        DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        if(!dateTime.equals(""))existTime = format1.parse(dateTime);
        String name = storePic(file);
      pictureRepository.save(new Picture(date+':'+name,"\\images\\pic\\"+name,existTime,label,provider,place,copyright,published,description));
        return  "success";
    }
    @ResponseBody
    @PostMapping("/search")
    public String search(@RequestParam("content") String label,@RequestParam("provider") String provider,@RequestParam("place") String place,@RequestParam("starttime") String starttime,@RequestParam("endtime") String endtime) throws Exception {
      List<Picture>result = new ArrayList<Picture>();

      if(!label.equals("")){//标签查找约定，返回全部符合的图片，即图片必须符合所有标签才返回
          List<Picture>tmp = new ArrayList<Picture>();
          if(!provider.equals("")){
              if(!place.equals("")){
                  tmp = pictureRepository.findByPlaceAndProvider(place,provider);
              }else{
                  tmp = pictureRepository.findByProvider(provider);
              }
          }else{
              if(!place.equals("")){
                  tmp = pictureRepository.findByPlace(place);
              }else{
                  tmp = pictureRepository.findAll();
              }
          }
          String [] labels = label.split("\t");
          for(Picture pic : tmp){
              boolean flag = false;
              for(int i=0;i<labels.length;i++){
                  if(!pic.getLabel().contains(labels[i])){
                      flag = true;
                      break;
                  }
              }
              if(!flag){
                  result.add(pic);
              }
          }
      }else{
          if(!provider.equals("")){
              if(!place.equals("")){
                  result = pictureRepository.findByPlaceAndProvider(place,provider);
              }else{
                  result = pictureRepository.findByProvider(provider);
              }
          }else{
              if(!place.equals("")){
                  result = pictureRepository.findByPlace(place);
              }else{
                  result = pictureRepository.findAll();
              }
          }
      }
      List<Picture>timeRe = new ArrayList<>();
      Date sT=null,eT=null;
      if(starttime!=null&&(!starttime.equals("")))sT = new SimpleDateFormat("yyyy-MM-dd").parse(starttime);
      if(endtime!=null&&(!endtime.equals("")))eT = new SimpleDateFormat("yyyy-MM-dd").parse(endtime);
      for(Picture pic : result){
          if(sT!=null){
              Date picDate = new SimpleDateFormat("yyyy-MM-dd").parse(pic.getDateTime().toString());
              if((picDate.after(sT)&&picDate.before(eT))||picDate.equals(sT)||picDate.equals(eT)){
                  timeRe.add(pic);
              }
          }else {
              timeRe.add(pic);
          }
      }
      String re = JSONArray.toJSONString(timeRe);
      System.out.println(re);
        //readImage2DB("F:\\","a","F:\\",dateTime,"label","me","ucas",true);
        return  re;
    }

  private String storePic(MultipartFile file) throws Exception {
    String filename = StringUtils.cleanPath(file.getOriginalFilename());
      try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, Paths.get(uploadPicPath + filename), // somewhat tricky
                                  StandardCopyOption.REPLACE_EXISTING);
      }
    catch (Exception e) {
      throw new Exception("失败！" + filename, e);
    }
    return filename;
  }
}
