package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.db.HandleDB;

public class ReviseRoomType extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String price = new String(request.getParameter("Price"));
        String roomid = new String(request.getParameter("Roomid"));
        String subsfee = new String(request.getParameter("Subsfee"));
        String type = new String(request.getParameter("Type"));
        HandleDB hd = new HandleDB();
        String[] params = {type, price, subsfee, roomid};
        if (hd.reviseRoomType(params) > 0) {
            out.print("ok");
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        doGet(request, response);
    }
}