package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.google.gson.Gson;
import com.db.HandleDB;

public class StaffList extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(getJsonDate());
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }

    /**
     * ����践�ص�json�ַ���
     */
    public static String getJsonDate() {
        // �������ݿ����
        HandleDB hd = new HandleDB();
        // ����Ҫת���Ķ���
        List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
        List<HashMap<String, String>> sum = new ArrayList<HashMap<String, String>>();
        // ����Ա����ϢΪ�յĸ���
        List<HashMap<String, String>> infoNull = new ArrayList<HashMap<String, String>>();
        list = hd.findStaffList();
        sum = hd.findStaffTotal();
        // Ա����ϢΪ�յĸ���        
        int infoNullNum = 0;
        for (HashMap<String, String> l : list) {
            // �ж��Ƿ�Ϊ��
            if (l.get("staff_age") == null)
                infoNullNum++;
        }
        // ת��ΪString
        String infoNullNumber = infoNullNum + "";
        HashMap<String, String> info = new HashMap<String, String>();
        // ����Map��
        info.put("infoNullNum", infoNullNumber);
        infoNull.add(info);
        Map<String, List<HashMap<String, String>>> map = new HashMap<String, List<HashMap<String, String>>>();
        map.put("totalCount", sum);
        map.put("results", list);
        map.put("infoNull", infoNull);
        Gson gson = new Gson();
        // �����ݽ���ת��
        String json = gson.toJson(map);
        return json;
    }
}