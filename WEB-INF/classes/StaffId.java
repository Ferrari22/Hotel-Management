package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.google.gson.Gson;
import com.db.HandleDB;

public class StaffId extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(getJsonDate());
    }


    public static String getJsonDate() {
        HandleDB hd = new HandleDB();
        List<HashMap<String, String>> result = new ArrayList<HashMap<String, String>>();
        result = hd.findStaffId();
        for (int i = 0; i < result.size(); i++) {
            if (result.get(i).get("id_number") == null) {
                result.remove(i);
            }
        }
        Map<String, List<HashMap<String, String>>> map = new HashMap<String, List<HashMap<String, String>>>();
        map.put("idlist", result);
        Gson gson = new Gson();
        String json = gson.toJson(map);
        return json;
    }
}