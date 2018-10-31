package com.ucas.wtz.cap.controller;

import com.ucas.wtz.cap.DBUtil;
import com.ucas.wtz.cap.Model.Picture;
import com.ucas.wtz.cap.PictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.*;

@Controller
public class FileUploadController {
// 这里的是application.properties中配置的地址
@Value("${uploadpic.path}")
private String uploadPicPath;

@Autowired
PictureRepository pictureRepository;

// 主界面
  @GetMapping("/")
  public String listUploadedFiles(Model model) throws IOException {
    model.addAttribute("messages", "cpxxxxx");
  return  "index";
  }
  @GetMapping("/t")
    public String test(Model model) throws IOException {
      Timestamp dateTime=new Timestamp(System.currentTimeMillis());
        readImage2DB("F:\\","a","F:\\",dateTime,"label","me","ucas",true);
        return  "index";
    }

  // 文件上传按钮action
  @PostMapping("/uploadPic")
  public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes, Model model) throws Exception {
    // 存储图片到本地
    storePic(file);
    redirectAttributes.addFlashAttribute("message", "成功上传" + file.getOriginalFilename() + "!");
    System.out.println("上传的文件名字：" + file.getOriginalFilename());
    model.addAttribute("picName", file.getOriginalFilename()); // 将文件传输成功之后的名字传回界面，用于展示图片
    return "index";
  }


  private String storePic(MultipartFile file) throws Exception {
    String filename = StringUtils.cleanPath(file.getOriginalFilename());
      try (InputStream inputStream = file.getInputStream()) {
        Files.copy(inputStream, Paths.get(uploadPicPath + filename), // 这里指定了下载的位置
                                  StandardCopyOption.REPLACE_EXISTING);
      }
    catch (IOException e) {
      throw new Exception("失败！" + filename, e);
    }
    return filename;
  }

    // 将图片插入数据库
    private void readImage2DB(String path, String id, String addr, Timestamp dateTime,String label,String provider,String place,boolean copyright) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            Picture picture= pictureRepository.findById("a");
            System.out.println(picture.getLabel());
            /*conn = DBUtil.getConn();
            String sql = "insert into picture (id,addr,dateTime,label,provider,place,copyright)values(?,?,?,?,?,?,?)";
            ps = conn.prepareStatement(sql);
            ps.setString(1, id);
            ps.setString(2, addr);
            ps.setTimestamp(3,dateTime );
            ps.setString(4, label);
            ps.setString(5, provider);
            ps.setString(6, place);
            ps.setBoolean(7, copyright);
            int count = ps.executeUpdate();
            if (count > 0) {
                System.out.println("插入成功！");
            } else {
                System.out.println("插入失败！");
            }*/
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBUtil.closeConn(conn);
            if (null != ps) {
                try {
                    ps.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    // 读取数据库中图片
    private static void readDB2Image() {
        String targetPath = "D:/image/1.png";
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = DBUtil.getConn();
            String sql = "select * from photo where id =?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1, 1);
            rs = ps.executeQuery();
            while (rs.next()) {
                InputStream in = rs.getBinaryStream("photo");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            DBUtil.closeConn(conn);
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (ps != null) {
                try {
                    ps.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

        }
    }
}
