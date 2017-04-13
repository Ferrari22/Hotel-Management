package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.db.HandleDB;

public class BookAdd extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String name = new String(request.getParameter("Name"));
        String roomid = new String(request.getParameter("Roomid"));
        String telephone = new String(request.getParameter("Telephone"));
        String days = new String(request.getParameter("Days"));
        String amount = new String(request.getParameter("Amount"));
        String date = new String(request.getParameter("Date"));
        String time = date + " 12:00:00";        
        HandleDB hd = new HandleDB();
        String[] params = {name, roomid, telephone, days, time, amount};
        if (hd.bookAdd(params) == 1) {
            out.print("ok");
        } else {
            out.print("error");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}