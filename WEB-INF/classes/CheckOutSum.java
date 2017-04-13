package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.db.HandleDBTest;

public class CheckOutSum extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String roomid = new String(request.getParameter("Roomid"));
        String[] params = {roomid};
        HandleDBTest hd = new HandleDBTest();        
        List<HashMap<String, String>> result = new ArrayList<HashMap<String, String>>();
        result = hd.checkOutSum(params);
        String sum = result.get(0).get("sum");
        out.print(sum);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}