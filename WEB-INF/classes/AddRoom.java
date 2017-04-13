package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.db.HandleDB;

public class AddRoom extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String type = new String(request.getParameter("Type"));
        String roomid = new String(request.getParameter("Roomid"));
        String state = new String("empty");
        HandleDB hd = new HandleDB();
        if ("".equals(roomid)) {
            out.print("error");
        }
        else {
            String[] params = {roomid, type, state};
            if (hd.addRoom(params) == 1) {
                out.print("ok");
            }
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}