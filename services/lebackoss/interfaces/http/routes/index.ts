useBuilder()
	.createRoute("POST", "/test")
	.handler(() => new OkHttpResponse("test"));
