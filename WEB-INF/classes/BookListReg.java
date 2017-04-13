/**
 * ��������
 */

package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.google.gson.Gson;
import com.db.HandleDB;

public class BookListReg extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String roomid = new String(request.getParameter("Roomid"));
        out.print(getJsonDate(roomid));
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
    public String getJsonDate(String param) {
        // �������ݿ����
        HandleDB hd = new HandleDB();
        // ����Ҫת���Ķ���
        List<HashMap<String, String>> list = new ArrayList<HashMap<String, String>>();
        List<HashMap<String, String>> sum = new ArrayList<HashMap<String, String>>();
        String total = list.size() + "";
        HashMap<String, String> m = new HashMap<String, String>();
        m.put("sum", total);
        sum.add(m);
        String[] params = {param};
        list = hd.findBookListReg(params);
        Map<String, List<HashMap<String, String>>> map = new HashMap<String, List<HashMap<String, String>>>();
        map.put("totalCount", sum);
        map.put("results", list);
        Gson gson = new Gson();
        // �����ݽ���ת��
        String json = gson.toJson(map);
        return json;
    }
}