package com.ucas.wtz.cap.Model;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Picture {
    @Id
    private String id;
    private String addr;
    private Timestamp dateTime;
    private String label;
    private String provider;
    private String place;
    private boolean copyright;

    public Picture(){};
    public Picture(String id, String addr, Timestamp dateTime, String label, String provider, String place, boolean copyright) {
        this.id = id;
        this.addr = addr;
        this.dateTime = dateTime;
        this.label = label;
        this.provider = provider;
        this.place = place;
        this.copyright = copyright;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public Timestamp getDateTime() {
        return dateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public boolean isCopyright() {
        return copyright;
    }

    public void setCopyright(boolean copyright) {
        this.copyright = copyright;
    }
}

