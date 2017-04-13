package com.server;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Main extends HttpServlet
{
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
		throws ServletException, IOException
	{
		// 设置返回类型
		response.setContentType("text/html");
		// 设置返回状态码
		response.setStatus(response.SC_MOVED_TEMPORARILY);
		// 设置重定向地址
		response.setHeader("Location", "../../public/login.html");
	}
}