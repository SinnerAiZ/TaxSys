<%--
  Created by IntelliJ IDEA.
  User: Sinner
  Date: 2017/5/31
  Time: 16:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>testPOI</title>
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="js/testPOI.js"></script>
</head>
<body>
<form enctype="multipart/form-data" id="batchUpload"  action="incomes/upload" method="post" class="form-horizontal">
    <button class="btn btn-success btn-xs" id="uploadEventBtn" style="height:26px;"  type="button" >选择文件</button>
    <input type="file" name="file"  style="width:0px;height:0px;" id="uploadEventFile">
    <input id="uploadEventPath"  disabled="disabled"  type="text" placeholder="请选择excel表" style="border: 1px solid #e6e6e6; height: 26px;width: 200px;" >
</form>
<button type="button" class="btn btn-success btn-sm"  onclick="user.uploadBtn()" >上传</button>
</body>
</html>
