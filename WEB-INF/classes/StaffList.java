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
     * 获得需返回的json字符串
     */
    public static String getJsonDate() {
        // 创建数据库对象
        HandleDB hd = new HandleDB();
        // 创建要转换的对象
        List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
        List<HashMap<String, String>> sum = new ArrayList<HashMap<String, String>>();
        // 返回员工信息为空的个数
        List<HashMap<String, String>> infoNull = new ArrayList<HashMap<String, String>>();
        list = hd.findStaffList();
        sum = hd.findStaffTotal();
        // 员工信息为空的个数        
        int infoNullNum = 0;
        for (HashMap<String, String> l : list) {
            // 判断是否为空
            if (l.get("staff_age") == null)
                infoNullNum++;
        }
        // 转换为String
        String infoNullNumber = infoNullNum + "";
        HashMap<String, String> info = new HashMap<String, String>();
        // 放入Map中
        info.put("infoNullNum", infoNullNumber);
        infoNull.add(info);
        Map<String, List<HashMap<String, String>>> map = new HashMap<String, List<HashMap<String, String>>>();
        map.put("totalCount", sum);
        map.put("results", list);
        map.put("infoNull", infoNull);
        Gson gson = new Gson();
        // 将数据进行转换
        String json = gson.toJson(map);
        return json;
    }
}