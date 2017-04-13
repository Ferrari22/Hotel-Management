package com.server;

import java.util.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import com.db.HandleDB;

public class DeleteRoom extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException
    {
        response.setContentType("text/plain; charset=utf-8");
        PrintWriter out = response.getWriter();
        String roomid = new String(request.getParameter("Roomid"));
        HandleDB hd = new HandleDB();
        String[] params = {roomid};
        List<HashMap<String, String>> clientlist = new ArrayList<HashMap<String, String>>();
        clientlist = hd.customerList();
        boolean flag = false;
        for (HashMap<String, String> r : clientlist) {
            if (roomid.equals(r.get("room_id")))
                flag = true;
        }
        if (flag) {
            out.print("full");
        } else {
            if (hd.deleteRoom(params) == 1) {
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